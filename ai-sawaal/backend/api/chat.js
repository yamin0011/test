import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = req.body;
    const messages = body.messages || [];
    const ocrText = body.ocr_text || "";

    const systemPrompt = `
      You are a helpful analyst. Summarize OCR data if present,
      answer clearly, and always end with ONE useful follow-up question.
    `;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "OCR_TEXT:\n" + ocrText },
        ...messages,
      ],
    });

    res.status(200).json({ reply: response.output_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
