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
  text: `JW Tech Solutions ofrece soluciones completas en: Websites, Apps Móviles, Inteligencia Artificial, Ciberseguridad, Base de Datos, Integracion de ChatBots, Ecommerce e Integraciones. Puedes solicitar una cotización explicando tu idea, el objetivo del proyecto, funcionalidades deseadas, plataforma (web/móvil), y el plazo estimado. Si ya tienes referencias o un diseño, también puedes compartirlo para estimar con mayor precisión.`,
},
{
  source: "contact.md",
  text: `Para contactar: ve a la sección "Contacto" del sitio y completa el formulario. Incluye tu nombre, empresa (si aplica), el servicio de interés y una descripción clara de lo que necesitas. Agrega detalles como presupuesto estimado(Si tienes), fechas importantes, y cómo prefieres ser contactado (correo o WhatsApp) para una respuesta más rápida.`,
},
{
  source: "faq.md",
  text: `FAQ: los tiempos y costos dependen del alcance, la complejidad y las funciones requeridas. Para una estimación más exacta, se recomienda agendar una llamada o reunión corta donde se definan requerimientos, prioridades, entregables y el plan de trabajo. Luego de esto, se comparte una propuesta con estimación de tiempo y costo.`,
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
      { status: 200, headers: { "Conten.t-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error", details: err?.message || String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
