import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import Groq from "groq-sdk";

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// --- KB loader (local markdown) ---
const KB_DIR = path.join(process.cwd(), "..", "knowledge-base");

// Lee todos los .md y arma un solo texto por archivo
function loadKnowledgeBase() {
  const files = fs
    .readdirSync(KB_DIR)
    .filter((f) => f.toLowerCase().endsWith(".md"));

  return files.map((f) => {
    const full = path.join(KB_DIR, f);
    return { name: f, content: fs.readFileSync(full, "utf8") };
  });
}

// Split simple por secciones (encabezados) + tamaño max
function chunkText(text, maxChars = 900) {
  const parts = text.split(/\n(?=##?\s)/g); // separa por headings
  const chunks = [];

  for (const p of parts) {
    const t = p.trim();
    if (!t) continue;

    if (t.length <= maxChars) {
      chunks.push(t);
    } else {
      // si es muy largo, lo parte por párrafos
      const paras = t.split(/\n{2,}/g);
      let buf = "";

      for (const para of paras) {
        if ((buf + "\n\n" + para).length > maxChars) {
          if (buf) chunks.push(buf.trim());
          buf = para;
        } else {
          buf += (buf ? "\n\n" : "") + para;
        }
      }
      if (buf) chunks.push(buf.trim());
    }
  }

  return chunks;
}

// Búsqueda simple: puntaje por coincidencias de palabras
function scoreChunk(query, chunk) {
  const q = query.toLowerCase().split(/\W+/).filter(Boolean);
  const c = chunk.toLowerCase();
  let score = 0;

  for (const w of q) {
    if (w.length < 3) continue;
    if (c.includes(w)) score += 1;
  }
  return score;
}

let KB = [];

function buildKB() {
  const docs = loadKnowledgeBase();
  const all = [];

  for (const d of docs) {
    const chunks = chunkText(d.content);
    for (const ch of chunks) all.push({ source: d.name, text: ch });
  }

  KB = all;
  console.log(`✅ KB loaded: ${docs.length} files, ${KB.length} chunks`);
}
buildKB();

app.get("/health", (req, res) => res.json({ ok: true }));

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body || {};
    if (!message) return res.status(400).json({ error: "Missing message" });

    // Rank chunks
    const ranked = KB
      .map((ch) => ({ ...ch, score: scoreChunk(message, ch.text) }))
      .sort((a, b) => b.score - a.score);

    // ✅ Siempre usamos top 5 como contexto
    const top = ranked.slice(0, 5);

    const context = top
      .map((r) => `SOURCE: ${r.source}\n${r.text}`)
      .join("\n\n---\n\n");

    const system = `
Eres el asistente del sitio web de JW Tech Solutions.
Responde claro, breve y profesional.
Usa el CONTEXTO si aplica. Si el contexto no tiene la info, dilo y sugiere contactar.
No inventes precios, políticas o promesas.
`.trim();

    const messages = [
      { role: "system", content: system },
      ...(history || []),
      { role: "system", content: `CONTEXTO:\n${context}` },
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.2,
      max_tokens: 300,
    });

    const reply =
      completion.choices?.[0]?.message?.content ?? "No pude responder ahora.";

    // ✅ Sources únicos (sin repetidos)
    const uniqueSources = [...new Set(top.map((r) => r.source))];

    return res.json({
      reply,
      sources: uniqueSources,
      signature: "SERVER_TOP_SOURCES_V2",
    });
  } catch (err) {
    console.error("GROQ ERROR DETAILS:", err);
    return res.status(500).json({
      error: "Server error",
      details: err?.message || String(err),
      status: err?.status || null,
    });
  }
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => console.log(`✅ API running on http://localhost:${port}`));
