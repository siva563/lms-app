import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ExamDetails = ({ examId }) => {
  console.log("exam id:" + examId);
  const [exam, setExam] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(`${API}/exams/${examId}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        console.log("res.data.exam " + JSON.stringify(res.data));
        setExam(res.data);
      } catch (err) {
        console.error("❌ Failed to load exam details:", err);
      }
    };

    if (examId) {
      fetchExam();
    }
  }, [examId]);

  if (!examId) {
    return <div className="text-muted">🧪 Select an exam to view details</div>;
  }

  if (!exam) {
    return <div>Loading exam details...</div>;
  }

  return (
    <div className="p-3">
      <h4 className="mb-2">🧪 {exam.title}</h4>
      <p className="text-muted">
        ⏳ {exam.durationInMinutes} mins | 🗓️ {new Date(exam.scheduledAt).toLocaleString()}
      </p>
      <p><strong>Total Marks:</strong> {exam.totalMarks}</p>
      <hr />

      <h5 className="mt-4">📋 Questions</h5>
      {exam.questionIds.length === 0 ? (
        <p>No questions in this exam.</p>
      ) : (
        exam.questionIds.map((q, index) => (
          <div key={q._id} className="card mb-3 p-3 shadow-sm">
            <div className="d-flex justify-content-between">
              <div><strong>Q{index + 1}:</strong></div>
              <div className="text-muted">({q.questionType} | {q.marks} marks)</div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: q.questionText }} />
            {q.options && q.options.length > 0 && (
              <ul className="mt-2">
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ExamDetails;
