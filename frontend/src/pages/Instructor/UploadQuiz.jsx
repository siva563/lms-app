// import React, { useState, useEffect } from "react";
// import { getUser } from "../../utils/tokenHelper";
// import { fetchSubjects } from "../../services/subjectService";
// import { fetchChapters } from "../../services/chapterService";
// import { uploadQuizBatch } from "../../services/quizService";


// const UploadQuiz = () => {
//     const user = getUser();
//     const institutionId = user?.institution?.id || user?.institutionId;

//     const [subjects, setSubjects] = useState([]);
//     const [chapters, setChapters] = useState([]);
//     const [questions, setQuestions] = useState([]);

//     const [form, setForm] = useState({
//         subjectId: "",
//         chapterId: "",
//         questionText: "",
//         questionType: "mcq",
//         options: { A: "", B: "", C: "", D: "" },
//         correctAnswer: "",
//         marks: 1,
//     });

//     useEffect(() => {
//         fetchSubjects(institutionId).then(setSubjects);
//     }, [institutionId]);

//     const loadChapters = async (subjectId) => {
//         const data = await fetchChapters(subjectId);
//         setChapters(data);
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setForm((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleOptionChange = (key, value) => {
//         setForm((prev) => ({
//             ...prev,
//             options: { ...prev.options, [key]: value },
//         }));
//     };

//     const handleAddQuestion = () => {
//         if (!form.questionText || !form.correctAnswer) return;

//         setQuestions((prev) => [...prev, form]);
//         setForm({
//             ...form,
//             questionText: "",
//             options: { A: "", B: "", C: "", D: "" },
//             correctAnswer: form.questionType === "multiselect" ? [] : "",
//             marks: 1,
//         });
//     };

//     // const handleFinalSubmit = () => {
//     //     console.log("Final Questions:", questions);
//     //     alert(`✅ Quiz submitted with ${questions.length} questions`);
//     // };

//     const handleFinalSubmit = async () => {
//         const instructorId = user?.id;

//         const enrichedQuestions = questions.map((q) => ({
//             ...q,
//             institutionId,
//             createdBy: instructorId,
//         }));

//         try {
//             const result = await uploadQuizBatch(enrichedQuestions);
//             alert("✅ Quiz submitted successfully!");
//             setQuestions([]); // clear after submit
//         } catch (err) {
//             console.error("Quiz Upload Error:", err);
//             alert("❌ Failed to submit quiz");
//         }
//     };

//     return (
//         <div className="container mt-4" style={{ maxWidth: "800px" }}>
//             <div className="card shadow-sm border-0 p-4">
//                 <h4 className="text-center mb-4">📝 Upload Quiz</h4>

//                 {/* Subject & Chapter */}
//                 <div className="row g-3 mb-3">
//                     <div className="col-md-6">
//                         <select
//                             className="form-select"
//                             name="subjectId"
//                             value={form.subjectId}
//                             onChange={(e) => {
//                                 handleInputChange(e);
//                                 loadChapters(e.target.value);
//                             }}
//                         >
//                             <option value="">-- Select Subject --</option>
//                             {subjects.map((s) => (
//                                 <option key={s._id} value={s._id}>
//                                     {s.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="col-md-6">
//                         <select
//                             className="form-select"
//                             name="chapterId"
//                             value={form.chapterId}
//                             onChange={handleInputChange}
//                         >
//                             <option value="">-- Select Chapter --</option>
//                             {chapters.map((ch) => (
//                                 <option key={ch._id} value={ch._id}>
//                                     {ch.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 {/* Question */}
//                 <textarea
//                     className="form-control mb-3"
//                     rows="2"
//                     name="questionText"
//                     value={form.questionText}
//                     onChange={handleInputChange}
//                     placeholder="Enter your question"
//                 />

//                 {/* Question Type & Marks */}
//                 <div className="row g-3 mb-3">
//                     <div className="col-md-6">
//                         <select
//                             className="form-select"
//                             name="questionType"
//                             value={form.questionType}
//                             onChange={handleInputChange}
//                         >
//                             <option value="mcq">MCQ</option>
//                             <option value="multiselect">Multi Select</option>
//                             <option value="short">Short Answer</option>
//                             <option value="dropdown">Dropdown</option>
//                         </select>
//                     </div>
//                     <div className="col-md-6">
//                         <input
//                             type="number"
//                             className="form-control"
//                             name="marks"
//                             value={form.marks}
//                             onChange={handleInputChange}
//                             placeholder="Marks"
//                         />
//                     </div>
//                 </div>

//                 {/* Options */}
//                 {["mcq", "multiselect", "dropdown"].includes(form.questionType) && (
//                     <div className="row g-2 mb-3">
//                         {["A", "B", "C", "D"].map((opt) => (
//                             <div className="col-6" key={opt}>
//                                 <input
//                                     className="form-control"
//                                     placeholder={`Option ${opt}`}
//                                     value={form.options[opt]}
//                                     onChange={(e) => handleOptionChange(opt, e.target.value)}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {/* Correct Answer */}
//                 <div className="mb-3">
//                     {form.questionType === "multiselect" ? (
//                         <div className="d-flex flex-wrap gap-3">
//                             {["A", "B", "C", "D"].map((opt) => (
//                                 <div className="form-check" key={opt}>
//                                     <input
//                                         type="checkbox"
//                                         className="form-check-input"
//                                         id={`opt-${opt}`}
//                                         checked={form.correctAnswer.includes(opt)}
//                                         onChange={(e) => {
//                                             let updated = Array.isArray(form.correctAnswer)
//                                                 ? [...form.correctAnswer]
//                                                 : [];
//                                             e.target.checked
//                                                 ? updated.push(opt)
//                                                 : (updated = updated.filter((o) => o !== opt));
//                                             setForm((prev) => ({ ...prev, correctAnswer: updated }));
//                                         }}
//                                     />
//                                     <label className="form-check-label" htmlFor={`opt-${opt}`}>
//                                         {opt}
//                                     </label>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : form.questionType === "short" ? (
//                         <input
//                             className="form-control"
//                             placeholder="Enter correct short answer"
//                             name="correctAnswer"
//                             value={form.correctAnswer}
//                             onChange={handleInputChange}
//                         />
//                     ) : (
//                         <select
//                             className="form-select"
//                             name="correctAnswer"
//                             value={form.correctAnswer}
//                             onChange={handleInputChange}
//                         >
//                             <option value="">-- Select Correct Option --</option>
//                             {["A", "B", "C", "D"].map((opt) => (
//                                 <option key={opt} value={opt}>
//                                     {opt}
//                                 </option>
//                             ))}
//                         </select>
//                     )}
//                 </div>

//                 {/* Buttons */}
//                 <div className="d-flex justify-content-between">
//                     <button
//                         type="button"
//                         className="btn btn-outline-primary"
//                         onClick={handleAddQuestion}
//                     >
//                         ➕ Add Question
//                     </button>
//                     <button
//                         type="button"
//                         className="btn btn-success"
//                         onClick={handleFinalSubmit}
//                         disabled={questions.length === 0}
//                     >
//                         ✅ Submit Quiz ({questions.length})
//                     </button>
//                 </div>
//             </div>

//             {/* Preview */}
//             {questions.length > 0 && (
//                 <div className="mt-4">
//                     <h5 className="text-center mb-3">📋 Questions Preview</h5>
//                     {questions.map((q, idx) => (
//                         <div key={idx} className="border rounded p-3 mb-3">
//                             <div className="d-flex justify-content-between align-items-center mb-2">
//                                 <strong>
//                                     Q{idx + 1}. {q.questionText}
//                                 </strong>
//                                 <button
//                                     className="btn btn-sm btn-outline-danger"
//                                     onClick={() => {
//                                         const updated = [...questions];
//                                         updated.splice(idx, 1);
//                                         setQuestions(updated);
//                                     }}
//                                 >
//                                     ❌
//                                 </button>
//                             </div>
//                             {["mcq", "multiselect", "dropdown"].includes(q.questionType) && (
//                                 <ul className="mb-2 ps-3">
//                                     {["A", "B", "C", "D"].map((opt) =>
//                                         q.options[opt] ? (
//                                             <li key={opt}>
//                                                 <strong>{opt}</strong>: {q.options[opt]}
//                                             </li>
//                                         ) : null
//                                     )}
//                                 </ul>
//                             )}
//                             <p className="mb-0 text-success">
//                                 ✅ Correct:{" "}
//                                 {Array.isArray(q.correctAnswer)
//                                     ? q.correctAnswer.join(", ")
//                                     : q.correctAnswer}{" "}
//                                 | 🧮 Marks: {q.marks}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UploadQuiz;

import React, { useState, useEffect } from "react";
import { getUser } from "../../utils/tokenHelper";
import { fetchSubjects } from "../../services/subjectService";
import { fetchChapters } from "../../services/chapterService";
import { uploadQuizBatch } from "../../services/quizService";

const UploadQuiz = () => {
    const user = getUser();
    const institutionId = user?.institution?.id || user?.institutionId;

    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [questions, setQuestions] = useState([]);

    const [form, setForm] = useState({
        subjectId: "",
        chapterId: "",
        questionText: "",
        questionType: "mcq",
        options: { A: "", B: "", C: "", D: "" },
        correctAnswer: "",
        marks: 1,
        difficulty: "easy",
        tags: ""
    });

    useEffect(() => {
        fetchSubjects(institutionId).then(setSubjects);
    }, [institutionId]);

    const loadChapters = async (subjectId) => {
        const data = await fetchChapters(subjectId);
        setChapters(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleOptionChange = (key, value) => {
        setForm((prev) => ({
            ...prev,
            options: { ...prev.options, [key]: value },
        }));
    };

    const handleAddQuestion = () => {
        if (!form.questionText || !form.correctAnswer) return;

        const tagArray = form.tags
            ? form.tags.split(",").map((tag) => tag.trim().toLowerCase())
            : [];

        setQuestions((prev) => [
            ...prev,
            { ...form, tags: tagArray }
        ]);

        setForm({
            ...form,
            questionText: "",
            options: { A: "", B: "", C: "", D: "" },
            correctAnswer: form.questionType === "multiselect" ? [] : "",
            tags: "",
            marks: 1,
            difficulty: "easy"
        });
    };

    const handleFinalSubmit = async () => {
        const instructorId = user?.id;

        const enrichedQuestions = questions.map((q) => ({
            ...q,
            institutionId,
            createdBy: instructorId,
        }));

        try {
            const result = await uploadQuizBatch(enrichedQuestions);
            alert("✅ Quiz submitted successfully!");
            setQuestions([]);
        } catch (err) {
            console.error("Quiz Upload Error:", err);
            alert("❌ Failed to submit quiz");
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: "800px" }}>
            <div className="card shadow-sm border-0 p-4">
                <h4 className="text-center mb-4">📝 Upload Quiz</h4>

                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <select
                            className="form-select"
                            name="subjectId"
                            value={form.subjectId}
                            onChange={(e) => {
                                handleInputChange(e);
                                loadChapters(e.target.value);
                            }}
                        >
                            <option value="">-- Select Subject --</option>
                            {subjects.map((s) => (
                                <option key={s._id} value={s._id}>{s.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <select
                            className="form-select"
                            name="chapterId"
                            value={form.chapterId}
                            onChange={handleInputChange}
                        >
                            <option value="">-- Select Chapter --</option>
                            {chapters.map((ch) => (
                                <option key={ch._id} value={ch._id}>{ch.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <textarea
                    className="form-control mb-3"
                    rows="2"
                    name="questionText"
                    value={form.questionText}
                    onChange={handleInputChange}
                    placeholder="Enter your question"
                />

                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <select
                            className="form-select"
                            name="questionType"
                            value={form.questionType}
                            onChange={handleInputChange}
                        >
                            <option value="mcq">MCQ</option>
                            <option value="multiselect">Multi Select</option>
                            <option value="short">Short Answer</option>
                            <option value="dropdown">Dropdown</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <input
                            type="number"
                            className="form-control"
                            name="marks"
                            value={form.marks}
                            onChange={handleInputChange}
                            placeholder="Marks"
                        />
                    </div>
                </div>

                {["mcq", "multiselect", "dropdown"].includes(form.questionType) && (
                    <div className="row g-2 mb-3">
                        {"ABCD".split("").map((opt) => (
                            <div className="col-6" key={opt}>
                                <input
                                    className="form-control"
                                    placeholder={`Option ${opt}`}
                                    value={form.options[opt]}
                                    onChange={(e) => handleOptionChange(opt, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="mb-3">
                    {form.questionType === "multiselect" ? (
                        <div className="d-flex flex-wrap gap-3">
                            {"ABCD".split("").map((opt) => (
                                <div className="form-check" key={opt}>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`opt-${opt}`}
                                        checked={form.correctAnswer.includes(opt)}
                                        onChange={(e) => {
                                            let updated = Array.isArray(form.correctAnswer)
                                                ? [...form.correctAnswer]
                                                : [];
                                            e.target.checked
                                                ? updated.push(opt)
                                                : (updated = updated.filter((o) => o !== opt));
                                            setForm((prev) => ({ ...prev, correctAnswer: updated }));
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor={`opt-${opt}`}>{opt}</label>
                                </div>
                            ))}
                        </div>
                    ) : form.questionType === "short" ? (
                        <input
                            className="form-control"
                            placeholder="Enter correct short answer"
                            name="correctAnswer"
                            value={form.correctAnswer}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <select
                            className="form-select"
                            name="correctAnswer"
                            value={form.correctAnswer}
                            onChange={handleInputChange}
                        >
                            <option value="">-- Select Correct Option --</option>
                            {"ABCD".split("").map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="mb-3">
                    <label>Difficulty</label>
                    <select
                        className="form-select"
                        name="difficulty"
                        value={form.difficulty}
                        onChange={handleInputChange}
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Tags (comma-separated)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="tags"
                        value={form.tags}
                        onChange={handleInputChange}
                        placeholder="e.g. loops, array, dom"
                    />
                </div>

                <div className="d-flex justify-content-between">
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleAddQuestion}
                    >
                        ➕ Add Question
                    </button>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleFinalSubmit}
                        disabled={questions.length === 0}
                    >
                        ✅ Submit Quiz ({questions.length})
                    </button>
                </div>
            </div>

            {questions.length > 0 && (
                <div className="mt-4">
                    <h5 className="text-center mb-3">📋 Questions Preview</h5>
                    {questions.map((q, idx) => (
                        <div key={idx} className="border rounded p-3 mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Q{idx + 1}. {q.questionText}</strong>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => {
                                        const updated = [...questions];
                                        updated.splice(idx, 1);
                                        setQuestions(updated);
                                    }}
                                >
                                    ❌
                                </button>
                            </div>
                            {["mcq", "multiselect", "dropdown"].includes(q.questionType) && (
                                <ul className="mb-2 ps-3">
                                    {"ABCD".split("").map((opt) =>
                                        q.options[opt] ? (
                                            <li key={opt}><strong>{opt}</strong>: {q.options[opt]}</li>
                                        ) : null
                                    )}
                                </ul>
                            )}
                            <p className="mb-0 text-success">
                                ✅ Correct: {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(", ") : q.correctAnswer} | 🧮 Marks: {q.marks}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UploadQuiz;

