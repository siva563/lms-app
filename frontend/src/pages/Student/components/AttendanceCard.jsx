import React, { useEffect, useState } from "react";
import { getAttendanceSummary } from "../../../services/attendanceService";

const AttendanceCard = ({ batchId }) => {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        if (!batchId) return;

        const fetchSummary = async () => {
            try {
                const currentMonth = new Date().toISOString().slice(0, 7); // format: YYYY-MM
                const data = await getAttendanceSummary({
                    batchId,
                    month: currentMonth,
                });
                setSummary(data);
            } catch (err) {
                console.error("Attendance summary error:", err);
            }
        };

        fetchSummary();
    }, [batchId]);

    if (!summary) {
        return (
            <div className="card shadow-sm">
                <div className="card-body text-center">
                    <div className="spinner-border text-primary" role="status" />
                </div>
            </div>
        );
    }

    const percentage = Math.round((summary.totalPresent / summary.totalDays) * 100);

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title text-primary"><i className="bi bi-clock"></i> Attendance</h5>
                <p className="card-text fs-5 mb-1">
                    Present: <strong>{summary.totalPresent}</strong> / {summary.totalDays} days
                </p>
                <p className="card-text text-success fw-bold">
                    {percentage}% Attendance
                </p>
                <a href="/full-attendance" className="btn btn-sm btn-outline-primary mt-2">
                    View Full Attendance
                </a>
            </div>
        </div>
    );
};

export default AttendanceCard;
