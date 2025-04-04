import React, { useEffect, useState } from "react";
import { markLoginAPI, markLogoutAPI, getAttendanceSummary, markOnlineAPI, fetchBatchDaysFromService } from "../services/attendanceService";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    const { width } = chart;
    const { ctx } = chart;
    const total = chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0);
    const present = chart.config.data.datasets[0].data[0];
    const text = `${present}/${total}`;

    ctx.save();
    const fontSize = (width / 100).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000';
    const textX = Math.round((chart.width - ctx.measureText(text).width) / 2);
    const textY = chart._metasets[0].data[0].y;
    ctx.fillText(text, textX, textY);
    ctx.restore();
  }
};

ChartJS.register(centerTextPlugin);

const EnhancedAttendanceCard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timestamp, setTimestamp] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [duration, setDuration] = useState("00:00:00");
  const [attendanceStats, setAttendanceStats] = useState({ totalDays: 0, totalPresent: 0 });
  const [totalBatchDays, setTotalBatchDays] = useState(0);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("attendanceStatus")) || {};
    if (stored.date === today) {
      setIsLoggedIn(stored.status === "in");
      setIsCompleted(stored.completed);
      setTimestamp(stored.timestamp);
    }
    fetchBatchDays();
    fetchAttendanceStats();
  }, []);

  const fetchBatchDays = async () => {
    try {
      const total = await fetchBatchDaysFromService();
      setTotalBatchDays(total);
    } catch (err) {
      console.error("Error fetching batch days:", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (isLoggedIn && timestamp) {
        const diff = new Date() - new Date(`1970-01-01T${timestamp}`);
        const hours = String(Math.floor(diff / 3600000)).padStart(2, '0');
        const mins = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        const secs = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
        setDuration(`${hours}:${mins}:${secs}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isLoggedIn, timestamp]);

  const fetchAttendanceStats = async () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const stats = await getAttendanceSummary({ month: currentMonth });
    setAttendanceStats(stats);
  };

  const handleMark = async () => {
    if (!navigator.geolocation) return alert("Location not supported");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const now = new Date().toLocaleTimeString();
      if (!isLoggedIn) {
        await markLoginAPI(pos.coords.latitude, pos.coords.longitude);
        localStorage.setItem("attendanceStatus", JSON.stringify({ date: today, status: "in", timestamp: now, completed: false }));
        setIsLoggedIn(true);
        setTimestamp(now);
      } else {
        await markLogoutAPI();
        localStorage.setItem("attendanceStatus", JSON.stringify({ date: today, status: "out", timestamp: now, completed: true }));
        setIsLoggedIn(false);
        setIsCompleted(true);
        setTimestamp(now);
      }
    });
  };

  const handleOnline = async () => {
    await markOnlineAPI();
    alert("Online attendance marked ✅");
    setIsCompleted(true);
    fetchAttendanceStats();
  };

  const donutData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [attendanceStats.totalPresent, totalBatchDays - attendanceStats.totalPresent],
        backgroundColor: ["#28a745", "#dee2e6"],
        borderWidth: 1,
        cutout: "75%"
      },
    ],
  };

  const donutOptions = {
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false }
    },
    cutout: '75%',
    maintainAspectRatio: false,
  };

  return (
    <div className="row g-3">
      <div className="col-md-4">
        <div className="card shadow-sm p-2 text-center" style={{ fontSize: "0.85rem", height: "100%" }}>
          <h6 className="mb-2">📊 Attendance</h6>
          <div style={{ width: "100px", height: "100px", margin: "0 auto" }}>
            <Doughnut data={donutData} options={donutOptions} />
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm p-2" style={{ fontSize: "0.85rem", height: "100%" }}>
          <h6 className="text-center mb-2">🕒 Time Details</h6>
          <p className="mb-1">Current: <strong>{currentTime.toLocaleTimeString()}</strong></p>
          {isLoggedIn && <p className="text-success">Inside: <strong>{duration}</strong></p>}
          {!isLoggedIn && isCompleted && timestamp && <p className="text-secondary">Out at: <strong>{timestamp}</strong></p>}
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm p-2 text-center" style={{ fontSize: "0.85rem", height: "100%" }}>
          <h6 className="mb-2">🎯 Actions</h6>
          <button
            className={`btn btn-sm ${isLoggedIn ? "btn-danger" : "btn-success"} w-100 mb-2`}
            onClick={handleMark}
            disabled={isCompleted}
          >
            {isLoggedIn ? "🚪 Clock Out" : "✅ Clock In"}
          </button>
          <button
            className="btn btn-sm btn-outline-info w-100"
            onClick={handleOnline}
            disabled={isCompleted}
          >
            🌐 Online
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAttendanceCard;
