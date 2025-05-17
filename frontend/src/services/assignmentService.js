import axios from 'axios';
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const createAssignment = async (payload) => {
    const res = await axios.post(`${API}/assignments/create`, payload);
    return res.data;
};

export const fetchAssignmentByChapter = async (chapterId, institutionId) => {
    const res = await axios.get(`${API}/assignments/by-chapter/${chapterId}`, {
        headers: {
            institutionid: institutionId, // ✅ pass in lowercase (safe)
        }
    });
    return res.data;
};