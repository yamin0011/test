// api/chat.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.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,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, imageBase64 } = req.body;

    const input = [
      { role: "user", content: messages.map(m => ({ type: "text", text: m.content })) }
    ];

    // If image was uploaded, add it
    if (imageBase64) {
      input[0].content.push({
        type: "image_url",
        image_url: { url: `data:image/png;base64,${imageBase64}` },
      });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",  // supports text + vision
      messages: input,
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch response" });
  }
}
