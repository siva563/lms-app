import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <h3 className="mb-4">👨‍💼 Admin Dashboard</h3>

            <div className="row g-4">
                <div className="col-md-4">
                    <div
                        className="card shadow-sm p-3 text-center cursor-pointer"
                        onClick={() => navigate("/admin/register-user")}
                        style={{ cursor: "pointer" }}
                    >
                        <h5>Add Instructor / Student</h5>
                        <p className="text-muted">Create new users for your institution</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div
                        className="card shadow-sm p-3 text-center"
                        onClick={() => navigate("/admin/users")}
                        style={{ cursor: "pointer" }}
                    >
                        <h5>View All Users</h5>
                        <p className="text-muted">List of all registered users</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div
                        className="card shadow-sm p-3 text-center"
                        onClick={() => navigate("/admin/subjects")}
                        style={{ cursor: "pointer" }}
                    >
                        <h5>Manage Subjects</h5>
                        <p className="text-muted">Add/edit subjects and chapters</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div
                        className="card shadow-sm p-3 text-center"
                        onClick={() => navigate("/instructor/upload-quiz")}
                        style={{ cursor: "pointer" }}
                    >
                        <h5>Manage Quizs</h5>
                        <p className="text-muted">➕ Create Quiz</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div
                        className="card shadow-sm p-3 text-center"
                        onClick={() => navigate("/instructor/create-exam")}
                        style={{ cursor: "pointer" }}
                    >
                        <h5>Manage Exams</h5>
                        <p className="text-muted">➕ Create Quiz</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div
                        className="card shadow-sm p-3 text-center"
                        onClick={() => navigate("/admin/exam-analytics")}
                        style={{ cursor: "pointer" }}
                    >
                        <h5>Exam Dashboard</h5>
                        <p className="text-muted">View Results</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div
                        className="card shadow-sm p-3 text-center"
                        onClick={() => navigate("/admin/courses")}
                        style={{ cursor: "pointer" }}
                    >
                        <h5>Courses</h5>
                        <p className="text-muted">View Courses</p>
                    </div>
                </div>


                <div className="col-md-4">
                    <div
                        className="card shadow-sm p-3 text-center"
                        onClick={() => navigate("/admin/batches")}
                        style={{ cursor: "pointer" }}
                    >
                        <h5>Batches</h5>
                        <p className="text-muted">View Batches</p>
                    </div>
                </div>


                <div className="col-md-4">
                    <div
                        className="card shadow-sm p-3 text-center"
                        onClick={() => navigate("/admin-attendance-dashboard")}
                        style={{ cursor: "pointer" }}
                    >
                        <h5>Attendance </h5>
                        <p className="text-muted">View Attendance</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div
                        className="card shadow-sm p-3 text-center"
                        onClick={() => navigate("/chapter")}
                        style={{ cursor: "pointer" }}
                    >
                        <h5>Chapters </h5>
                        <p className="text-muted">View Chapters</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div
                        className="card shadow-sm p-3 text-center"
                        onClick={() => navigate("/create-content")}
                        style={{ cursor: "pointer" }}
                    >
                        <h5>Content Creation </h5>
                        <p className="text-muted">View Content</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
