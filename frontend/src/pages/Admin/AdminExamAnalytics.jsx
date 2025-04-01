import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../utils/tokenHelper";
import ExamStatsCard from "../../components/admin/ExamStatsCard";
import AdminLeaderboard from "../../components/admin/AdminLeaderboard";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AdminExamAnalytics = () => {
    const [exams, setExams] = useState([]);
    const [selectedExamId, setSelectedExamId] = useState("");
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);

    // Load all exams on mount
    useEffect(() => {
        const fetchExams = async () => {
            try {
                const res = await axios.get(`${API}/exams`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                setExams(res.data || []);
            } catch (err) {
                console.error("❌ Failed to load exams:", err.response?.data?.message || err.message);
                if (err.response?.status === 401) {
                    alert("Your session expired. Please login again.");
                    navigate("/"); // Or redirect to login
                }
            }
        };
        fetchExams();
    }, []);

    // Load analytics when exam changes
    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!selectedExamId) return;

            setLoading(true);
            try {
                const res = await axios.get(`${API}/admin/exams/${selectedExamId}/analytics`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                setAnalytics(res.data);
            } catch (err) {
                console.error("❌ Failed to load analytics:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [selectedExamId]);

    return (
        <div className="container py-4">
            <h3 className="mb-4">📊 Admin Exam Analytics</h3>

            {/* Select Exam */}
            <div className="mb-4">
                <label className="form-label fw-bold">Select Exam</label>
                <select
                    className="form-select"
                    value={selectedExamId}
                    onChange={(e) => setSelectedExamId(e.target.value)}
                >
                    <option value="">-- Choose an Exam --</option>
                    {exams.map((exam) => (
                        <option key={exam._id} value={exam._id}>
                            {exam.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Analytics Result */}
            {loading ? (
                <div className="alert alert-info">Loading analytics...</div>
            ) : analytics ? (
                <>
                    <ExamStatsCard analytics={analytics} />
                    <AdminLeaderboard examId={selectedExamId} />
                </>
            ) : (
                <div className="text-muted">Please select an exam to view analytics.</div>
            )}
        </div>
    );
};

export default AdminExamAnalytics;
