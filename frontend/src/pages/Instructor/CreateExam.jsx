import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUser } from "../../utils/tokenHelper";
import { fetchSubjects } from "../../services/subjectService";
import { fetchChapters } from "../../services/chapterService";
import { getToken } from "../../utils/tokenHelper";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const CreateExam = () => {
    const user = getUser();
    const institutionId = user?.institution?.id || user?.institutionId;

    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedChapters, setSelectedChapters] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    const [examDetails, setExamDetails] = useState({
        title: "",
        description: "",
        durationInMinutes: 60,
        scheduledAt: "",
    });

    const [filters, setFilters] = useState({
        difficulty: "",
        type: "",
    });

    useEffect(() => {
        fetchSubjects(institutionId).then(setSubjects);
    }, []);

    const loadChapters = async (subjectId) => {
        const data = await fetchChapters(subjectId);
        setChapters(data);
        setSelectedChapters([]);
    };

    const loadQuestions = async () => {
        try {
            const res = await axios.get(`${API}/quizzes`, {
                params: {
                    subjectId: selectedSubject,
                    chapterIds: selectedChapters,
                    difficulty: filters.difficulty,
                    type: filters.type,
                },
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
                // headers: { Authorization: `Bearer ${user.token}` },
                // Authorization: `Bearer ${getToken()}`
            });
            setQuestions(res.data);
        } catch (err) {
            console.error("Error loading questions:", err);
        }
    };

    const toggleQuestion = (qid) => {
        if (selectedQuestions.includes(qid)) {
            setSelectedQuestions((prev) => prev.filter((id) => id !== qid));
        } else {
            setSelectedQuestions((prev) => [...prev, qid]);
        }
    };

    const handleExamSubmit = async () => {
        try {
            const totalMarks = questions
                .filter((q) => selectedQuestions.includes(q._id))
                .reduce((sum, q) => sum + q.marks, 0);

            const payload = {
                ...examDetails,
                institutionId,
                createdBy: user.id,
                subjectId: selectedSubject,
                chapterIds: selectedChapters,
                questionIds: selectedQuestions,
                totalMarks,
            };

            const res = await axios.post(`${API}/exams`, payload, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
            });

            alert("✅ Exam created successfully!");
        } catch (err) {
            alert("❌ Exam creation failed");
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
            <h4 className="text-center mb-4">📘 Create Exam</h4>

            {/* Exam Info */}
            <div className="card p-4 mb-4 shadow-sm">
                <h5 className="mb-3">📝 Exam Details</h5>

                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Exam Title"
                    value={examDetails.title}
                    onChange={(e) =>
                        setExamDetails({ ...examDetails, title: e.target.value })
                    }
                />
                <textarea
                    className="form-control mb-2"
                    placeholder="Description"
                    rows="2"
                    value={examDetails.description}
                    onChange={(e) =>
                        setExamDetails({ ...examDetails, description: e.target.value })
                    }
                />
                <div className="row g-2 mb-2">
                    <div className="col-md-6">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Duration (in minutes)"
                            value={examDetails.durationInMinutes}
                            onChange={(e) =>
                                setExamDetails({
                                    ...examDetails,
                                    durationInMinutes: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="datetime-local"
                            className="form-control"
                            value={examDetails.scheduledAt}
                            onChange={(e) =>
                                setExamDetails({
                                    ...examDetails,
                                    scheduledAt: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Subject + Chapters */}
            <div className="card p-4 mb-3 shadow-sm">
                <h5 className="mb-2">📚 Select Subject & Chapters</h5>

                <select
                    className="form-select mb-3"
                    value={selectedSubject}
                    onChange={(e) => {
                        setSelectedSubject(e.target.value);
                        loadChapters(e.target.value);
                    }}
                >
                    <option value="">-- Select Subject --</option>
                    {subjects.map((sub) => (
                        <option key={sub._id} value={sub._id}>
                            {sub.name}
                        </option>
                    ))}
                </select>

                <div className="d-flex flex-wrap gap-3">
                    {chapters.map((ch) => (
                        <div key={ch._id} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={ch._id}
                                value={ch._id}
                                checked={selectedChapters.includes(ch._id)}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (e.target.checked) {
                                        setSelectedChapters((prev) => [...prev, val]);
                                    } else {
                                        setSelectedChapters((prev) =>
                                            prev.filter((id) => id !== val)
                                        );
                                    }
                                }}
                            />
                            <label className="form-check-label" htmlFor={ch._id}>
                                {ch.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filters */}
            <div className="card p-4 mb-3 shadow-sm">
                <h5 className="mb-2">🎯 Filter Questions</h5>

                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <select
                            className="form-select"
                            value={filters.difficulty}
                            onChange={(e) =>
                                setFilters({ ...filters, difficulty: e.target.value })
                            }
                        >
                            <option value="">All Difficulties</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <select
                            className="form-select"
                            value={filters.type}
                            onChange={(e) =>
                                setFilters({ ...filters, type: e.target.value })
                            }
                        >
                            <option value="">All Types</option>
                            <option value="mcq">MCQ</option>
                            <option value="multiselect">Multi Select</option>
                            <option value="short">Short Answer</option>
                            <option value="dropdown">Dropdown</option>
                        </select>
                    </div>
                </div>

                <button className="btn btn-primary" onClick={loadQuestions}>
                    🔍 Load Questions
                </button>
            </div>

            {/* Question List */}
            <div className="row">
                {questions.map((q) => (
                    <div className="col-md-6 mb-3" key={q._id}>
                        <div
                            className={`card p-3 ${selectedQuestions.includes(q._id) ? "border-success" : ""
                                }`}
                            onClick={() => toggleQuestion(q._id)}
                            style={{ cursor: "pointer" }}
                        >
                            <div dangerouslySetInnerHTML={{ __html: q.questionText }} />
                            <div className="mt-2">
                                <span className="badge bg-secondary me-2">
                                    {q.questionType.toUpperCase()}
                                </span>
                                <span className="badge bg-info">Marks: {q.marks}</span>
                                <span className="badge bg-light text-dark ms-2">
                                    {q.difficulty}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary + Submit */}
            {selectedQuestions.length > 0 && (
                <div className="card p-4 mt-4 shadow-sm">
                    <h5 className="mb-3">✅ Selected Questions</h5>
                    <p>Total Questions: {selectedQuestions.length}</p>
                    <p>
                        Total Marks:{" "}
                        {questions
                            .filter((q) => selectedQuestions.includes(q._id))
                            .reduce((sum, q) => sum + q.marks, 0)}
                    </p>
                    <button className="btn btn-success w-100" onClick={handleExamSubmit}>
                        🚀 Create Exam
                    </button>
                </div>
            )}
        </div>
    );
};

export default CreateExam;
