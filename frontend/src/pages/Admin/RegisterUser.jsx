// import React, { useState } from "react";
// import { registerUser } from "../../services/userService";
// import { getUser } from "../../utils/tokenHelper";

// const RegisterUser = () => {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         mobile: "",
//         password: "",
//         role: "",
//         institutionId: "", // Will auto-fill later
//     });

//     const [message, setMessage] = useState("");
//     const [error, setError] = useState("");

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage("");
//         setError("");

//         const loggedInUser = getUser();
//         const institutionId = loggedInUser?.institution?.id || loggedInUser?.institutionId;

//         if (!institutionId) {
//             setError("Institution ID not found. Please log out and log in again.");
//             return;
//         }

//         try {
//             const payload = { ...form, institutionId };
//             const data = await registerUser(payload);
//             setMessage("✅ User registered successfully!");
//             setForm({ name: "", email: "", mobile: "", password: "", role: "", institutionId: "" });
//         } catch (err) {
//             console.error("Create User:", err);
//             setError(err.response?.data?.message || "Failed to register user.");
//         }
//     };

//     return (
//         <div className="container mt-5" style={{ maxWidth: "600px" }}>
//             <h3 className="mb-4 text-center">Register New User</h3>

//             {message && <div className="alert alert-success">{message}</div>}
//             {error && <div className="alert alert-danger">{error}</div>}

//             <form onSubmit={handleSubmit}>
//                 {/* Name */}
//                 <div className="mb-3">
//                     <label>Name</label>
//                     <input
//                         name="name"
//                         value={form.name}
//                         onChange={handleChange}
//                         className="form-control"
//                         required
//                     />
//                 </div>

//                 {/* Email */}
//                 <div className="mb-3">
//                     <label>Email</label>
//                     <input
//                         name="email"
//                         type="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         className="form-control"
//                         required
//                     />
//                 </div>

//                 {/* Mobile */}
//                 <div className="mb-3">
//                     <label>Mobile</label>
//                     <input
//                         name="mobile"
//                         value={form.mobile}
//                         onChange={handleChange}
//                         className="form-control"
//                         required
//                     />
//                 </div>

//                 {/* Password */}
//                 <div className="mb-3">
//                     <label>Password</label>
//                     <input
//                         name="password"
//                         type="password"
//                         value={form.password}
//                         onChange={handleChange}
//                         className="form-control"
//                         required
//                     />
//                 </div>

//                 {/* Role */}
//                 <div className="mb-3">
//                     <label>Role</label>
//                     <select
//                         name="role"
//                         value={form.role}
//                         onChange={handleChange}
//                         className="form-select"
//                         required
//                     >
//                         <option value="">Select Role</option>
//                         <option value="admin">Institution Admin</option>
//                         <option value="instructor">Instructor</option>
//                         <option value="student">Student</option>
//                     </select>
//                 </div>

//                 {/* Later: Institution auto-fill for Admin */}

//                 <button className="btn btn-success w-100">Register User</button>
//             </form>
//         </div>
//     );
// };

// export default RegisterUser;

import React, { useState, useEffect } from "react";
import { registerUser } from "../../services/userService";
import { getUser } from "../../utils/tokenHelper";
import axios from "axios";
import {
    fetchBatches
} from "../../services/batchService";

const RegisterUser = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        role: "",
        institutionId: "",
        batchId: "", // ✅ Added
    });

    const [batches, setBatches] = useState([]); // ✅ Store batches
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const loggedInUser = getUser();

    useEffect(() => {
        const institutionId = loggedInUser?.institution?.id || loggedInUser?.institutionId;

        if (form.role === "student" && institutionId) {
            loadBatches();
        }
    }, [form.role]);

       const loadBatches = async () => {
           const data = await fetchBatches();
           console.log("batch data is:" + JSON.stringify(data));
           setBatches(data);
       };
   

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        const institutionId = loggedInUser?.institution?.id || loggedInUser?.institutionId;
        if (!institutionId) {
            setError("Institution ID not found. Please log out and log in again.");
            return;
        }

        try {
            const payload = { ...form, institutionId };
            const data = await registerUser(payload);
            setMessage("✅ User registered successfully!");
            setForm({
                name: "",
                email: "",
                mobile: "",
                password: "",
                role: "",
                institutionId: "",
                batchId: ""
            });
        } catch (err) {
            console.error("Create User:", err);
            setError(err.response?.data?.message || "Failed to register user.");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "600px" }}>
            <h3 className="mb-4 text-center">Register New User</h3>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                {/* Mobile */}
                <div className="mb-3">
                    <label>Mobile</label>
                    <input
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                {/* Password */}
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                {/* Role */}
                <div className="mb-3">
                    <label>Role</label>
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Institution Admin</option>
                        <option value="instructor">Instructor</option>
                        <option value="student">Student</option>
                    </select>
                </div>

                {/* Batch Dropdown (only if student) */}
                {form.role === "student" && (
                    <div className="mb-3">
                        <label>Batch</label>
                        <select
                            name="batchId"
                            value={form.batchId}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Batch</option>
                            {batches.map((batch) => (
                                <option key={batch._id} value={batch._id}>
                                    {batch.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <button className="btn btn-success w-100">Register User</button>
            </form>
        </div>
    );
};

export default RegisterUser;
