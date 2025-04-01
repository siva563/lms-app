import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken, getUser } from "../../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
};

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    });

const StudentLeaderboard = ({ examId }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const user = getUser();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await axios.get(`${API}/submissions/leaderboard?examId=${examId}`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                setLeaderboard(res.data);
            } catch (err) {
                console.error("❌ Failed to load leaderboard:", err);
            }
        };

        if (examId) fetchLeaderboard();
    }, [examId]);

    return (
        <div className="p-3">
            <h4 className="mb-3">🏆 Exam Leaderboard</h4>

            <div className="table-responsive">
                <table className="table table-striped table-bordered shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>🏅 Rank</th>
                            <th>👤 Name</th>
                            <th>🎯 Score</th>
                            <th>⏱ Time</th>
                            <th>📤 Submitted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((entry) => (
                            <tr
                                key={entry.rank}
                                className={entry.name === user.name ? "table-success fw-bold" : ""}
                            >
                                <td>{entry.rank}</td>
                                <td>{entry.name}</td>
                                <td>{entry.score} / {entry.totalMarks}</td>
                                <td>{formatTime(entry.timeTakenInSeconds)}</td>
                                <td>{formatDate(entry.submittedAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentLeaderboard;
