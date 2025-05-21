// src/services/authService.js
import axios from "axios";

//const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = `${import.meta.env.VITE_API_URL}`;

export const loginUser = async (data) => {
    const res = await axios.post(`${API}/auth/login`, data);
    return res.data;
};


export const setPasswordAPI = async (token, newPassword) => {
    const res = await axios.post(`${API}/auth/set-password`, {
        token,
        newPassword,
    });

    return res.data;
};
