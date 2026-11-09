import express from "express";
import OpenAI from "openai";

const app = express();

app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: "public"
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Savol yuborilmadi."
      });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions: "Sen WVW AI nomli aqlli yordamchisan. Foydalanuvchiga o'zbek tilida aniq, foydali va rost javob ber. Bilmagan narsangni to'qib chiqarma.",
      input: message
    });

    res.json({
      answer: response.output_text
    });

  } catch (error) {
    console.error("Xatolik:", error.message);

    res.status(500).json({
      error: "Hozir javob olishda xatolik yuz berdi."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`WVW AI ${PORT}-portda ishlayapti`);
});
