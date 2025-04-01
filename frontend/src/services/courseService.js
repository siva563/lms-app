import axios from "axios";
//import { getToken } from "../utils/tokenHelper";im
import { getToken } from "../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchCourses = async () => {
    const res = await axios.get(`${API}/courses`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
};


export const createCourse = async (data) => {
    const res = await axios.post(`${API}/courses`, data, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
};

export const updateCourse = async (id, data) => {
    const res = await axios.put(`${API}/courses/${id}`, data, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
};

export const deleteCourse = async (id) => {
    const res = await axios.delete(`${API}/courses/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
};
