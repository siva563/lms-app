import axios from "axios";
import { getToken } from "../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const config = {
//     headers: { Authorization: `Bearer ${getToken()}` },
// };

export const markLoginAPI = async (latitude, longitude) => {


    const res = await axios.post(`${API}/attendance/mark-login`, {
        latitude,
        longitude
    }, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return res.data;
};


export const markLogoutAPI = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.post(`${API}/attendance/mark-logout`, {}, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return res.data;
};

export const fetchAttendanceReport = async (filters) => {
    // const token = localStorage.getItem("token");
    const query = new URLSearchParams(filters).toString();

    const res = await axios.get(`${API}/attendance/report?${query}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return res.data;
};


export const getAttendanceSummary = async (filters) => {

    const query = new URLSearchParams(filters).toString();
    const res = await axios.get(`${API}/attendance/summary?${query}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return res.data;
};
