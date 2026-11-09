const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Faqat POST so‘rovi mumkin."
    });
  }

  try {
    const { message } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Savol yuborilmadi."
      });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions: "Sen WVW AI nomli aqlli yordamchisan. O‘zbek tilida aniq, foydali va rost javob ber. Bilmagan narsangni to‘qib chiqarma.",
      input: message
    });

    return res.status(200).json({
      answer: response.output_text
    });

  } catch (error) {
    console.error("WVW AI xatosi:", error.message);

    return res.status(500).json({
      error: "Javob olishda xatolik yuz berdi."
    });
  }
};
