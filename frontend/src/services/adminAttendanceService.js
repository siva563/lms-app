import axios from "axios";
//import { getToken } from "../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


export const fetchAttendanceSummary = async ({ batchId, studentId, from, to }) => {
    try {
        const token = localStorage.getItem("token");
        console.log("batchId:" + batchId);
        console.log("studentId:" + studentId);
        console.log("from:" + from);
        console.log("to:" + to);
        const res = await axios.get(`${API}/admin/attendance-summary`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                ...(batchId && { batchId }),
                ...(studentId && { studentId }),
                ...(from && { from }),
                ...(to && { to })
            },
        });
        return res.data;
    } catch (err) {
        console.error("❌ Failed to fetch attendance summary:", err);
        return [];
    }
};

export const addAttendanceAPI = async (attendanceData) => {
    try {
        const token = localStorage.getItem("token");
        console.log("add data is:" + JSON.stringify(attendanceData));
        const res = await axios.post(`${API}/attendance/add`, attendanceData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        console.error("❌ Failed to add attendance:", err);
        throw err;
    }
};

export const updateAttendanceAPI = async (attendanceId, updatedData) => {
    try {
        const token = localStorage.getItem("token");

        const res = await axios.put(`${API}/attendance/${attendanceId}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
    } catch (err) {
        console.error("❌ Error in updateAttendanceAPI:", err);
        throw err;
    }
};


export const fetchAttendanceById = async (attendanceId) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/attendance/${attendanceId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// export const fetchStudentWiseAttendance = async (studentId, from, to) => {
//     try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`${API}/attendance/student-attendance`, {
//             headers: { Authorization: `Bearer ${token}` },
//             params: { studentId, from, to },
//         });
//         return res.data;
//     } catch (err) {
//         console.error("❌ Error fetching student-wise attendance:", err);
//         return null;
//     }
// };

// ✅ Proper API call
export const fetchStudentWiseAttendance = async ({ studentId, from, to }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/attendance/student-wise`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                studentId,
                from,
                to
            },
        });
        return res.data;
    } catch (err) {
        console.error("❌ Error fetching student-wise attendance:", err);
        return [];
    }
};
