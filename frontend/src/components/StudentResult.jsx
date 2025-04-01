import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken, getUser } from "../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const StudentResult = ({ examId }) => {
    const user = getUser();
    const [submission, setSubmission] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await axios.get(
                    `${API}/submissions/result?examId=${examId}&studentId=${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    }
                );
                setSubmission(res.data);
            } catch (err) {
                console.error("❌ Failed to fetch result:", err);
            }
        };

        if (examId) fetchResult();
    }, [examId]);

    if (!submission) return <div>Loading result...</div>;

    const {
        examTitle,
        score,
        totalMarks,
        timeTakenInSeconds,
        startedAt,
        submittedAt,
        questionDetails,
    } = submission;

    const formatTime = (dateStr) =>
        new Date(dateStr).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        });

    return (
        <div className="p-3">
            <h4 className="mb-3">📊 Exam Result Summary</h4>

            <div className="border rounded p-3 mb-4 bg-light shadow-sm">
                <p><strong>🧪 Exam:</strong> {examTitle}</p>
                <p><strong>🎯 Score:</strong> {score} / {totalMarks}</p>
                <p>
                    <strong>⏱ Time Taken:</strong>{" "}
                    {Math.floor(timeTakenInSeconds / 60)} mins{" "}
                    {timeTakenInSeconds % 60}s
                </p>
                <p><strong>🕒 Started At:</strong> {formatTime(startedAt)}</p>
                <p><strong>📤 Submitted At:</strong> {formatTime(submittedAt)}</p>
            </div>

            <h5 className="mb-3">📚 Question Breakdown</h5>

            {questionDetails.map((q, index) => (
                <div key={index} className="mb-3 border rounded p-3 shadow-sm">
                    <p>
                        <strong>Q{index + 1}:</strong>{" "}
                        <span dangerouslySetInnerHTML={{ __html: q.questionText }} />
                    </p>

                    <p>
                        <strong>🧠 Your Answer:</strong>{" "}
                        <span className={q.isCorrect ? "text-success" : "text-danger"}>
                            {q.studentAnswer || "Not Answered"}
                            {q.isCorrect ? " ✅" : " ❌"}
                        </span>
                    </p>

                    <p><strong>✅ Correct Answer:</strong> {q.correctAnswer}</p>
                </div>
            ))}
        </div>
    );
};

export default StudentResult;
