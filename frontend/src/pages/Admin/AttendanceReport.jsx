import React, { useEffect, useState } from "react";
import { fetchAttendanceReport, getAttendanceSummary } from "../../services/attendanceService";
import { fetchBatches } from "../../services/batchService";
import { fetchUsers } from "../../services/userService"
import axios from "axios";

const AttendanceReport = () => {
    const [batches, setBatches] = useState([]);
    const [students, setStudents] = useState([]);
    const [filters, setFilters] = useState({ batchId: "", studentId: "", month: "" });
    const [records, setRecords] = useState([]);
    const [summary, setSummary] = useState([]);

    useEffect(() => {
        loadBatchesAndStudents();
    }, []);

    const loadBatchesAndStudents = async () => {
        // const token = localStorage.getItem("token");
        const [batchRes, studentRes] = await Promise.all([fetchBatches(), fetchUsers()]);
        setBatches(batchRes);
        setStudents(studentRes);
    };

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = async () => {
        const data = await fetchAttendanceReport(filters);
        await fetchSummary();
        setRecords(data);
    };

    const fetchSummary = async () => {
        try {
            const summaryData = await getAttendanceSummary({
                batchId: filters.batchId,
                studentId: filters.studentId,
                month: filters.month,
            });
            setSummary(summaryData);
        } catch (err) {
            console.error("Summary fetch error:", err);
        }
    };

    return (
        <div className="container mt-4">
            <h4 className="mb-3">📊 Attendance Report</h4>

            {summary && (
                <div className="alert alert-info">
                    📅 Total Working Days: {summary.totalDays} | ✅ Present: {summary.totalPresent} | ❌ Absent: {summary.totalAbsent}
                </div>
            )}

            {/* Filters */}
            <div className="row mb-3">
                <div className="col-md-4">
                    <label>Batch</label>
                    <select name="batchId" className="form-select" onChange={handleChange}>
                        <option value="">All Batches</option>
                        {batches.map((b) => (
                            <option key={b._id} value={b._id}>{b.name}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <label>Student</label>
                    <select name="studentId" className="form-select" onChange={handleChange}>
                        <option value="">All Students</option>
                        {students.map((s) => (
                            <option key={s._id} value={s._id}>{s.name}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <label>Month</label>
                    <input
                        type="month"
                        name="month"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
            </div>

            <button className="btn btn-primary mb-4" onClick={handleSearch}>
                🔍 Search
            </button>

            {/* Report Table */}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Date</th>
                            <th>Student</th>
                            <th>Batch</th>
                            <th>Login Time</th>
                            <th>Logout Time</th>
                            <th>Duration (min)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length === 0 ? (
                            <tr><td colSpan="6" className="text-center">No records found</td></tr>
                        ) : (
                            records.map((r) => (
                                <tr key={r._id}>
                                    <td>{r.date}</td>
                                    <td>{r.studentId?.name}</td>
                                    <td>{r.batchId?.name}</td>
                                    <td>{new Date(r.loginTime).toLocaleTimeString()}</td>
                                    <td>{r.logoutTime ? new Date(r.logoutTime).toLocaleTimeString() : "-"}</td>
                                    <td>{r.durationMinutes || "-"}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceReport;
