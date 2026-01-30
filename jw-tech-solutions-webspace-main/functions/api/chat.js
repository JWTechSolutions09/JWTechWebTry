export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json().catch(() => ({}));
    const { message, history = [] } = body || {};

    if (!message) {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ KB “inline” (por ahora simple). Luego lo conectamos a tus md.
    const KB = [
      {
        source: "services.md",
        text: `JW Tech Solutions ofrece: Website, Apps, AI, Cybersecurity e Integrations. Puedes pedir una cotización explicando tu idea, objetivo y plazo.`,
      },
      {
        source: "contact.md",
        text: `Para contactar: ve a la sección Contacto del sitio. Incluye tu nombre, empresa, servicio de interés y detalles del proyecto.`,
      },
      {
        source: "faq.md",
        text: `FAQ: tiempos y costos dependen del alcance. Se recomienda agendar una llamada para definir requerimientos y estimar.`,
      },
    ];

    const scoreChunk = (query, chunk) => {
      const q = query.toLowerCase().split(/\W+/).filter(Boolean);
      const c = chunk.toLowerCase();
      let score = 0;
      for (const w of q) {
        if (w.length < 3) continue;
        if (c.includes(w)) score += 1;
      }
      return score;
    };

    const ranked = KB
      .map((ch) => ({ ...ch, score: scoreChunk(message, ch.text) }))
      .sort((a, b) => b.score - a.score);

    const top = ranked.slice(0, 3);
    const context = top.map((r) => `SOURCE: ${r.source}\n${r.text}`).join("\n\n---\n\n");

    const system = `
Eres el asistente del sitio web de JW Tech Solutions.
Responde claro, breve y profesional.
Usa el CONTEXTO si aplica. Si el contexto no tiene la info, dilo y sugiere contactar.
No inventes precios, políticas o promesas.
`.trim();

    const messages = [
      { role: "system", content: system },
      ...(Array.isArray(history) ? history : []),
      { role: "system", content: `CONTEXTO:\n${context}` },
      { role: "user", content: message },
    ];

    // ✅ Llamada a Groq (sin SDK, directo por fetch)
    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages,
        temperature: 0.2,
        max_tokens: 300,
      }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return new Response(
        JSON.stringify({
          error: "Groq error",
          details: data?.error || data,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const reply = data?.choices?.[0]?.message?.content ?? "No pude responder ahora.";
    const uniqueSources = [...new Set(top.map((r) => r.source))];

    return new Response(
      JSON.stringify({ reply, sources: uniqueSources, signature: "CLOUDFLARE_PAGES_FN_V1" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error", details: err?.message || String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
