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