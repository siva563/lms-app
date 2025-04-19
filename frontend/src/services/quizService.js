import axios from "axios";
import { getToken } from "../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const headers = {
    Authorization: `Bearer ${getToken()}`,
};

export const uploadQuizBatch = async (questions) => {
    const res = await axios.post(`${API}/quizzes/save-bulk`, { questions }, { headers });
    return res.data;
};

export const saveToQuestionBank = async (questions) => {
    const res = await axios.post(`${API}/quizzes/bulk`, { questions }, { headers });
    return res.data;
};


export const fetchFullQuizById = async (quizId) => {
    const res = await axios.get(`${API}/quizzes/${quizId}`);
    return res.data;
};

export const submitQuiz = async (quizId, answers, userId) => {
    try {
        const payload = {
            quizId,
            answers,
            studentId: userId || "guest",
        };
        const res = await axios.post(`${API}/quizzes/submit`, payload);
        return res.data;
    } catch (err) {
        console.error("❌ Quiz submission failed", err);
        throw err;
    }
};