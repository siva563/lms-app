import axios from "axios";
import { getToken } from "../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const headers = () => ({
    Authorization: `Bearer ${getToken()}`,
});

// ✅ Get chapters for subject
export const fetchChapters = async (subjectId) => {
    const res = await axios.get(`${API}/chapters?subjectId=${subjectId}`, {
        headers: headers(),
    });
    return res.data;
};

// ✅ Create new chapter
export const createChapter = async (name, subjectId, institutionId) => {
    const res = await axios.post(
        `${API}/chapters`,
        { name, subjectId, institutionId },
        { headers: headers() }
    );
    return res.data;
};

export const deleteChapter = async (id) =>
    await axios.delete(`${API}/chapters/${id}`, { headers: headers() });

export const updateChapter = async (id, name) =>
    await axios.put(`${API}/chapters/${id}`, { name }, { headers: headers() });
