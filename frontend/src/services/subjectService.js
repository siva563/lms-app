import axios from "axios";
import { getToken } from "../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const headers = () => ({
    Authorization: `Bearer ${getToken()}`,
});

// ✅ Get all subjects
export const fetchSubjects = async (institutionId) => {
    console.log("fetchSubjects:" + institutionId);
    const res = await axios.get(`${API}/subjects?institutionId=${institutionId}`, {
        headers: headers(),
    });
    return res.data;
};

// ✅ Create a new subject
export const createSubject = async (name, institutionId) => {
    const res = await axios.post(
        `${API}/subjects`,
        { name, institutionId },
        { headers: headers() }
    );
    return res.data;
};

export const deleteSubject = async (id) =>
    await axios.delete(`${API}/subjects/${id}`, { headers: headers() });

export const updateSubject = async (id, name) =>
    await axios.put(`${API}/subjects/${id}`, { name }, { headers: headers() });
