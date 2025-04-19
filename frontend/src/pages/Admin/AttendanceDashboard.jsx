import React, { useEffect, useState } from "react";
import { fetchBatches } from "../../services/batchService";
import { fetchStudents } from "../../services/userService";
import { fetchAttendanceSummary, fetchStudentWiseAttendance } from "../../services/adminAttendanceService";
import { useNavigate } from "react-router-dom";
import AddAttendanceModal from "./AddAttendanceModal";
import EditAttendanceModal from "./EditAttendanceModal";

const AttendanceDashboard = () => {
    const [batches, setBatches] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");
    const [attendanceData, setAttendanceData] = useState([]);
    const [filter, setFilter] = useState("7days");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [editRecord, setEditRecord] = useState(null);

    const navigate = useNavigate();

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
        fetchAttendanceData();
    }, [selectedBatch, selectedStudent, filter, from, to]);

    const fetchAttendanceData = async () => {
        try {
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
        } catch (err) {
            console.error("Error fetching attendance summary:", err);
        }
    };


    const handleEditClick = async (studentId) => {
        console.log("student id is:" + studentId);
        try {
            const today = new Date().toISOString().slice(0, 10);

            const records = await fetchStudentWiseAttendance({
                studentId,
                from: today,
                to: today
            });

            if (records.length > 0) {
                const record = records[0]; // 📌 Pick today's record
                setEditRecord(record);
                setShowEditModal(true);
            } else {
                alert("No attendance record found for today!");
            }
        } catch (err) {
            console.error("❌ Error fetching student attendance:", err);
        }
    };



    const fetchDataAgain = () => {
        fetchAttendanceData();
    };

    return (
        <div className="container py-4">
            <h3 className="mb-4">Admin Attendance Dashboard</h3>

            <button className="btn btn-outline-primary mb-3" onClick={() => navigate("/admin")}>
                ← Back to Dashboard
            </button>

            {/* <button className="btn btn-primary mb-4 ms-3" onClick={() => setShowAddModal(true)}>
                ➕ Add Attendance
            </button> */}

            {/* Filters Section */}
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
                    <button className={`btn btn-outline-secondary ${filter === "7days" ? "active" : ""}`} onClick={() => setFilter("7days")}>
                        7 Days
                    </button>
                    <button className={`btn btn-outline-secondary ${filter === "30days" ? "active" : ""}`} onClick={() => setFilter("30days")}>
                        30 Days
                    </button>
                    <button className={`btn btn-outline-secondary ${filter === "range" ? "active" : ""}`} onClick={() => setFilter("range")}>
                        Custom
                    </button>
                    {filter === "range" && (
                        <>
                            <input
                                type="date"
                                className="form-control"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            />
                            <input
                                type="date"
                                className="form-control"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Attendance Table */}
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
                            <th>Actions</th>
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
                                <td>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => navigate(`/attendance/${row.studentId}`)}
                                    >
                                        🔍 View Attendance
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            {/* <AddAttendanceModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onAttendanceAdded={fetchDataAgain}
            /> */}

            <EditAttendanceModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                record={editRecord}
                onAttendanceUpdated={fetchDataAgain}
            />
        </div>
    );
};

export default AttendanceDashboard;
