import axios from "axios";
import { getToken } from "../utils/tokenHelper";

//const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = `${import.meta.env.VITE_API_URL}`;

const config = {
    headers: { Authorization: `Bearer ${getToken()}` },
};

// export const fetchBatches = () =>
//     axios.get(`${API}/batches`, config).then(res => res.data);

export const fetchBatches = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/batches`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        console.error("❌ Failed to fetch batches:", err);
        throw err;
    }
};

export const createBatch = (data) =>
    axios.post(`${API}/batches`, data, config).then(res => res.data);

export const updateBatch = (id, data) =>
    axios.put(`${API}/batches/${id}`, data, config).then(res => res.data);

export const deleteBatch = (id) =>
    axios.delete(`${API}/batches/${id}`, config).then(res => res.data);
