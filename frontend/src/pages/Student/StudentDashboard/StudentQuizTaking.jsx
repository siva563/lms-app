import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchFullQuizById, submitQuiz } from "../../../services/quizService";


const StudentQuizTaking = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);

    useEffect(() => {
        fetchQuiz();
    }, [quizId]);

    const fetchQuiz = async () => {
        try {
            const data = await fetchFullQuizById(quizId);
            console.log("data is:" + JSON.stringify(data));
            setQuiz(data);
        } catch (err) {
            console.error("❌ Failed to load quiz", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOptionChange = (qid, value) => {
        setAnswers((prev) => ({ ...prev, [qid]: value }));
    };

    const handleSubmit = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const result = await submitQuiz(quizId, answers, user?._id);
            setScore(result.score);
            setSubmitted(true);
        } catch (err) {
            console.error("❌ Quiz submission failed", err);
        }
    };

    if (loading) return <div className="p-4">Loading quiz...</div>;
    if (!quiz || !quiz.questionIds || quiz.questionIds.length === 0)
        return <div className="p-4">No questions found.</div>;

    const question = quiz.questionIds[current];
    const selected = answers[question._id] || "";

    return (
        <div className="container py-4">
            <h4 className="mb-4">📝 {quiz.title}</h4>

            {submitted ? (
                <div className="alert alert-success">
                    <h5>✅ Quiz Submitted!</h5>
                    <p>Your Score: <strong>{score}</strong></p>
                    <button className="btn btn-primary" onClick={() => navigate("/student/dashboard")}>
                        Back to Dashboard
                    </button>
                </div>
            ) : (
                <>
                    <div className="mb-3">
                        <h5>Q{current + 1}: {question.question}</h5>
                        {question.options?.map((opt, i) => (
                            <div key={i} className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name={question._id}
                                    value={opt}
                                    checked={selected === opt}
                                    onChange={() => handleOptionChange(question._id, opt)}
                                />
                                <label className="form-check-label">{opt}</label>
                            </div>
                        ))}
                        {question.type === "code" && (
                            <textarea
                                rows={5}
                                className="form-control mt-2"
                                placeholder="Write your code here"
                                value={selected}
                                onChange={(e) => handleOptionChange(question._id, e.target.value)}
                            />
                        )}
                        {question.type === "short" && (
                            <input
                                type="text"
                                className="form-control mt-2"
                                placeholder="Your answer"
                                value={selected}
                                onChange={(e) => handleOptionChange(question._id, e.target.value)}
                            />
                        )}
                    </div>

                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
                            disabled={current === 0}
                        >
                            ⬅️ Previous
                        </button>

                        {current < quiz.questionIds.length - 1 ? (
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => setCurrent((prev) => prev + 1)}
                            >
                                Next ➡️
                            </button>
                        ) : (
                            <button className="btn btn-success" onClick={handleSubmit}>
                                ✅ Submit Quiz
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default StudentQuizTaking;
