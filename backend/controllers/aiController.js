const axios = require('axios');

exports.evaluateCode = async (req, res) => {
    try {
        console.log('🧪 OpenRouter Key:', process.env.OPENROUTER_API_KEY ? '✅ Found' : '❌ Missing');
        const { problemStatement, studentCode, testCases, language } = req.body;

        if (!problemStatement || !studentCode || !testCases || !language) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const prompt = `
You are an intelligent programming evaluator. Carefully analyze the student's code submission.

### Language:
${language}

### Problem Statement:
${problemStatement}

### Student Code:
\`\`\`${language}
${studentCode}
\`\`\`

### Test Cases:
${testCases.map((tc, i) =>
            `Test Case ${i + 1}: Input: ${tc.input} | Expected Output: ${tc.expectedOutput}`
        ).join('\n')}

### Instructions:
Evaluate the student's code and return a pure JSON object in the following structure (no markdown or explanation):

{
  "syntaxErrors": "<any errors or null>",
  "compiledOutput": "<main output>",
  "testCaseResults": [
    {
      "input": "<input>",
      "expected": "<expected>",
      "actual": "<actual>",
      "passed": true/false
    }
  ],
  "totalScore": <number>,
  "suggestions": ["Improve...", "Use better..."]
}
`;

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'anthropic/claude-3-haiku',
                messages: [{ role: 'user', content: prompt }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://your-lms.com',
                    'X-Title': 'Code Evaluation LMS',
                },
            }
        );

        const aiMessage = response.data?.choices?.[0]?.message?.content;
        console.log("🔍 AI Raw Response:", aiMessage);

      //  const cleaned = aiMessage.replace(/```json|```/g, '').trim();

        // ✅ Parse JSON safely
        let aiResult;
        try {
            const cleaned = aiMessage
            .replace(/^```json/, '')
            .replace(/^```/, '')
            .replace(/```$/, '')
            .trim();
            aiResult = JSON.parse(cleaned);
        } catch (e) {
            console.error("⚠️ Failed to parse AI response:", aiMessage);
            return res.status(400).json({
                error: 'AI did not return valid JSON',
                raw: aiMessage,
            });
        }

        res.json({ result: aiResult });
    } catch (error) {
        console.error('❌ AI Evaluation Error:', error.response?.data || error.message);
        return res.status(500).json({
            error: 'AI Evaluation failed',
            details: error.response?.data || error.message,
        });
    }
};
