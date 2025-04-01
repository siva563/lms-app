import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken, getUser } from "../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ExamTaking = ({ examId, setShowResult }) => {
    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null); // ⏱ Timer
    const [startTime, setStartTime] = useState(null);

    const user = getUser();

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const res = await axios.get(`${API}/exams/${examId}`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });

                const examData = res.data;
                setExam(examData);
                setStartTime(new Date());

                // ⏱ Set timer (in seconds)
                const totalSeconds = examData.durationInMinutes * 60;
                setTimeLeft(totalSeconds);
            } catch (err) {
                console.error("❌ Failed to load exam:", err);
            }
        };

        if (examId) fetchExam();
    }, [examId]);

    // ⏱ Timer Countdown Logic
    useEffect(() => {
        if (timeLeft === null) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    const handleChange = (questionId, value, type) => {
        if (type === "multiselect") {
            setAnswers((prev) => {
                const current = new Set(prev[questionId] || []);
                current.has(value) ? current.delete(value) : current.add(value);
                return { ...prev, [questionId]: Array.from(current) };
            });
        } else {
            setAnswers((prev) => ({ ...prev, [questionId]: value }));
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const payload = {
                examId,
                studentId: user.id,
                answers,
                startedAt: startTime
            };
            await axios.post(`${API}/submissions`, payload, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            alert("✅ Exam submitted successfully!");
            setShowResult(true);
        } catch (err) {
            if (err.response?.data?.message === "❌ Already submitted!") {
                alert("You have already submitted this exam!");
                setShowResult(true); // ✅ Load result if needed
            } else {
                console.error("❌ Submit failed:", err);
                alert("Submission failed. Try again.");
            }
        }
        setSubmitting(false);
    };

    if (!exam) return <div>Loading exam...</div>;

    return (
        <div className="p-3">
            {/* ⏱ Timer */}
            <div className="alert alert-info text-center fw-bold">
                ⏱ Remaining Time: {formatTime(timeLeft || 0)}
            </div>

            <h4>🧪 {exam.title}</h4>
            <p className="text-muted">
                ⏳ {exam.durationInMinutes} mins | 🗓️{" "}
                {new Date(exam.scheduledAt).toLocaleString()}
            </p>
            <p><strong>Total Marks:</strong> {exam.totalMarks}</p>
            <hr />

            <form>
                {exam.questionIds.map((q, index) => (
                    <div key={q._id} className="mb-4 p-3 border rounded shadow-sm">
                        <div className="mb-2">
                            <strong>Q{index + 1}:</strong>{" "}
                            <span dangerouslySetInnerHTML={{ __html: q.questionText }} />
                            <small className="text-muted float-end">
                                ({q.questionType} | {q.marks} marks)
                            </small>
                        </div>

                        {/* ✅ MCQ */}
                        {q.questionType === "mcq" &&
                            q.options &&
                            typeof q.options === "object" &&
                            Object.entries(q.options).map(([key, value], i) => (
                                <div className="form-check" key={i}>
                                    <input
                                        type="radio"
                                        name={`q-${q._id}`}
                                        value={key}
                                        checked={answers[q._id] === key}
                                        onChange={() => handleChange(q._id, key, "mcq")}
                                        className="form-check-input"
                                        id={`mcq-${q._id}-${i}`}
                                    />
                                    <label className="form-check-label" htmlFor={`mcq-${q._id}-${i}`}>
                                        {key}. {value}
                                    </label>
                                </div>
                            ))}

                        {/* ✅ Multi-select */}
                        {q.questionType === "multiselect" &&
                            q.options &&
                            typeof q.options === "object" &&
                            Object.entries(q.options).map(([key, value], i) => (
                                <div className="form-check" key={i}>
                                    <input
                                        type="checkbox"
                                        name={`q-${q._id}`}
                                        value={key}
                                        checked={(answers[q._id] || []).includes(key)}
                                        onChange={() => handleChange(q._id, key, "multiselect")}
                                        className="form-check-input"
                                        id={`multi-${q._id}-${i}`}
                                    />
                                    <label className="form-check-label" htmlFor={`multi-${q._id}-${i}`}>
                                        {key}. {value}
                                    </label>
                                </div>
                            ))}

                        {/* ✅ Short Answer */}
                        {q.questionType === "short" && (
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Your answer"
                                value={answers[q._id] || ""}
                                onChange={(e) => handleChange(q._id, e.target.value, "short")}
                            />
                        )}

                        {/* ✅ Dropdown */}
                        {q.questionType === "dropdown" &&
                            q.options &&
                            typeof q.options === "object" && (
                                <select
                                    className="form-select"
                                    value={answers[q._id] || ""}
                                    onChange={(e) => handleChange(q._id, e.target.value, "dropdown")}
                                >
                                    <option value="">-- Select an option --</option>
                                    {Object.entries(q.options).map(([key, value], i) => (
                                        <option key={i} value={key}>
                                            {key}. {value}
                                        </option>
                                    ))}
                                </select>
                            )}
                    </div>
                ))}
            </form>

            <button
                className="btn btn-success mt-3"
                onClick={handleSubmit}
                disabled={submitting}
            >
                {submitting ? "Submitting..." : "Submit Exam"}
            </button>
        </div>
    );
};

export default ExamTaking;
