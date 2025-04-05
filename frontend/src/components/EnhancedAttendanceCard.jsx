import React, { useEffect, useState } from "react";
import { markLoginAPI, markLogoutAPI, markOnlineAPI, fetchTodayAttendanceAPI, fetchCourseSummaryAPI } from "../services/attendanceService";
import { fetchStudentProfile } from "../services/studentService";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const EnhancedAttendanceCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayAttendance, setTodayAttendance] = useState({});
  const [courseSummary, setCourseSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ name: "Student" }); // Dummy now

  useEffect(() => {
    fetchAttendanceData();
    fetchStudentData();
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const today = await fetchTodayAttendanceAPI();
      const course = await fetchCourseSummaryAPI();
      console.log("course" + JSON.stringify(course));
      setTodayAttendance(today);
      setCourseSummary(course);
    } catch (err) {
      console.error("Failed to fetch attendance data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentData = async () => {
    try {
      const student = await fetchStudentProfile();
      setProfile(student);
    } catch (err) {
      console.error("Failed to fetch student data:", err);
    }
  };

  const handleMarkLogin = async () => {
    await markLoginAPI();
    await fetchAttendanceData();
  };

  const handleMarkLogout = async () => {
    await markLogoutAPI();
    await fetchAttendanceData();
  };

  const handleMarkOnline = async () => {
    await markOnlineAPI();
    await fetchAttendanceData();
  };

  const calculateDuration = (loginTime, logoutTime) => {
    if (!loginTime || !logoutTime) return "—";
    const start = new Date(loginTime);
    const end = new Date(logoutTime);
    const diff = end - start;
    if (diff < 0) return "—";
    const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const mins = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const secs = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    return `${hours}:${mins}:${secs}`;
  };

  const isLoggedIn = todayAttendance.loginTime && !todayAttendance.logoutTime;
  const isCompleted = todayAttendance.loginTime && todayAttendance.logoutTime;
  const isOnline = todayAttendance?.status === "Online";

  if (loading || !courseSummary) return <div>Loading...</div>;

  const { totalDays, presentDays, absentDays, daysLeft } = courseSummary;

  const donutData = {
    labels: ["Present", "Absent", "Remaining"],
    datasets: [
      {
        data: [presentDays, absentDays, daysLeft],
        backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
        borderWidth: 1,
      },
    ],
  };

  const donutOptions = {
    plugins: { legend: { display: false } },
    cutout: "75%",
    maintainAspectRatio: false,
  };

  return (
    <div className="container">
      <div className="row g-4 align-items-stretch">

        {/* 1️⃣ Greeting Card */}
        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm text-center p-3 h-100">
            <h5>Hello 👋, {profile.name}</h5>
            <p className="text-muted small">How are you doing?<br />Ready for Today?</p>
          </div>
        </div>

        {/* 2️⃣ Course Progress Graph */}
        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm p-3 text-center h-100">
            <h6>📊 Course Progress</h6>
            <div style={{ width: "100px", height: "100px", margin: "0 auto" }}>
              <Doughnut data={donutData} options={donutOptions} />
            </div>
            <div className="mt-2" style={{ fontSize: "0.8rem" }}>
              {presentDays} Present / {totalDays} Days
            </div>
          </div>
        </div>

        {/* 3️⃣ Time Details Card */}
        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm p-3 h-100">
            <h6 className="text-center">🕒 Today's Time</h6>
            <table className="table table-sm table-borderless mb-0">
              <tbody>
                <tr>
                  <td>Current:</td>
                  <td><strong>{currentTime.toLocaleTimeString()}</strong></td>
                </tr>
                <tr>
                  <td>In-Time:</td>
                  <td><strong>{todayAttendance.loginTime ? new Date(todayAttendance.loginTime).toLocaleTimeString() : "—"}</strong></td>
                </tr>
                <tr>
                  <td>Out-Time:</td>
                  <td><strong>{todayAttendance.logoutTime ? new Date(todayAttendance.logoutTime).toLocaleTimeString() : "—"}</strong></td>
                </tr>
                <tr>
                  <td>Spent:</td>
                  <td><strong>{calculateDuration(todayAttendance.loginTime, todayAttendance.logoutTime)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4️⃣ Actions Card */}
        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm p-3 text-center h-100">
            <h6>🎯 Mark Attendance</h6>
            {!todayAttendance.loginTime && (
              <button className="btn btn-sm btn-success w-100 mb-2" onClick={handleMarkLogin}>
                ✅ Clock In
              </button>
            )}
            {isLoggedIn && (
              <button className="btn btn-sm btn-danger w-100 mb-2" onClick={handleMarkLogout}>
                🚪 Clock Out
              </button>
            )}
            {!isCompleted && !isLoggedIn && (
              <button className="btn btn-sm btn-outline-info w-100 mb-2" onClick={handleMarkOnline}>
                🌐 Attend Online
              </button>
            )}
            {isCompleted && (
              <div className="text-success small mt-2">Attendance Completed ✅</div>
            )}
            {isOnline && (
              <div className="text-info small mt-2">You're Online 🌐</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EnhancedAttendanceCard;
