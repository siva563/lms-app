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

export const getMonthlyAttendance = async ({ month }) => {
    //const token = localStorage.getItem("token");

    const res = await axios.get(`${API}/attendance/calendar?month=${month}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });

    return res.data;
};

// 🌐 Mark online attendance
export const markOnlineAPI = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
        "/api/attendance/mark-online",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
};



// 📆 Get total batch days from student batch
export const fetchBatchDaysFromService = async () => {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split(".")[1]));
    const batchId = payload.batchId;

    const res = await axios.get(`${API}/batches/${batchId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const start = new Date(res.data.startDate);
    const end = new Date(res.data.endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
};

// export const fetchFullAttendance = async (month) => {
//     const token = localStorage.getItem("token");
//     const res = await axios.get(`${API}/attendance/calendar-view?month=${month}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     return res.data;
// };

export const fetchFullAttendance = async (from, to) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/attendance/calendar-view?from=${from}&to=${to}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };