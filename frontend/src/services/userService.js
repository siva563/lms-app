import axios from "axios";
import { getToken } from "../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const registerUser = async (userData) => {
    const token = getToken();
    const res = await axios.post(`${API}/users`, userData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

// export const fetchUsers = async (userData) => {
//     const token = getToken();
//     const res = await axios.post(`${API}/users`, userData, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     return res.data;
// };

export const fetchUsers = async () => {
    try {
        const res = await axios.get(`${API}/users/all`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });
        return res.data || [];
    } catch (err) {
        console.error("❌ Error fetching users:", err.response?.data?.message || err.message);
        alert("Failed to fetch users. Try logging in again.");
    } 
};


