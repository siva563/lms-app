import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";



export const getQuestionBank = async (topic) => {
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

// export const saveQuizWithQuestions = async (payload) => {
//     const res = await fetch("/api/quiz/save-with-questions", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const error = await res.json();
//       throw new Error(error.message || "Failed to save quiz");
//     }

//     return await res.json();
//   };


export const saveQuizWithQuestions = async (payload) => {
    try {
        const response = await axios.post(`${API}/quizzes/save-with-questions`, payload);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data?.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("❌ Failed to save quiz. Please try again.");
        }
    }
};