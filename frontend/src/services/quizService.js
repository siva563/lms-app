import axios from "axios";
import { getToken } from "../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const headers = {
    Authorization: `Bearer ${getToken()}`,
};

export const uploadQuizBatch = async (questions) => {
    const res = await axios.post(`${API}/quizzes/bulk`, { questions }, { headers });
    return res.data;
};
