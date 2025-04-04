import React, { useEffect, useState } from "react";
import { getExamSummary } from "../../../services/examService";

const ExamStatsCard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getExamSummary();
        setStats(data);
      } catch (err) {
        console.error("Exam stats fetch error:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div className="card"><div className="card-body">Loading...</div></div>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-info">📝 Exam Overview</h5>
        <p className="card-text fs-5">
          Exams Created: <strong>{stats.totalExams}</strong>
        </p>
        <p className="card-text">
          Students Attempted: <strong>{stats.totalAttempts}</strong>
        </p>
        <a href="/student/exams" className="btn btn-sm btn-outline-info mt-2">
          View All Exams
        </a>
      </div>
    </div>
  );
};

export default ExamStatsCard;
