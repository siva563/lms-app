import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getAiQuizSuggestions = async (topic) => {
    try {
        //  await axios.post(`${API}/quizzes/bulk`, { questions }, { headers });
        const res = await fetch(`${API}/quiz/suggest`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic }),
        });

        const data = await res.json();
        return data.suggestions || [];
    } catch (err) {
        console.error("❌ AI Suggestion Error:", err);
        return [];
    }
};

export const saveToQuestionBank = async (topic) => {
    try {
        //  await axios.post(`${API}/quizzes/bulk`, { questions }, { headers });
        const res = await fetch(`${API}/quiz/suggest`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic }),
        });

        const data = await res.json();
        return data.suggestions || [];
    } catch (err) {
        console.error("❌ AI Suggestion Error:", err);
        return [];
    }
};

export const evaluateStudentCode = async ({ problemStatement, studentCode, testCases, language }) => {
    const response = await axios.post(`${API}/ai/evaluate-code`, {
        problemStatement,
        studentCode,
        testCases,
        language,
    });

    return response.data;
};