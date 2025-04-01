import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { setPasswordAPI } from "./setPasswordAPI";
import { setPasswordAPI } from "../../services/authService";

const SetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const queryParams = new URLSearchParams(useLocation().search);
    const token = queryParams.get("token");

    useEffect(() => {
        if (!token) {
            setError("Invalid or missing token.");
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        // ✅ Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const res = await setPasswordAPI(token, password);
            setMessage(res.message);
            setTimeout(() => navigate("/login"), 3000);
        } catch (err) {
            setError(err.message || "Failed to set password.");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h3 className="text-center mb-4">Set Your Password</h3>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!message && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Retype Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btn btn-primary w-100">Set Password</button>
                </form>
            )}
        </div>
    );
};

export default SetPassword;
