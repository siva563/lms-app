import axios from "axios";
import { getToken } from "../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


// export const getExamSummary = async () => {
    

//     const res = await axios.get(`${API}/exams/exam-report`, { headers });

//     return res.data;
// };

export const getExamSummary = async () => {

    const res = await axios.get(`${API}/attendance/exam-report`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return res.data;
};