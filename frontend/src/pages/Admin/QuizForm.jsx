// // // import React, { useState, useEffect } from "react";
// // // import {
// // //     DndContext,
// // //     closestCenter,
// // //     PointerSensor,
// // //     useSensor,
// // //     useSensors,
// // // } from "@dnd-kit/core";
// // // import {
// // //     arrayMove,
// // //     SortableContext,
// // //     useSortable,
// // //     verticalListSortingStrategy,
// // // } from "@dnd-kit/sortable";
// // // import { CSS } from "@dnd-kit/utilities";
// // // import { getAiQuizSuggestions } from "../../services/aiService";
// // // import { getQuestionBank, saveToQuestionBank, saveQuizWithQuestions } from "../../services/questionBankService";
// // // import { v4 as uuidv4 } from "uuid";

// // // const defaultQuestion = () => ({
// // //     id: uuidv4(),
// // //     type: "mcq",
// // //     question: "",
// // //     options: ["", "", "", ""],
// // //     answer: "",
// // //     marks: 1,
// // //     image: null,
// // //     codeSnippet: "",
// // // });

// // // const SortableTab = ({ id, index, activeIndex, onSelect, onDelete }) => {
// // //     const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
// // //     const style = { transform: CSS.Transform.toString(transform), transition, cursor: "grab" };

// // //     return (
// // //         <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={`btn btn-sm me-2 mb-2 ${index === activeIndex ? "btn-primary" : "btn-outline-secondary"} d-inline-flex align-items-center justify-between`}>
// // //             <span onClick={() => onSelect(index)}>Q{index + 1}</span>
// // //             <i className="ms-2 bi bi-x text-danger" onClick={(e) => { e.stopPropagation(); onDelete(index); }} style={{ cursor: "pointer" }} />
// // //         </div>
// // //     );
// // // };

// // // const QuizForm = ({ selectedSubject, selectedChapter }) => {
// // //     const [questions, setQuestions] = useState([defaultQuestion()]);
// // //     const [currentIndex, setCurrentIndex] = useState(0);
// // //     const [previewMode, setPreviewMode] = useState(false);
// // //     const [errors, setErrors] = useState({});
// // //     const [quizTitle, setQuizTitle] = useState("");
// // //     const [topic, setTopic] = useState("");
// // //     const [difficulty, setDifficulty] = useState("easy");
// // //     const [aiSuggestions, setAiSuggestions] = useState([]);
// // //     const [selectedSuggestions, setSelectedSuggestions] = useState([]);
// // //     const [loadingSuggest, setLoadingSuggest] = useState(false);
// // //     const [currentPage, setCurrentPage] = useState(1);
// // //     const suggestionsPerPage = 5;

// // //     const sensors = useSensors(useSensor(PointerSensor));
// // //     const currentQuestion = questions[currentIndex];

// // //     const validateQuestion = (q) => {
// // //         const err = {};
// // //         if (!q.question.trim()) err.question = "Question is required";
// // //         if (["mcq", "multi", "dropdown"].includes(q.type)) {
// // //             if (q.options.some((o) => !o.trim())) err.options = "All options required";
// // //         }
// // //         if (!q.answer.trim()) err.answer = "Answer is required";
// // //         return err;
// // //     };

// // //     const handleNext = () => {
// // //         const err = validateQuestion(currentQuestion);
// // //         if (Object.keys(err).length > 0) return setErrors(err);
// // //         setErrors({});

// // //         if (currentIndex === questions.length - 1) {
// // //             const newList = [...questions, defaultQuestion()];
// // //             setQuestions(newList);
// // //             setCurrentIndex(newList.length - 1);
// // //         } else {
// // //             setCurrentIndex((prev) => prev + 1);
// // //         }
// // //     };

// // //     const handlePrevious = () => {
// // //         setErrors({});
// // //         if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
// // //     };

// // //     const handleDelete = (index) => {
// // //         if (questions.length === 1 || !window.confirm("Delete this question?")) return;
// // //         const updated = [...questions];
// // //         updated.splice(index, 1);
// // //         setQuestions(updated);
// // //         if (currentIndex >= updated.length) setCurrentIndex(updated.length - 1);
// // //     };

// // //     const updateCurrentQuestion = (field, value) => {
// // //         const updated = [...questions];
// // //         if (field === "type") {
// // //             updated[currentIndex] = {
// // //                 ...updated[currentIndex],
// // //                 type: value,
// // //                 options: ["", "", "", ""] // reset options on type change
// // //             };
// // //         } else {
// // //             updated[currentIndex][field] = value;
// // //         }
// // //         setQuestions(updated);
// // //     };

// // //     const updateOption = (optIndex, value) => {
// // //         const updated = [...questions];
// // //         updated[currentIndex].options[optIndex] = value;
// // //         setQuestions(updated);
// // //     };

// // //     const generateQuestions = async () => {
// // //         if (!topic.trim()) return;
// // //         setLoadingSuggest(true);
// // //         try {
// // //             const suggestions = await getAiQuizSuggestions(topic, difficulty);
// // //             const unique = suggestions.filter((sug) => !questions.some((q) => q.question === sug.question));
// // //             setAiSuggestions(unique);
// // //             setCurrentPage(1);
// // //         } catch (e) {
// // //             console.error("❌ AI generation failed", e);
// // //         } finally {
// // //             setLoadingSuggest(false);
// // //         }
// // //     };

// // //     const toggleSuggestionSelect = (question) => {
// // //         setSelectedSuggestions((prev) => {
// // //             const exists = prev.find((q) => q.question === question.question);
// // //             return exists ? prev.filter((q) => q.question !== question.question) : [...prev, question];
// // //         });
// // //     };

// // //     const insertSelectedSuggestions = () => {
// // //         const newQuestions = selectedSuggestions.map((q) => ({
// // //             ...q,
// // //             id: uuidv4(),
// // //             image: null,
// // //             codeSnippet: "",
// // //             marks: 1,
// // //             type: "mcq"
// // //         }));
// // //         setQuestions((prev) => [...prev, ...newQuestions]);
// // //         setCurrentIndex(questions.length);
// // //         setSelectedSuggestions([]);
// // //     };

// // //     const saveToBank = async (question) => {
// // //         try {
// // //             await saveToQuestionBank(question);
// // //             alert("💾 Question saved to bank!");
// // //         } catch (err) {
// // //             console.error("Save to bank failed", err);
// // //         }
// // //     };

// // //     const paginatedSuggestions = aiSuggestions.slice((currentPage - 1) * suggestionsPerPage, currentPage * suggestionsPerPage);
// // //     const totalPages = Math.ceil(aiSuggestions.length / suggestionsPerPage);

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();

// // //         const err = validateQuestion(currentQuestion);
// // //         if (Object.keys(err).length > 0) return setErrors(err);

// // //         const user = JSON.parse(localStorage.getItem("user"));
// // //         if (!user?.institution?.id || !user?.email) {
// // //             return alert("❌ Please login to save quiz");
// // //         }

// // //         if (!quizTitle) return alert("⚠️ Please enter a quiz title");

// // //         const payload = {
// // //             title: quizTitle,
// // //             institutionId: user.institution.id,
// // //             subjectId: selectedSubject,
// // //             chapterId: selectedChapter,
// // //             createdBy: user.email,
// // //             questions
// // //         };

// // //         try {
// // //             await saveQuizWithQuestions(payload);
// // //             alert("✅ Quiz saved successfully!");
// // //             setQuestions([defaultQuestion()]);
// // //             setCurrentIndex(0);
// // //             setQuizTitle("");
// // //         } catch (err) {
// // //             console.error("❌ Quiz save failed", err);
// // //             alert(err.message || "Something went wrong.");
// // //         }
// // //     };

// // //     const handleDragEnd = (event) => {
// // //         const { active, over } = event;
// // //         if (active.id !== over.id) {
// // //             const oldIndex = questions.findIndex((q) => q.id === active.id);
// // //             const newIndex = questions.findIndex((q) => q.id === over.id);
// // //             const reordered = arrayMove(questions, oldIndex, newIndex);
// // //             setQuestions(reordered);
// // //             if (currentIndex === oldIndex) setCurrentIndex(newIndex);
// // //         }
// // //     };

// // //     return (
// // //         <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
// // //             <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
// // //                 <SortableContext items={questions.map((q) => q.id)} strategy={verticalListSortingStrategy}>
// // //                     {questions.map((q, i) => (
// // //                         <SortableTab key={q.id} id={q.id} index={i} activeIndex={currentIndex} onSelect={setCurrentIndex} onDelete={handleDelete} />
// // //                     ))}
// // //                 </SortableContext>
// // //             </DndContext>

// // //             <h5 className="my-3">📝 Question {currentIndex + 1}</h5>
// // //             <input type="text" className="form-control mb-3" placeholder="Enter Quiz Title" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} />

// // //             {/* AI Suggestion Section */}
// // //             <div className="border rounded p-3 my-3 bg-light">
// // //                 <label className="form-label fw-semibold">🤖 AI Question Suggestions</label>
// // //                 <div className="d-flex gap-2 mb-2">
// // //                     <input type="text" className="form-control" placeholder="Enter topic (e.g. JavaScript)" value={topic} onChange={(e) => setTopic(e.target.value)} />
// // //                     <select className="form-select w-auto" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
// // //                         <option value="easy">Easy</option>
// // //                         <option value="medium">Medium</option>
// // //                         <option value="hard">Hard</option>
// // //                     </select>
// // //                     <button type="button" className="btn btn-outline-info" onClick={generateQuestions} disabled={loadingSuggest}>
// // //                         {loadingSuggest ? "Generating..." : "🔮 Generate"}
// // //                     </button>
// // //                 </div>

// // //                 {paginatedSuggestions.map((q, i) => (
// // //                     <div key={i} className="border p-2 rounded bg-white mb-2">
// // //                         <div className="form-check">
// // //                             <input className="form-check-input" type="checkbox" checked={selectedSuggestions.some((s) => s.question === q.question)} onChange={() => toggleSuggestionSelect(q)} id={`suggestion-${i}`} />
// // //                             <label className="form-check-label" htmlFor={`suggestion-${i}`}>
// // //                                 <strong>Q:</strong> {q.question} <span className="badge bg-secondary ms-2">#{difficulty}</span>
// // //                             </label>
// // //                         </div>
// // //                         <ul className="mb-1">
// // //                             {q.options.map((opt, j) => <li key={j}>{opt}</li>)}
// // //                         </ul>
// // //                         <strong>Ans:</strong> {q.answer}
// // //                         <div className="d-flex gap-2 mt-2">
// // //                             <button className="btn btn-sm btn-outline-secondary" onClick={() => saveToBank(q)}>💾 Save to Bank</button>
// // //                         </div>
// // //                     </div>
// // //                 ))}

// // //                 {totalPages > 1 && (
// // //                     <div className="d-flex gap-2 mt-2">
// // //                         <button className="btn btn-sm btn-outline-dark" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>« Prev</button>
// // //                         {[...Array(totalPages)].map((_, idx) => (
// // //                             <button key={idx} className={`btn btn-sm ${currentPage === idx + 1 ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setCurrentPage(idx + 1)}>{idx + 1}</button>
// // //                         ))}
// // //                         <button className="btn btn-sm btn-outline-dark" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Next »</button>
// // //                     </div>
// // //                 )}

// // //                 {aiSuggestions.length > 0 && (
// // //                     <div className="d-flex gap-3 mt-3">
// // //                         <button className="btn btn-sm btn-success" onClick={insertSelectedSuggestions} disabled={selectedSuggestions.length === 0}>
// // //                             ➕ Add Selected ({selectedSuggestions.length})
// // //                         </button>
// // //                         <button className="btn btn-sm btn-outline-danger" onClick={() => { setSelectedSuggestions([]); setAiSuggestions([]); }}>
// // //                             ❌ Clear Suggestions
// // //                         </button>
// // //                     </div>
// // //                 )}
// // //             </div>

// // //             <select className="form-select mb-2" value={currentQuestion.type} onChange={(e) => updateCurrentQuestion("type", e.target.value)}>
// // //                 <option value="mcq">Multiple Choice (MCQ)</option>
// // //                 <option value="multi">Multi-Select</option>
// // //                 <option value="short">Short Answer</option>
// // //                 <option value="dropdown">Dropdown</option>
// // //                 <option value="code">Write a Code</option>
// // //             </select>

// // //             <input type="text" className={`form-control mb-2 ${errors.question ? "is-invalid" : ""}`} placeholder="Enter Question" value={currentQuestion.question} onChange={(e) => updateCurrentQuestion("question", e.target.value)} />

// // //             {["mcq", "multi", "dropdown"].includes(currentQuestion.type) && (
// // //                 currentQuestion.options.map((opt, i) => (
// // //                     <input key={i} type="text" className="form-control mb-2" placeholder={`Option ${i + 1}`} value={opt} onChange={(e) => updateOption(i, e.target.value)} />
// // //                 ))
// // //             )}

// // //             {currentQuestion.type === "code" && (
// // //                 <textarea className="form-control mb-2" placeholder="Code snippet area (student view)" disabled rows={4}></textarea>
// // //             )}

// // //             <input type="text" className={`form-control mb-2 ${errors.answer ? "is-invalid" : ""}`} placeholder="Correct Answer" value={currentQuestion.answer} onChange={(e) => updateCurrentQuestion("answer", e.target.value)} />
// // //             <input type="number" className="form-control mb-3" placeholder="Marks" value={currentQuestion.marks} onChange={(e) => updateCurrentQuestion("marks", parseInt(e.target.value))} />

// // //             <div className="d-flex justify-content-between">
// // //                 <button type="button" className="btn btn-outline-secondary" onClick={handlePrevious} disabled={currentIndex === 0}>⬅️ Previous</button>
// // //                 <div>
// // //                     <button type="button" className="btn btn-success me-2" onClick={handleNext}>➕ Next Question</button>
// // //                     <button type="submit" className="btn btn-primary">✅ Save Quiz Template</button>
// // //                 </div>
// // //             </div>
// // //         </form>
// // //     );
// // // };

// // // export default QuizForm;

// // import React, { useState, useEffect } from "react";
// // import {
// //     DndContext,
// //     closestCenter,
// //     PointerSensor,
// //     useSensor,
// //     useSensors,
// // } from "@dnd-kit/core";
// // import {
// //     arrayMove,
// //     SortableContext,
// //     useSortable,
// //     verticalListSortingStrategy,
// // } from "@dnd-kit/sortable";
// // import { CSS } from "@dnd-kit/utilities";
// // import { getAiQuizSuggestions } from "../../services/aiService";
// // import {
// //     getQuestionBank,
// //     saveToQuestionBank,
// //     saveQuizWithQuestions,
// // } from "../../services/questionBankService";
// // import { v4 as uuidv4 } from "uuid";

// // const defaultQuestion = () => ({
// //     id: uuidv4(),
// //     type: "mcq",
// //     question: "",
// //     options: ["", "", "", ""],
// //     answer: "",
// //     marks: 1,
// //     image: null,
// //     codeSnippet: "",
// // });

// // const SortableTab = ({ id, index, activeIndex, onSelect, onDelete }) => {
// //     const { attributes, listeners, setNodeRef, transform, transition } =
// //         useSortable({ id });
// //     const style = {
// //         transform: CSS.Transform.toString(transform),
// //         transition,
// //         cursor: "grab",
// //     };

// //     return (
// //         <div
// //             ref={setNodeRef}
// //             style={style}
// //             {...attributes}
// //             {...listeners}
// //             className={`btn btn-sm me-2 mb-2 ${index === activeIndex ? "btn-primary" : "btn-outline-secondary"
// //                 } d-inline-flex align-items-center justify-between`}
// //         >
// //             <span onClick={() => onSelect(index)}>Q{index + 1}</span>
// //             <i
// //                 className="ms-2 bi bi-x text-danger"
// //                 onClick={(e) => {
// //                     e.stopPropagation();
// //                     onDelete(index);
// //                 }}
// //                 style={{ cursor: "pointer" }}
// //             />
// //         </div>
// //     );
// // };

// // const QuizForm = ({ selectedSubject, selectedChapter }) => {
// //     const [questions, setQuestions] = useState([defaultQuestion()]);
// //     const [currentIndex, setCurrentIndex] = useState(0);
// //     const [errors, setErrors] = useState({});
// //     const [quizTitle, setQuizTitle] = useState("");
// //     const [topic, setTopic] = useState("");
// //     const [difficulty, setDifficulty] = useState("easy");
// //     const [aiSuggestions, setAiSuggestions] = useState([]);
// //     const [selectedSuggestions, setSelectedSuggestions] = useState([]);
// //     const [loadingSuggest, setLoadingSuggest] = useState(false);
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const suggestionsPerPage = 5;

// //     const sensors = useSensors(useSensor(PointerSensor));
// //     const currentQuestion = questions[currentIndex];

// //     const validateQuestion = (q) => {
// //         const err = {};
// //         if (!q.question.trim()) err.question = "Question is required";
// //         if (["mcq", "multi", "dropdown"].includes(q.type)) {
// //             if (q.options.some((o) => !o.trim())) err.options = "All options required";
// //         }
// //         if (!q.answer.trim()) err.answer = "Answer is required";
// //         return err;
// //     };

// //     const handleNext = () => {
// //         const err = validateQuestion(currentQuestion);
// //         if (Object.keys(err).length > 0) return setErrors(err);
// //         setErrors({});

// //         if (currentIndex === questions.length - 1) {
// //             const newList = [...questions, defaultQuestion()];
// //             setQuestions(newList);
// //             setCurrentIndex(newList.length - 1);
// //         } else {
// //             setCurrentIndex((prev) => prev + 1);
// //         }
// //     };

// //     const handlePrevious = () => {
// //         setErrors({});
// //         if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
// //     };

// //     const handleDelete = (index) => {
// //         if (questions.length === 1 || !window.confirm("Delete this question?"))
// //             return;
// //         const updated = [...questions];
// //         updated.splice(index, 1);
// //         setQuestions(updated);
// //         if (currentIndex >= updated.length) setCurrentIndex(updated.length - 1);
// //     };

// //     const updateCurrentQuestion = (field, value) => {
// //         const updated = [...questions];
// //         if (field === "type") {
// //             updated[currentIndex] = {
// //                 ...updated[currentIndex],
// //                 type: value,
// //                 options: ["", "", "", ""],
// //             };
// //         } else {
// //             updated[currentIndex][field] = value;
// //         }
// //         setQuestions(updated);
// //     };

// //     const updateOption = (optIndex, value) => {
// //         const updated = [...questions];
// //         updated[currentIndex].options[optIndex] = value;
// //         setQuestions(updated);
// //     };

// //     const generateQuestions = async () => {
// //         if (!topic.trim()) return;
// //         setLoadingSuggest(true);
// //         try {
// //             const suggestions = await getAiQuizSuggestions(topic, difficulty);
// //             const unique = suggestions.filter(
// //                 (sug) => !questions.some((q) => q.question === sug.question)
// //             );
// //             // Replace answer index like "A" with actual value
// //             const converted = unique.map((q) => {
// //                 const answerIndex = ["A", "B", "C", "D"].indexOf(q.answer);
// //                 return {
// //                     ...q,
// //                     answer: q.options[answerIndex] || q.answer,
// //                 };
// //             });
// //             setAiSuggestions(converted);
// //             setCurrentPage(1);
// //         } catch (e) {
// //             console.error("❌ AI generation failed", e);
// //         } finally {
// //             setLoadingSuggest(false);
// //         }
// //     };

// //     const toggleSuggestionSelect = (question) => {
// //         setSelectedSuggestions((prev) => {
// //             const exists = prev.find((q) => q.question === question.question);
// //             return exists
// //                 ? prev.filter((q) => q.question !== question.question)
// //                 : [...prev, question];
// //         });
// //     };

// //     const insertSelectedSuggestions = () => {
// //         const newQuestions = selectedSuggestions.map((q) => ({
// //             ...q,
// //             id: uuidv4(),
// //             image: null,
// //             codeSnippet: "",
// //             marks: 1,
// //             type: "mcq",
// //         }));
// //         setQuestions((prev) => [...prev, ...newQuestions]);
// //         setCurrentIndex(questions.length);
// //         setSelectedSuggestions([]);
// //     };

// //     const saveToBank = async (question) => {
// //         try {
// //             await saveToQuestionBank(question);
// //             alert("💾 Saved to bank!");
// //         } catch (err) {
// //             console.error("Bank save failed", err);
// //         }
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         const err = validateQuestion(currentQuestion);
// //         if (Object.keys(err).length > 0) return setErrors(err);

// //         const user = JSON.parse(localStorage.getItem("user"));
// //         if (!user?.institution?.id || !user?.email) return alert("Please login");
// //         if (!quizTitle) return alert("Enter a quiz title");

// //         const payload = {
// //             title: quizTitle,
// //             institutionId: user.institution.id,
// //             subjectId: selectedSubject,
// //             chapterId: selectedChapter,
// //             createdBy: user.email,
// //             questions,
// //         };

// //         try {
// //             await saveQuizWithQuestions(payload);
// //             alert("✅ Quiz saved!");
// //             setQuestions([defaultQuestion()]);
// //             setCurrentIndex(0);
// //             setQuizTitle("");
// //         } catch (err) {
// //             console.error("Save failed", err);
// //         }
// //     };

// //     const handleDragEnd = (event) => {
// //         const { active, over } = event;
// //         if (active.id !== over.id) {
// //             const oldIndex = questions.findIndex((q) => q.id === active.id);
// //             const newIndex = questions.findIndex((q) => q.id === over.id);
// //             const reordered = arrayMove(questions, oldIndex, newIndex);
// //             setQuestions(reordered);
// //             if (currentIndex === oldIndex) setCurrentIndex(newIndex);
// //         }
// //     };

// //     const paginatedSuggestions = aiSuggestions.slice(
// //         (currentPage - 1) * suggestionsPerPage,
// //         currentPage * suggestionsPerPage
// //     );
// //     const totalPages = Math.ceil(aiSuggestions.length / suggestionsPerPage);

// //     return (
// //         <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
// //             <input
// //                 className="form-control mb-3"
// //                 value={quizTitle}
// //                 onChange={(e) => setQuizTitle(e.target.value)}
// //                 placeholder="Enter Quiz Title"
// //             />

// //             <div className="mb-3">
// //                 <label>🤖 AI Suggestions</label>
// //                 <div className="d-flex gap-2">
// //                     <input
// //                         className="form-control"
// //                         value={topic}
// //                         onChange={(e) => setTopic(e.target.value)}
// //                         placeholder="Enter Topic"
// //                     />
// //                     <select
// //                         className="form-select"
// //                         value={difficulty}
// //                         onChange={(e) => setDifficulty(e.target.value)}
// //                     >
// //                         <option value="easy">Easy</option>
// //                         <option value="medium">Medium</option>
// //                         <option value="hard">Hard</option>
// //                     </select>
// //                     <button
// //                         type="button"
// //                         className="btn btn-info"
// //                         onClick={generateQuestions}
// //                     >
// //                         Generate
// //                     </button>
// //                 </div>
// //             </div>

// //             {paginatedSuggestions.map((q, i) => (
// //                 <div key={i} className="border p-2 mb-2">
// //                     <div className="form-check">
// //                         <input
// //                             className="form-check-input"
// //                             type="checkbox"
// //                             checked={selectedSuggestions.some((s) => s.question === q.question)}
// //                             onChange={() => toggleSuggestionSelect(q)}
// //                         />
// //                         <label className="form-check-label">
// //                             <strong>{q.question}</strong>
// //                         </label>
// //                     </div>
// //                     <ul>
// //                         {q.options.map((opt, j) => (
// //                             <li key={j}>{opt}</li>
// //                         ))}
// //                     </ul>
// //                     <small>Ans: {q.answer}</small>
// //                 </div>
// //             ))}

// //             <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
// //                 <SortableContext
// //                     items={questions.map((q) => q.id)}
// //                     strategy={verticalListSortingStrategy}
// //                 >
// //                     {questions.map((q, i) => (
// //                         <SortableTab
// //                             key={q.id}
// //                             id={q.id}
// //                             index={i}
// //                             activeIndex={currentIndex}
// //                             onSelect={setCurrentIndex}
// //                             onDelete={handleDelete}
// //                         />
// //                     ))}
// //                 </SortableContext>
// //             </DndContext>

// //             <input
// //                 type="text"
// //                 className="form-control mb-2"
// //                 placeholder="Enter Question"
// //                 value={currentQuestion.question}
// //                 onChange={(e) => updateCurrentQuestion("question", e.target.value)}
// //             />

// //             {currentQuestion.options.map((opt, i) => (
// //                 <input
// //                     key={i}
// //                     type="text"
// //                     className="form-control mb-2"
// //                     placeholder={`Option ${i + 1}`}
// //                     value={opt}
// //                     onChange={(e) => updateOption(i, e.target.value)}
// //                 />
// //             ))}

// //             <input
// //                 type="text"
// //                 className="form-control mb-2"
// //                 placeholder="Correct Answer"
// //                 value={currentQuestion.answer}
// //                 onChange={(e) => updateCurrentQuestion("answer", e.target.value)}
// //             />

// //             <div className="d-flex justify-content-between">
// //                 <button
// //                     type="button"
// //                     className="btn btn-secondary"
// //                     onClick={handlePrevious}
// //                     disabled={currentIndex === 0}
// //                 >
// //                     Previous
// //                 </button>
// //                 <div>
// //                     <button type="button" className="btn btn-success me-2" onClick={handleNext}>
// //                         Next
// //                     </button>
// //                     <button type="submit" className="btn btn-primary">
// //                         Save Quiz
// //                     </button>
// //                 </div>
// //             </div>
// //         </form>
// //     );
// // };

// // export default QuizForm;

// import React, { useState, useEffect } from "react";
// import {
//     DndContext,
//     closestCenter,
//     PointerSensor,
//     useSensor,
//     useSensors,
// } from "@dnd-kit/core";
// import {
//     arrayMove,
//     SortableContext,
//     useSortable,
//     verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { getAiQuizSuggestions } from "../../services/aiService";
// import {
//     getQuestionBank,
//     saveToQuestionBank,
//     saveQuizWithQuestions,
// } from "../../services/questionBankService";
// import { v4 as uuidv4 } from "uuid";

// const defaultQuestion = () => ({
//     id: uuidv4(),
//     type: "mcq",
//     question: "",
//     options: ["", "", "", ""],
//     answer: "",
//     marks: 1,
//     image: null,
//     codeSnippet: "",
// });

// const SortableTab = ({ id, index, activeIndex, onSelect, onDelete }) => {
//     const { attributes, listeners, setNodeRef, transform, transition } =
//         useSortable({ id });
//     const style = {
//         transform: CSS.Transform.toString(transform),
//         transition,
//         cursor: "grab",
//     };

//     return (
//         <div
//             ref={setNodeRef}
//             style={style}
//             {...attributes}
//             {...listeners}
//             className={`btn btn-sm me-2 mb-2 ${index === activeIndex ? "btn-primary" : "btn-outline-secondary"
//                 } d-inline-flex align-items-center justify-between`}
//         >
//             <span onClick={() => onSelect(index)}>Q{index + 1}</span>
//             <i
//                 className="ms-2 bi bi-x text-danger"
//                 onClick={(e) => {
//                     e.stopPropagation();
//                     onDelete(index);
//                 }}
//                 style={{ cursor: "pointer" }}
//             />
//         </div>
//     );
// };

// const QuizForm = ({ selectedSubject, selectedChapter }) => {
//     const [questions, setQuestions] = useState([defaultQuestion()]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [previewMode, setPreviewMode] = useState(false);
//     const [errors, setErrors] = useState({});
//     const [quizTitle, setQuizTitle] = useState("");
//     const [topic, setTopic] = useState("");
//     const [difficulty, setDifficulty] = useState("easy");
//     const [aiSuggestions, setAiSuggestions] = useState([]);
//     const [selectedSuggestions, setSelectedSuggestions] = useState([]);
//     const [loadingSuggest, setLoadingSuggest] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const suggestionsPerPage = 5;

//     const sensors = useSensors(useSensor(PointerSensor));
//     const currentQuestion = questions[currentIndex];

//     const validateQuestion = (q) => {
//         const err = {};
//         if (!q.question.trim()) err.question = "Question is required";
//         if (["mcq", "multi", "dropdown"].includes(q.type)) {
//             if (q.options.some((o) => !o.trim())) err.options = "All options required";
//         }
//         if (!q.answer.trim()) err.answer = "Answer is required";
//         return err;
//     };

//     const handleNext = () => {
//         const err = validateQuestion(currentQuestion);
//         if (Object.keys(err).length > 0) return setErrors(err);
//         setErrors({});
//         if (currentIndex === questions.length - 1) {
//             const newList = [...questions, defaultQuestion()];
//             setQuestions(newList);
//             setCurrentIndex(newList.length - 1);
//         } else {
//             setCurrentIndex((prev) => prev + 1);
//         }
//     };

//     const handlePrevious = () => {
//         setErrors({});
//         if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
//     };

//     const handleDelete = (index) => {
//         if (questions.length === 1 || !window.confirm("Delete this question?")) return;
//         const updated = [...questions];
//         updated.splice(index, 1);
//         setQuestions(updated);
//         if (currentIndex >= updated.length) setCurrentIndex(updated.length - 1);
//     };

//     const updateCurrentQuestion = (field, value) => {
//         const updated = [...questions];
//         if (field === "type") {
//             updated[currentIndex] = {
//                 ...updated[currentIndex],
//                 type: value,
//                 options: ["", "", "", ""],
//             };
//         } else {
//             updated[currentIndex][field] = value;
//         }
//         setQuestions(updated);
//     };

//     const updateOption = (optIndex, value) => {
//         const updated = [...questions];
//         updated[currentIndex].options[optIndex] = value;
//         setQuestions(updated);
//     };

//     const generateQuestions = async () => {
//         if (!topic.trim()) return;
//         setLoadingSuggest(true);
//         try {
//             const suggestions = await getAiQuizSuggestions(topic, difficulty);
//             const converted = suggestions.map((q) => {
//                 const letters = ["A", "B", "C", "D"];
//                 if (letters.includes(q.answer)) {
//                     const index = letters.indexOf(q.answer);
//                     q.answer = q.options[index];
//                 }
//                 return q;
//             });
//             const unique = converted.filter(
//                 (sug) => !questions.some((q) => q.question === sug.question)
//             );
//             setAiSuggestions(unique);
//             setCurrentPage(1);
//         } catch (e) {
//             console.error("❌ AI generation failed", e);
//         } finally {
//             setLoadingSuggest(false);
//         }
//     };

//     const toggleSuggestionSelect = (question) => {
//         setSelectedSuggestions((prev) => {
//             const exists = prev.find((q) => q.question === question.question);
//             return exists ? prev.filter((q) => q.question !== question.question) : [...prev, question];
//         });
//     };

//     const insertSelectedSuggestions = () => {
//         const newQuestions = selectedSuggestions.map((q) => ({
//             ...q,
//             id: uuidv4(),
//             image: null,
//             codeSnippet: "",
//             marks: 1,
//             type: "mcq",
//         }));
//         setQuestions((prev) => [...prev, ...newQuestions]);
//         setCurrentIndex(questions.length);
//         setSelectedSuggestions([]);
//     };

//     const saveToBank = async (question) => {
//         try {
//             await saveToQuestionBank(question);
//             alert("💾 Question saved to bank!");
//         } catch (err) {
//             console.error("Save to bank failed", err);
//         }
//     };

//     const paginatedSuggestions = aiSuggestions.slice(
//         (currentPage - 1) * suggestionsPerPage,
//         currentPage * suggestionsPerPage
//     );
//     const totalPages = Math.ceil(aiSuggestions.length / suggestionsPerPage);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const err = validateQuestion(currentQuestion);
//         if (Object.keys(err).length > 0) return setErrors(err);
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user?.institution?.id || !user?.email) {
//             return alert("❌ Please login to save quiz");
//         }
//         if (!quizTitle) return alert("⚠️ Please enter a quiz title");
//         const payload = {
//             title: quizTitle,
//             institutionId: user.institution.id,
//             subjectId: selectedSubject,
//             chapterId: selectedChapter,
//             createdBy: user.email,
//             questions,
//         };
//         try {
//             await saveQuizWithQuestions(payload);
//             alert("✅ Quiz saved successfully!");
//             setQuestions([defaultQuestion()]);
//             setCurrentIndex(0);
//             setQuizTitle("");
//         } catch (err) {
//             console.error("❌ Quiz save failed", err);
//             alert(err.message || "Something went wrong.");
//         }
//     };

//     const handleDragEnd = (event) => {
//         const { active, over } = event;
//         if (active.id !== over.id) {
//             const oldIndex = questions.findIndex((q) => q.id === active.id);
//             const newIndex = questions.findIndex((q) => q.id === over.id);
//             const reordered = arrayMove(questions, oldIndex, newIndex);
//             setQuestions(reordered);
//             if (currentIndex === oldIndex) setCurrentIndex(newIndex);
//         }
//     };

//     return <>{}</>;
// };

// export default QuizForm;

import React, { useState, useEffect } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getAiQuizSuggestions } from "../../services/aiService";
import { getQuestionBank, saveToQuestionBank, saveQuizWithQuestions } from "../../services/questionBankService";
import { v4 as uuidv4 } from "uuid";

const defaultQuestion = () => ({
    id: uuidv4(),
    type: "mcq",
    question: "",
    options: ["", "", "", ""],
    answer: "",
    marks: 1,
    image: null,
    codeSnippet: "",
});

const SortableTab = ({ id, index, activeIndex, onSelect, onDelete }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition, cursor: "grab" };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`btn btn-sm me-2 mb-2 ${index === activeIndex ? "btn-primary" : "btn-outline-secondary"} d-inline-flex align-items-center justify-between`}
        >
            <span onClick={() => onSelect(index)}>Q{index + 1}</span>
            <i
                className="ms-2 bi bi-x text-danger"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(index);
                }}
                style={{ cursor: "pointer" }}
            />
        </div>
    );
};

const QuizForm = ({ selectedSubject, selectedChapter }) => {
    const [questions, setQuestions] = useState([defaultQuestion()]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previewMode, setPreviewMode] = useState(false);
    const [errors, setErrors] = useState({});
    const [quizTitle, setQuizTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [aiSuggestions, setAiSuggestions] = useState([]);
    const [selectedSuggestions, setSelectedSuggestions] = useState([]);
    const [loadingSuggest, setLoadingSuggest] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const suggestionsPerPage = 5;

    const sensors = useSensors(useSensor(PointerSensor));
    const currentQuestion = questions[currentIndex];

    const validateQuestion = (q) => {
        const err = {};
        if (!q.question.trim()) err.question = "Question is required";
        if (["mcq", "multi", "dropdown"].includes(q.type)) {
            if (q.options.some((o) => !o.trim())) err.options = "All options required";
        }
        if (!q.answer.trim()) err.answer = "Answer is required";
        return err;
    };

    const handleNext = () => {
        const err = validateQuestion(currentQuestion);
        if (Object.keys(err).length > 0) return setErrors(err);
        setErrors({});

        if (currentIndex === questions.length - 1) {
            const newList = [...questions, defaultQuestion()];
            setQuestions(newList);
            setCurrentIndex(newList.length - 1);
        } else {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        setErrors({});
        if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    };

    const handleDelete = (index) => {
        if (questions.length === 1 || !window.confirm("Delete this question?")) return;
        const updated = [...questions];
        updated.splice(index, 1);
        setQuestions(updated);
        if (currentIndex >= updated.length) setCurrentIndex(updated.length - 1);
    };

    const updateCurrentQuestion = (field, value) => {
        const updated = [...questions];
        if (field === "type") {
            updated[currentIndex] = {
                ...updated[currentIndex],
                type: value,
                options: ["", "", "", ""]
            };
        } else {
            updated[currentIndex][field] = value;
        }
        setQuestions(updated);
    };

    const updateOption = (optIndex, value) => {
        const updated = [...questions];
        updated[currentIndex].options[optIndex] = value;
        setQuestions(updated);
    };

    const generateQuestions = async () => {
        if (!topic.trim()) return;
        setLoadingSuggest(true);
        try {
            const suggestions = await getAiQuizSuggestions(topic, difficulty);
            const unique = suggestions.filter((sug) => !questions.some((q) => q.question === sug.question));
            setAiSuggestions(unique);
            setCurrentPage(1);
        } catch (e) {
            console.error("❌ AI generation failed", e);
        } finally {
            setLoadingSuggest(false);
        }
    };

    const toggleSuggestionSelect = (question) => {
        setSelectedSuggestions((prev) => {
            const exists = prev.find((q) => q.question === question.question);
            return exists ? prev.filter((q) => q.question !== question.question) : [...prev, question];
        });
    };

    const insertSelectedSuggestions = () => {
        const newQuestions = selectedSuggestions.map((q) => ({
            ...q,
            id: uuidv4(),
            image: null,
            codeSnippet: "",
            marks: 1,
            type: "mcq",
        }));
        setQuestions((prev) => [...prev, ...newQuestions]);
        setCurrentIndex(questions.length);
        setSelectedSuggestions([]);
    };

    const saveToBank = async (question) => {
        try {
            await saveToQuestionBank(question);
            alert("💾 Saved to bank!");
        } catch (err) {
            console.error("Save to bank failed", err);
        }
    };

    const paginatedSuggestions = aiSuggestions.slice((currentPage - 1) * suggestionsPerPage, currentPage * suggestionsPerPage);
    const totalPages = Math.ceil(aiSuggestions.length / suggestionsPerPage);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validateQuestion(currentQuestion);
        if (Object.keys(err).length > 0) return setErrors(err);

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.institution?.id || !user?.email) {
            return alert("❌ Please login to save quiz");
        }

        if (!quizTitle) return alert("⚠️ Please enter a quiz title");

        const payload = {
            title: quizTitle,
            institutionId: user.institution.id,
            subjectId: selectedSubject,
            chapterId: selectedChapter,
            createdBy: user.email,
            questions,
        };

        try {
            await saveQuizWithQuestions(payload);
            alert("✅ Quiz saved successfully!");
            setQuestions([defaultQuestion()]);
            setCurrentIndex(0);
            setQuizTitle("");
        } catch (err) {
            console.error("❌ Quiz save failed", err);
            alert(err.message || "Something went wrong.");
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = questions.findIndex((q) => q.id === active.id);
            const newIndex = questions.findIndex((q) => q.id === over.id);
            const reordered = arrayMove(questions, oldIndex, newIndex);
            setQuestions(reordered);
            if (currentIndex === oldIndex) setCurrentIndex(newIndex);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={questions.map((q) => q.id)} strategy={verticalListSortingStrategy}>
                    {questions.map((q, i) => (
                        <SortableTab key={q.id} id={q.id} index={i} activeIndex={currentIndex} onSelect={setCurrentIndex} onDelete={handleDelete} />
                    ))}
                </SortableContext>
            </DndContext>

            <h5 className="my-3">📝 Question {currentIndex + 1}</h5>
            <input type="text" className="form-control mb-3" placeholder="Enter Quiz Title" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} />

            <div className="border rounded p-3 my-3 bg-light">
                <label className="form-label fw-semibold">🤖 AI Question Suggestions</label>
                <div className="d-flex gap-2 mb-2">
                    <input type="text" className="form-control" placeholder="Enter topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
                    <select className="form-select w-auto" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <button type="button" className="btn btn-outline-info" onClick={generateQuestions} disabled={loadingSuggest}>
                        {loadingSuggest ? "Generating..." : "🔮 Generate"}
                    </button>
                </div>

                {paginatedSuggestions.map((q, i) => (
                    <div key={i} className="border p-2 rounded bg-white mb-2">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedSuggestions.some((s) => s.question === q.question)}
                                onChange={() => toggleSuggestionSelect(q)}
                                id={`suggestion-${i}`}
                            />
                            <label className="form-check-label" htmlFor={`suggestion-${i}`}>
                                <strong>Q:</strong> {q.question}
                            </label>
                        </div>
                        <ul className="mb-1">
                            {q.options.map((opt, j) => <li key={j}>{opt}</li>)}
                        </ul>
                        <strong>Ans:</strong> {q.answer}
                        <div className="d-flex gap-2 mt-2">
                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => saveToBank(q)}>
                                💾 Save to Bank
                            </button>
                        </div>
                    </div>
                ))}

                {totalPages > 1 && (
                    <div className="d-flex gap-2 mt-2">
                        <button className="btn btn-sm btn-outline-dark" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>« Prev</button>
                        {[...Array(totalPages)].map((_, idx) => (
                            <button key={idx} className={`btn btn-sm ${currentPage === idx + 1 ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setCurrentPage(idx + 1)}>{idx + 1}</button>
                        ))}
                        <button className="btn btn-sm btn-outline-dark" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Next »</button>
                    </div>
                )}

                {aiSuggestions.length > 0 && (
                    <div className="d-flex gap-3 mt-3">
                        <button className="btn btn-sm btn-success" onClick={insertSelectedSuggestions} disabled={selectedSuggestions.length === 0}>
                            ➕ Add Selected ({selectedSuggestions.length})
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => { setSelectedSuggestions([]); setAiSuggestions([]); }}>
                            ❌ Clear Suggestions
                        </button>
                    </div>
                )}
            </div>

            <select className="form-select mb-2" value={currentQuestion.type} onChange={(e) => updateCurrentQuestion("type", e.target.value)}>
                <option value="mcq">Multiple Choice (MCQ)</option>
                <option value="multi">Multi-Select</option>
                <option value="short">Short Answer</option>
                <option value="dropdown">Dropdown</option>
                <option value="code">Write a Code</option>
            </select>

            <input type="text" className={`form-control mb-2 ${errors.question ? "is-invalid" : ""}`} placeholder="Enter Question" value={currentQuestion.question} onChange={(e) => updateCurrentQuestion("question", e.target.value)} />

            {["mcq", "multi", "dropdown"].includes(currentQuestion.type) && (
                currentQuestion.options.map((opt, i) => (
                    <input key={i} type="text" className="form-control mb-2" placeholder={`Option ${i + 1}`} value={opt} onChange={(e) => updateOption(i, e.target.value)} />
                ))
            )}

            {currentQuestion.type === "code" && (
                <textarea className="form-control mb-2" placeholder="Code snippet area (student view)" disabled rows={4}></textarea>
            )}

            <input type="text" className={`form-control mb-2 ${errors.answer ? "is-invalid" : ""}`} placeholder="Correct Answer" value={currentQuestion.answer} onChange={(e) => updateCurrentQuestion("answer", e.target.value)} />
            <input type="number" className="form-control mb-3" placeholder="Marks" value={currentQuestion.marks} onChange={(e) => updateCurrentQuestion("marks", parseInt(e.target.value))} />

            <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-outline-secondary" onClick={handlePrevious} disabled={currentIndex === 0}>⬅️ Previous</button>
                <div>
                    <button type="button" className="btn btn-success me-2" onClick={handleNext}>➕ Next Question</button>
                    <button type="submit" className="btn btn-primary">✅ Save Quiz Template</button>
                </div>
            </div>
        </form>
    );
};

export default QuizForm;
