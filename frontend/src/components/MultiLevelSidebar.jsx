// import React, { useEffect, useState } from "react";
// import { getUser } from "../utils/tokenHelper";
// import { fetchSubjects } from "../services/subjectService";
// import { fetchChapters } from "../services/chapterService";
// import { getToken } from "../utils/tokenHelper";
// import axios from "axios";

// const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const MultiLevelSidebar = ({ onChapterClick, onExamClick }) => {
//     const user = getUser();
//     const institutionId = user?.institution?.id || user?.institutionId;

//     const sections = ["Subjects", "Interviews", "Exams"];
//     const [expandedSection, setExpandedSection] = useState(null);
//     const [expandedSubjects, setExpandedSubjects] = useState({});
//     const [subjects, setSubjects] = useState([]);
//     const [chapters, setChapters] = useState({});
//     const [exams, setExams] = useState([]);

//     useEffect(() => {
//         const loadSubjects = async () => {
//             const data = await fetchSubjects(institutionId);
//             setSubjects(data);
//         };
//         loadSubjects();
//     }, []);

//     const toggleSection = async (section) => {
//         setExpandedSection((prev) => (prev === section ? null : section));

//         if (section === "Exams" && exams.length === 0) {
//             try {
//                 const res = await axios.get(`${API}/exams?institutionId=${institutionId}`, {
//                     headers: { Authorization: `Bearer ${getToken()}` },
//                 });
//                 setExams(res.data);
//             } catch (err) {
//                 console.error("Failed to load exams:", err);
//             }
//         }
//     };

//     const toggleSubject = async (subjectId) => {
//         setExpandedSubjects((prev) => ({
//             ...prev,
//             [subjectId]: !prev[subjectId],
//         }));

//         if (!chapters[subjectId]) {
//             const chapterData = await fetchChapters(subjectId);
//             setChapters((prev) => ({ ...prev, [subjectId]: chapterData }));
//         }
//     };

//     return (
//         <div className="bg-light p-3 border-end vh-100" style={{ width: "260px", overflowY: "auto" }}>
//             {sections.map((section) => (
//                 <div key={section} className="mb-3">
//                     {/* Top-level */}
//                     <div
//                         className="fw-bold d-flex justify-content-between align-items-center mb-2"
//                         role="button"
//                         onClick={() => toggleSection(section)}
//                     >
//                         <span>📁 {section}</span>
//                         <span>{expandedSection === section ? "▼" : "▶"}</span>
//                     </div>

//                     {/* Section Content */}
//                     {expandedSection === section && (
//                         <div className="ms-3">
//                             {/* 📘 Subjects & Interviews */}
//                             {(section === "Subjects" || section === "Interviews") &&
//                                 subjects.map((subject) => (
//                                     <div key={subject._id} className="mb-2">
//                                         <div
//                                             className="d-flex justify-content-between align-items-center"
//                                             role="button"
//                                             onClick={() => toggleSubject(subject._id)}
//                                         >
//                                             <span>📘 {subject.name}</span>
//                                             <span>{expandedSubjects[subject._id] ? "▼" : "▶"}</span>
//                                         </div>

//                                         {expandedSubjects[subject._id] && (
//                                             <ul className="list-group list-group-flush ms-3 mt-1">
//                                                 {(chapters[subject._id] || []).map((ch) => (
//                                                     <li
//                                                         key={ch._id}
//                                                         className="list-group-item py-1 ps-4 pe-2"
//                                                         role="button"
//                                                         onClick={() =>
//                                                             onChapterClick(subject._id, ch._id, ch.name)
//                                                         }
//                                                     >
//                                                         🧩 {ch.name}
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         )}
//                                     </div>
//                                 ))}

//                             {/* 🧪 Exams */}
//                             {section === "Exams" &&
//                                 exams.map((exam) => (
//                                     <div
//                                         key={exam._id}
//                                         className="ms-2 mb-2 text-primary"
//                                         role="button"
//                                         onClick={() => onExamClick?.(exam._id)}
//                                     > {exam.title}
//                                     </div>
//                                 ))}
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default MultiLevelSidebar;


import React, { useEffect, useState } from "react";
import { FaBook, FaClipboardList, FaChalkboardTeacher, FaChevronDown, FaChevronRight, FaPuzzlePiece } from "react-icons/fa";
import { getUser, getToken } from "../utils/tokenHelper";
import { fetchSubjects } from "../services/subjectService";
import { fetchChapters } from "../services/chapterService";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const MultiLevelSidebar = ({ onChapterClick, onExamClick }) => {
    const user = getUser();
    const institutionId = user?.institution?.id || user?.institutionId;

    const sections = [
        { key: "Subjects", icon: <FaBook /> },
        { key: "Interviews", icon: <FaChalkboardTeacher /> },
        { key: "Exams", icon: <FaClipboardList /> },
    ];

    const [expandedSection, setExpandedSection] = useState(null);
    const [expandedSubjects, setExpandedSubjects] = useState({});
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState({});
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const loadSubjects = async () => {
            const data = await fetchSubjects(institutionId);
            setSubjects(data);
        };
        loadSubjects();
    }, []);

    const toggleSection = async (section) => {
        setExpandedSection(prev => prev === section ? null : section);
        setExpandedSubjects({}); // close all subjects when switching section

        if (section === "Exams" && exams.length === 0) {
            try {
                const res = await axios.get(`${API}/exams?institutionId=${institutionId}`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                setExams(res.data);
            } catch (err) {
                console.error("Failed to load exams:", err);
            }
        }
    };

    const toggleSubject = async (subjectId) => {
        const isOpen = expandedSubjects[subjectId];
        const newExpanded = {};
        if (!isOpen) {
            newExpanded[subjectId] = true;
            if (!chapters[subjectId]) {
                const chapterData = await fetchChapters(subjectId);
                setChapters(prev => ({ ...prev, [subjectId]: chapterData }));
            }
        }
        setExpandedSubjects(newExpanded);
    };

    return (
        <div className="bg-white border-end vh-100 shadow-sm" style={{ width: "250px", overflowY: "auto" }}>
            <div className="p-3">
                {sections.map(({ key, icon }) => (
                    <div key={key} className="mb-2">
                        {/* Section Header */}
                        <div
                            className="d-flex justify-content-between align-items-center fw-semibold py-2 px-2 rounded bg-light"
                            role="button"
                            onClick={() => toggleSection(key)}
                            style={{ cursor: "pointer", transition: "0.3s" }}
                        >
                            <span>{icon} {key}</span>
                            {expandedSection === key ? <FaChevronDown /> : <FaChevronRight />}
                        </div>

                        {/* Section Content */}
                        {expandedSection === key && (
                            <div className="ms-3 mt-2">
                                {(key === "Subjects" || key === "Interviews") &&
                                    subjects.map((subject) => (
                                        <div key={subject._id}>
                                            <div
                                                className="d-flex justify-content-between align-items-center text-dark ps-2"
                                                role="button"
                                                onClick={() => toggleSubject(subject._id)}
                                            >
                                                <span><FaBook className="me-2" /> {subject.name}</span>
                                                {expandedSubjects[subject._id] ? <FaChevronDown /> : <FaChevronRight />}
                                            </div>

                                            {expandedSubjects[subject._id] && (
                                                <ul className="list-group list-group-flush ms-3 mt-1">
                                                    {(chapters[subject._id] || []).map((ch) => (
                                                        <li
                                                            key={ch._id}
                                                            className="list-group-item ps-4 py-1 text-primary"
                                                            role="button"
                                                            onClick={() => onChapterClick(subject._id, ch._id, ch.name)}
                                                        >
                                                            <FaPuzzlePiece className="me-2" /> {ch.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))
                                }

                                {key === "Exams" &&
                                    exams.map((exam) => (
                                        <div
                                            key={exam._id}
                                            className="ps-3 py-1 text-success"
                                            role="button"
                                            onClick={() => onExamClick?.(exam._id)}
                                        >
                                            <FaClipboardList className="me-2" /> {exam.title}
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiLevelSidebar;
