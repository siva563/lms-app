// import React, { useEffect, useState } from "react";
// import { fetchSubjects } from "../../services/subjectService";
// import { fetchChaptersBySubject } from "../../services/studentService";
// import QuizForm from "./QuizForm";

// const CreateContentBank = () => {
//     const [subjects, setSubjects] = useState([]);
//     const [chapters, setChapters] = useState([]);

//     const [subjectId, setSubjectId] = useState("");
//     const [chapterId, setChapterId] = useState("");
//     const [selectedType, setSelectedType] = useState("");

//     useEffect(() => {
//         const loadSubjects = async () => {
//             try {
//                 const data = await fetchSubjects();
//                 setSubjects(data);
//             } catch (err) {
//                 console.error("❌ Failed to load subjects:", err);
//             }
//         };
//         loadSubjects();
//     }, []);

//     useEffect(() => {
//         const loadChapters = async () => {
//             if (!subjectId) return;
//             try {
//                 const data = await fetchChaptersBySubject(subjectId);
//                 setChapters(data);
//             } catch (err) {
//                 console.error("❌ Failed to load chapters:", err);
//             }
//         };
//         loadChapters();
//     }, [subjectId]);

//     const handleSubjectChange = (e) => {
//         setSubjectId(e.target.value);
//         setChapterId("");
//         setSelectedType("");
//     };

//     const handleChapterChange = (e) => {
//         setChapterId(e.target.value);
//         setSelectedType("");
//     };

//     return (
//         <div className="container py-4">
//             <h3 className="mb-4">🛠️ Create Content Bank</h3>

//             {/* Step 1: Subject & Chapter Selection */}
//             <div className="row align-items-end mb-4">
//                 <div className="col-md-6">
//                     <label className="form-label fw-semibold">📘 Select Subject</label>
//                     <select
//                         className="form-select"
//                         value={subjectId}
//                         onChange={handleSubjectChange}
//                         required
//                     >
//                         <option value="">-- Choose Subject --</option>
//                         {subjects.map((sub) => (
//                             <option key={sub._id} value={sub._id}>
//                                 {sub.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className="col-md-6">
//                     <label className="form-label fw-semibold">📄 Select Chapter</label>
//                     <select
//                         className="form-select"
//                         value={chapterId}
//                         onChange={handleChapterChange}
//                         required
//                         disabled={!subjectId}
//                     >
//                         <option value="">-- Choose Chapter --</option>
//                         {chapters.map((ch) => (
//                             <option key={ch._id} value={ch._id}>
//                                 {ch.title}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             {/* Step 2: Content Type Selection */}
//             {chapterId && (
//                 <div className="mb-4">
//                     <label className="form-label fw-semibold">📦 Select Content Type</label>
//                     <div className="btn-group w-100" role="group">
//                         {["quiz", "assignment", "cheatsheet", "coding"].map((type) => (
//                             <button
//                                 key={type}
//                                 type="button"
//                                 className={`btn btn-outline-primary ${selectedType === type ? "active" : ""}`}
//                                 onClick={() => setSelectedType(type)}
//                             >
//                                 {type.charAt(0).toUpperCase() + type.slice(1)}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Step 3: Conditional Content Component */}
//             {selectedType && (
//                 <div className="mt-4">
//                     <h5 className="mb-3">
//                         ✏️ Create {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} for:{" "}
//                         <span className="text-success">{selectedChapter}</span>
//                     </h5>

//                     {/* ⛏️ Render QuizForm based on selectedType */}
//                     {selectedType === "quiz" && selectedChapter && (
//                         <QuizForm
//                             selectedSubject={selectedSubject}
//                             selectedChapter={selectedChapter}
//                         />
//                     )}

//                     {/* 🧩 You can add more forms like below later */}
//                     {/* {selectedType === "assignment" && <AssignmentForm ... />} */}
//                     {/* {selectedType === "cheatsheet" && <CheatsheetForm ... />} */}
//                     {/* {selectedType === "coding" && <CodingProblemForm ... />} */}
//                 </div>
//             )}


//         </div>
//     );
// };

// export default CreateContentBank;

import React, { useEffect, useState } from "react";
import { fetchSubjects } from "../../services/subjectService";
import { fetchChaptersBySubject } from "../../services/studentService";
import QuizForm from "./QuizForm"; // 👈 Import the QuizForm component

const CreateContentBank = () => {
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);

    const [subjectId, setSubjectId] = useState("");
    const [chapterId, setChapterId] = useState("");
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        const loadSubjects = async () => {
            try {
                const data = await fetchSubjects();
                setSubjects(data);
            } catch (err) {
                console.error("❌ Failed to load subjects:", err);
            }
        };
        loadSubjects();
    }, []);

    useEffect(() => {
        const loadChapters = async () => {
            if (!subjectId) return;
            try {
                const data = await fetchChaptersBySubject(subjectId);
                setChapters(data);
            } catch (err) {
                console.error("❌ Failed to load chapters:", err);
            }
        };
        loadChapters();
    }, [subjectId]);

    const handleSubjectChange = (e) => {
        setSubjectId(e.target.value);
        setChapterId("");
        setSelectedType("");
    };

    const handleChapterChange = (e) => {
        setChapterId(e.target.value);
        setSelectedType("");
    };

    const selectedChapterObj = chapters.find((ch) => ch._id === chapterId);
    const selectedSubjectObj = subjects.find((s) => s._id === subjectId);

    return (
        <div className="container py-4">
            <h3 className="mb-4">🛠️ Create Content Bank</h3>

            {/* Step 1: Subject & Chapter Selection */}
            <div className="row align-items-end mb-4">
                <div className="col-md-6">
                    <label className="form-label fw-semibold">📘 Select Subject</label>
                    <select
                        className="form-select"
                        value={subjectId}
                        onChange={handleSubjectChange}
                        required
                    >
                        <option value="">-- Choose Subject --</option>
                        {subjects.map((sub) => (
                            <option key={sub._id} value={sub._id}>
                                {sub.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label fw-semibold">📄 Select Chapter</label>
                    <select
                        className="form-select"
                        value={chapterId}
                        onChange={handleChapterChange}
                        required
                        disabled={!subjectId}
                    >
                        <option value="">-- Choose Chapter --</option>
                        {chapters.map((ch) => (
                            <option key={ch._id} value={ch._id}>
                                {ch.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Step 2: Content Type Selection */}
            {chapterId && (
                <div className="mb-4">
                    <label className="form-label fw-semibold">📦 Select Content Type</label>
                    <div className="btn-group w-100" role="group">
                        {["quiz", "assignment", "cheatsheet", "coding"].map((type) => (
                            <button
                                key={type}
                                type="button"
                                className={`btn btn-outline-primary ${selectedType === type ? "active" : ""}`}
                                onClick={() => setSelectedType(type)}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 3: Conditional Content Component */}
            {selectedType && (
                <div className="mt-4">
                    <h5 className="mb-3">
                        ✏️ Create{" "}
                        {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} for:{" "}
                        <span className="text-success">
                            {selectedSubjectObj?.name} → {selectedChapterObj?.title}
                        </span>
                    </h5>

                    {/* ⛏️ Render content form */}
                    {selectedType === "quiz" && chapterId && (
                        <QuizForm
                            selectedSubject={subjectId}
                            selectedChapter={chapterId}
                        />
                    )}

                    {/* 🧩 Future forms can go here */}
                    {/* {selectedType === "assignment" && <AssignmentForm subjectId={subjectId} chapterId={chapterId} />} */}
                </div>
            )}
        </div>
    );
};

export default CreateContentBank;
