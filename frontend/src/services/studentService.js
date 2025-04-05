import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
