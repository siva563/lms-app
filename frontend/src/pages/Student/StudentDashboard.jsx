import React, { useEffect, useState } from "react";
import { getUser, getToken } from "../../utils/tokenHelper";
import { fetchSubjects } from "../../services/subjectService";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../components/StudentSidebar";
import RightContent from "../../components/RightContent";
import MultiLevelSidebar from "../../components/MultiLevelSidebar";
import ExamDetails from "../../components/ExamDetails";
import ExamTaking from "../../components/ExamTaking";
import StudentResult from "../../components/StudentResult";
import StudentLeaderboard from "./StudentLeaderboard";
import { markLoginAPI, markLogoutAPI } from "../../services/attendanceService";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const StudentDashboard = () => {
    const user = getUser();
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedExamId, setSelectedExamId] = useState(null);
    const [activeExamId, setActiveExamId] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    useEffect(() => {
        const loadSubjects = async () => {
            const data = await fetchSubjects(user.institution?.id || user.institutionId);
            setSubjects(data);
        };
        loadSubjects();
    }, []);

    const handleExamClick = async (examId) => {
        try {
            const res = await axios.get(
                `${API}/submissions/check?examId=${examId}&studentId=${user.id}`,
                { headers: { Authorization: `Bearer ${getToken()}` } }
            );

            if (res.data.alreadySubmitted) {
                setShowResult(true);
            } else {
                setShowResult(false);
            }

            setActiveExamId(examId);
            setSelectedChapter(null);
        } catch (err) {
            console.error("Exam check failed", err);
        }
    };


    const markLogin = () => {
        if (!navigator.geolocation) return alert("Location not supported");
        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                console.log("pos :" +pos.coords.latitude);
                console.log("pos :" +pos.coords.longitude);
                const data = await markLoginAPI(pos.coords.latitude, pos.coords.longitude);
                alert(data.message);
            } catch (err) {
                alert(err.response?.data?.message || "Login marking failed");
            }
        });
    };

    const markLogout = async () => {
        try {
            const data = await markLogoutAPI();
            alert(data.message);
        } catch (err) {
            alert(err.response?.data?.message || "Logout marking failed");
        }
    };

    return (
        <div className="d-flex flex-column vh-100">
            {/* ✅ Fixed Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top px-4">
                <span className="navbar-brand">🎓 CodeBegun LMS</span>
                <div className="ms-auto dropdown">
                    <span
                        className="text-white dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                    >
                        👤 {user?.name}
                    </span>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><button className="dropdown-item">Refer & Earn</button></li>
                        <li><button className="dropdown-item">My Profile</button></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <button className="dropdown-item text-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* <button className="btn btn-success mt-5" onClick={handleMarkAttendance}>
                📍 Mark My Attendance
            </button> */}

            <div className="container mt-5">
                <button className="btn btn-success mb-3" onClick={markLogin}>
                    ✅ Mark Entry
                </button>

                <button className="btn btn-danger" onClick={markLogout}>
                    🚪 Mark Exit
                </button>

            </div>

            {/* ✅ Content Area (Sidebar + Main) */}
            <div className="d-flex flex-grow-1 overflow-hidden" style={{ paddingTop: "56px" }}>
                {/* Sidebar */}
                <div style={{ width: "230px", overflowY: "auto", background: "#f8f9fa", borderRight: "1px solid #ddd" }}>
                    <MultiLevelSidebar
                        // onChapterClick={(subjectId, chapterId, chapterName) => {
                        //     setSelectedChapter({
                        //         subjectId,
                        //         chapterId,
                        //         name: chapterName,
                        //         videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Later from DB
                        //     });

                        // }}

                        onChapterClick={(subjectId, chapterId, chapterName) => {
                            setSelectedChapter({
                                subjectId,
                                chapterId,
                                name: chapterName,
                                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                            });
                            setActiveExamId(null);     // ✅ Clear active exam
                            setShowResult(false);      // ✅ Reset result view
                        }}

                        // onExamClick={(examId) => {
                        //     console.log("🎯 Exam clicked:", examId); // ✅ Add this
                        //     setActiveExamId(examId);
                        // }}

                        onExamClick={handleExamClick}

                    // onExamClick={(examId) => {
                    //     console.log("🎯 Exam clicked:", examId);
                    //     setActiveExamId(examId);
                    //     setSelectedChapter(null); // ✅ Clear chapter view
                    //     setShowResult(false);     // ✅ Reset result view
                    // }}
                    />
                </div>

                {/* Main Content */}
                <div className="flex-grow-1 p-4 overflow-auto">
                    {/* <h3 className="mt-2">👋 Welcome, {user?.name}</h3>
                    <p className="text-muted">📅 Your Schedule</p>
                    <p className="mb-4">Here are your next sessions to complete</p> */}

                    {/* <RightContent selectedChapter={selectedChapter} />
                    {selectedExamId && <ExamDetails examId={selectedExamId} />}
                   

                    {!showResult ? (
                        <ExamTaking examId={activeExamId} setShowResult={setShowResult} />
                    ) : (
                        <StudentResult examId={activeExamId} />
                    )} */}

                    {/* {showResult ? (
                        <StudentResult examId={activeExamId} />
                        <StudentLeaderboard examId={activeExamId} />
                    ) : activeExamId ? (
                        <ExamTaking examId={activeExamId} setShowResult={setShowResult} />
                    ) : selectedChapter ? (
                        <RightContent selectedChapter={selectedChapter} />
                    ) : (
                        <div className="text-muted">Please select a chapter or exam from the sidebar.</div>
                    )} */}

                    {showResult ? (
                        <>
                            <StudentResult examId={activeExamId} />
                            {/* <StudentLeaderboard examId={activeExamId} /> */}
                            <div className="accordion mt-3" id="leaderboardAccordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingLeaderboard">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseLeaderboard"
                                            aria-expanded="false"
                                            aria-controls="collapseLeaderboard"
                                        >
                                            🏆 View Leaderboard
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseLeaderboard"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingLeaderboard"
                                        data-bs-parent="#leaderboardAccordion"
                                    >
                                        <div className="accordion-body">
                                            <StudentLeaderboard examId={activeExamId} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : activeExamId ? (
                        <ExamTaking examId={activeExamId} setShowResult={setShowResult} />
                    ) : selectedChapter ? (
                        <RightContent selectedChapter={selectedChapter} />
                    ) : (
                        <div className="text-muted">Please select a chapter or exam from the sidebar.</div>
                    )}

                    {/* Add student dashboard widgets here (e.g., Upcoming Exams) */}
                </div>
            </div>

            {/* ✅ Sticky Footer */}
            <footer className="bg-primary text-white text-center py-3">
                <div>© {new Date().getFullYear()} CodeBegun LMS. All rights reserved.</div>
            </footer>
        </div>
    );
};

export default StudentDashboard;
