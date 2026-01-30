import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { message, history = [] } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: "Missing message" });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const instructions = `
Eres el asistente del sitio web de JW Tech Solutions.
Responde claro y profesional.
Usa la base de conocimiento cuando aplique.
Si no encuentras la información, dilo y sugiere contactar por los canales oficiales.
No inventes precios, políticas o promesas.
`;

    const response = await client.responses.create({
      model: "gpt-5.2",
      instructions,
      input: [
        ...history,
        { role: "user", content: message }
      ],
      tools: [
        {
          type: "file_search",
          vector_store_ids: ["vs_697bfdc85e608191910e209f6a259a51"],
        }
      ],
    });

    return res.status(200).json({ reply: response.output_text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
