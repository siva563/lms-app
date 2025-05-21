import axios from "axios";

//const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = `${import.meta.env.VITE_API_URL}`;

export const fetchStudentProfile = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/student/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        console.error("❌ Failed to fetch student profile:", err);
        return null;
    }
};

export const updateStudentProfile = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`${API}/student/profile`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (err) {
        console.error("❌ Failed to update student profile:", err);
        throw err;
    }
};

export const fetchAssignedSubjectsWithChapters = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/student/assigned-subjects`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};


export const fetchChaptersBySubject = async (subjectId) => {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.get(`${API}/student/chapters/${subjectId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error("❌ Error fetching chapters by subject:", error);
        throw error; // Optionally rethrow if you want to handle it in the component
    }
};