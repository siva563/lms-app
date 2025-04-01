import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { saveToken, saveUser } from "../../utils/tokenHelper";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { token, user } = await loginUser({ email, password });
            saveToken(token);
            saveUser(user);

            if (user.role === "superadmin" || user.role === "admin") navigate("/admin");
            else if (user.role === "instructor") navigate("/instructor");
            else navigate("/student/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h3 className="text-center mb-4">Code Begun Login</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
