import React from "react";
import TopNavbar from "./TopNavbar";
import { getUserData } from "../../../utils/tokenHelper";
import AttendanceCard from "../components/AttendanceCard";
import CourseProgressCard from "../components/CourseProgressCard";
import RankCard from "../components/RankCard";
import ExamStatsCard from "../components/ExamStatsCard";
import MarkAttendanceButton from "../../../components/MarkAttendanceButton";
import AttendanceCalendar from "../components/AttendanceCalendar";
import EnhancedAttendanceCard from "../../../components/EnhancedAttendanceCard";
import { useNavigate } from "react-router-dom";
const CandidateDashboard = () => {
    const user = getUserData();
    const batchId = user?.batchId;
    console.log("batch id is:" + batchId);
    const navigate = useNavigate();


    const handleViewMyAttendance = () => {
        const student = JSON.parse(localStorage.getItem("user")); // fetch logged-in student info
        if (student?._id) {
            navigate(`/my-attendance/${student._id}`);
        } else {
            alert("Student info not found. Please login again.");
        }
    };

    return (
        <div>
            {/* Top Navigation Bar */}
            {/* <TopNavbar studentName={user?.name || "Student"} /> */}

            {/* Main Dashboard Content */}
            <div className="container mt-4">
                {/* <div className="row">
                    <div className="col-md-6 col-lg-3 mb-4 ms-auto">
                        <MarkAttendanceButton />
                    </div>
                </div> */}
                <div className="row mb-4">
                    <EnhancedAttendanceCard />
                </div>
                <div className="row">
                    {/* Attendance Card */}
                    {/* <div className="col-md-6 col-lg-3 mb-4">
                        <AttendanceCard batchId={batchId} />
                    </div> */}

                    {/* <div className="col-md-6 col-lg-3 mb-4">
                        <CourseProgressCard />
                    </div> */}

                    {/* <div className="col-md-6 col-lg-3 mb-4">
                        <RankCard />
                    </div> */}

                    {/* <div className="col-md-6 col-lg-3 mb-4">
                        <ExamStatsCard />
                    </div> */}

                    {/* <div className="col-12 mb-4">
                        <AttendanceCalendar />
                    </div> */}

                    {/* More dashboard cards like CourseProgressCard, RankCard, etc. will go here */}
                </div>
            </div>
        </div>
    );
};

export default CandidateDashboard;
