const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/suggest", async (req, res) => {
    const { topic } = req.body;

    const prompt = `
Generate 20 MCQ questions with 4 options each on the topic "${topic}".
Return in JSON format as an array:
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "answer": "B"
  }
]
`;

    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const raw = response.data.choices[0].message.content;

        // Try to parse it into JSON (best-effort)
        const match = raw.match(/\[.*\]/s);
        const suggestions = match ? JSON.parse(match[0]) : [];

        res.json({ suggestions });
    } catch (err) {
        console.error("AI error:", err?.response?.data || err.message);
        res.status(500).json({ error: "AI generation failed." });
    }
});

module.exports = router;
