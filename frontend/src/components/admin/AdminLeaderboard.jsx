import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AdminLeaderboard = ({ examId }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!examId) return;

        const fetchLeaderboard = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${API}/admin/exams/${examId}/leaderboard`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                setLeaderboard(res.data || []);
            } catch (err) {
                console.error("❌ Failed to load leaderboard:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [examId]);

    return (
        <div className="mt-4">
            <h5 className="mb-3">🏆 Leaderboard</h5>

            {loading ? (
                <div className="alert alert-info">Loading leaderboard...</div>
            ) : leaderboard.length === 0 ? (
                <div className="text-muted">No submissions found.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Rank</th>
                                <th>Student Name</th>
                                <th>Email</th>
                                <th>Score</th>
                                <th>Time Taken</th>
                                <th>Submitted At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((s, index) => (
                                <tr key={s._id}>
                                    <td>#{index + 1}</td>
                                    <td>{s.studentName}</td>
                                    <td>{s.studentEmail}</td>
                                    <td>
                                        <strong>
                                            {s.score} / {s.totalMarks}
                                        </strong>
                                    </td>
                                    <td>
                                        {Math.floor(s.timeTakenInSeconds / 60)}m{" "}
                                        {s.timeTakenInSeconds % 60}s
                                    </td>
                                    <td>
                                        {new Date(s.submittedAt).toLocaleString("en-IN", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminLeaderboard;
