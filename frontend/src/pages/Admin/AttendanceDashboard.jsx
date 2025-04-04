import React, { useEffect, useState } from "react";
import { fetchBatches } from "../../services/batchService";
import { fetchStudents } from "../../services/userService";
import { fetchAttendanceSummary } from "../../services/adminAttendanceService";

const AttendanceDashboard = () => {
    const [batches, setBatches] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");
    const [attendanceData, setAttendanceData] = useState([]);
    const [filter, setFilter] = useState("7days");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    useEffect(() => {
        const loadData = async () => {
            const batchList = await fetchBatches();
            setBatches(batchList);
            const studentList = await fetchStudents("student");
            setStudents(studentList);
        };
        loadData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let fromDate, toDate;
            const today = new Date();
            if (filter === "7days") {
                fromDate = new Date(today);
                fromDate.setDate(today.getDate() - 6);
                toDate = today;
            } else if (filter === "30days") {
                fromDate = new Date(today);
                fromDate.setDate(today.getDate() - 29);
                toDate = today;
            } else if (filter === "range") {
                if (!from || !to) return;
                fromDate = new Date(from);
                toDate = new Date(to);
            }
            const fromStr = fromDate.toISOString().slice(0, 10);
            const toStr = toDate.toISOString().slice(0, 10);

            const data = await fetchAttendanceSummary({
                batchId: selectedBatch,
                studentId: selectedStudent,
                from: fromStr,
                to: toStr,
            });
            setAttendanceData(data);
        };

        fetchData();
    }, [selectedBatch, selectedStudent, filter, from, to]);

    return (
        <div className="container py-4">
            <h3 className="mb-4">Admin Attendance Dashboard</h3>

            <div className="row mb-3">
                <div className="col-md-3">
                    <label>Batch</label>
                    <select
                        className="form-select"
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                    >
                        <option value="">All Batches</option>
                        {batches.map((b) => (
                            <option key={b._id} value={b._id}>{b.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-3">
                    <label>Student</label>
                    <select
                        className="form-select"
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                        <option value="">All Students</option>
                        {students.map((s) => (
                            <option key={s._id} value={s._id}>{s.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6 d-flex align-items-end justify-content-end gap-2">
                    <button className={`btn btn-outline-secondary ${filter === "7days" ? "active" : ""}`} onClick={() => setFilter("7days")}>7 Days</button>
                    <button className={`btn btn-outline-secondary ${filter === "30days" ? "active" : ""}`} onClick={() => setFilter("30days")}>30 Days</button>
                    <button className={`btn btn-outline-secondary ${filter === "range" ? "active" : ""}`} onClick={() => setFilter("range")}>Custom</button>
                    {filter === "range" && (
                        <>
                            <input type="date" className="form-control" value={from} onChange={(e) => setFrom(e.target.value)} />
                            <input type="date" className="form-control" value={to} onChange={(e) => setTo(e.target.value)} />
                        </>
                    )}
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Student</th>
                            <th>Batch</th>
                            <th>Total Days</th>
                            <th>Present</th>
                            <th>Late</th>
                            <th>Absent</th>
                            <th>%</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((row) => (
                            <tr key={row.studentId}>
                                <td>{row.name}</td>
                                <td>{row.batchName}</td>
                                <td>{row.totalWorkingDays}</td>
                                <td>{row.presentDays}</td>
                                <td>{row.lateDays}</td>
                                <td>{row.absentDays}</td>
                                <td>{row.percentage}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceDashboard;