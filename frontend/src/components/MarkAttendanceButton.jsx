import React, { useState, useEffect } from "react";
import { markLoginAPI, markLogoutAPI } from "../services/attendanceService";

const MarkAttendanceButton = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [timestamp, setTimestamp] = useState(null);

    // Format date: YYYY-MM-DD
    const today = new Date().toISOString().slice(0, 10);

    // Load from localStorage on mount
    useEffect(() => {
        const storedStatus = JSON.parse(localStorage.getItem("attendanceStatus")) || {};
        const { date, status, time, completed } = storedStatus;

        if (date === today) {
            setIsLoggedIn(status === "in");
            setIsCompleted(completed);
            setTimestamp(time);
        } else {
            // New day, reset localStorage
            localStorage.removeItem("attendanceStatus");
        }
    }, []);

    const handleMark = () => {
        if (!navigator.geolocation) {
            return alert("Location not supported by your browser");
        }

        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const now = new Date().toLocaleTimeString();

                if (!isLoggedIn) {
                    await markLoginAPI(pos.coords.latitude, pos.coords.longitude);
                    alert("✅ Marked Entry");

                    localStorage.setItem("attendanceStatus", JSON.stringify({
                        date: today,
                        status: "in",
                        time: now,
                        completed: false,
                    }));

                    setIsLoggedIn(true);
                    setTimestamp(now);
                } else {
                    await markLogoutAPI();
                    alert("🚪 Marked Exit");

                    localStorage.setItem("attendanceStatus", JSON.stringify({
                        date: today,
                        status: "out",
                        time: now,
                        completed: true,
                    }));

                    setIsLoggedIn(false);
                    setTimestamp(now);
                    setIsCompleted(true);
                }

            } catch (err) {
                alert(err.response?.data?.message || "Something went wrong");
            }
        });
    };

    return (
        <div className="card shadow-sm text-center">
            <div className="card-body">
                <h5 className="card-title">{isCompleted ? "✅ Attendance Complete" : "🕓 Mark Attendance"}</h5>

                <button
                    className={`btn ${isLoggedIn ? "btn-danger" : "btn-success"} w-100 mb-2`}
                    onClick={handleMark}
                    disabled={isCompleted}
                >
                    {isLoggedIn ? "🚪 Logout" : "Login"}
                </button>

                {timestamp && (
                    <div className="text-muted small">
                        Last marked at <strong>{timestamp}</strong>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarkAttendanceButton;
