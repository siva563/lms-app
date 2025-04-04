// src/services/progressService.js
import axios from "axios";
import { getToken } from "../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getCourseCompletion = async () => {


    const res = await axios.get(`${API}/attendance/course-progress`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return res.data;
};


export const getMyRank = async () => {

    const res = await axios.get(`${API}/attendance/batch-rank`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return res.data;
};

