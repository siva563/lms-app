// import axios from "axios";
// import { getToken } from "../utils/tokenHelper";

// const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const headers = () => ({
//     Authorization: `Bearer ${getToken()}`,
// });

// // ✅ Get chapters for subject
// export const fetchChapters = async (subjectId) => {
//     const res = await axios.get(`${API}/chapters?subjectId=${subjectId}`, {
//         headers: headers(),
//     });
//     return res.data;
// };

// // ✅ Create new chapter
// export const createChapter = async (name, subjectId, institutionId) => {
//     const res = await axios.post(
//         `${API}/chapters`,
//         { name, subjectId, institutionId },
//         { headers: headers() }
//     );
//     return res.data;
// };

// export const deleteChapter = async (id) =>
//     await axios.delete(`${API}/chapters/${id}`, { headers: headers() });

// export const updateChapter = async (id, name) =>
//     await axios.put(`${API}/chapters/${id}`, { name }, { headers: headers() });
// src/services/chapterService.js



import axios from "axios";

//const API = import.meta.env.VITE_API_URL + "/api/chapters";

//const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api/chapters";

const API = `${import.meta.env.VITE_API_URL}`;

// 🔐 Include auth token if using JWT
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// ✅ Create Chapter
export const createChapter = async (chapterData) => {
    const res = await axios.post(API, chapterData, getAuthHeaders());
    return res.data;
};

// ✅ Get All Chapters
export const fetchChapters = async () => {
    const res = await axios.get(API, getAuthHeaders());
    return res.data;
};

// ✅ Get Chapter by ID
export const getChapterById = async (id) => {
    const res = await axios.get(`${API}/${id}`, getAuthHeaders());
    return res.data;
};

// ✅ Update Chapter
export const updateChapter = async (id, updatedData) => {
    const res = await axios.put(`${API}/${id}`, updatedData, getAuthHeaders());
    return res.data;
};

// ✅ Delete Chapter
export const deleteChapter = async (id) => {
    const res = await axios.delete(`${API}/${id}`, getAuthHeaders());
    return res.data;
};

export const fetchChaptersBySubject = async (id) => {
    const res = await axios.get(`${API}/${id}`, getAuthHeaders());
    return res.data;
};
