import React, { useEffect, useState } from "react";
import { fetchSubjects } from "../services/subjectService";
import { fetchChapters } from "../services/chapterService";
import { getUser } from "../utils/tokenHelper";

const StudentSidebar = ({ onChapterClick }) => {
    const user = getUser();
    const institutionId = user?.institution?.id || user?.institutionId;

    const [subjects, setSubjects] = useState([]);
    const [expandedSubjectId, setExpandedSubjectId] = useState(null);
    const [chapters, setChapters] = useState({}); // { subjectId: [chapterList] }

    useEffect(() => {
        const loadSubjects = async () => {
            const data = await fetchSubjects(institutionId);
            setSubjects(data);
        };
        loadSubjects();
    }, []);

    const toggleSubject = async (subjectId) => {
        if (expandedSubjectId === subjectId) {
            setExpandedSubjectId(null); // collapse
        } else {
            setExpandedSubjectId(subjectId);

            // fetch chapters only once
            if (!chapters[subjectId]) {
                const chapterData = await fetchChapters(subjectId);
                setChapters((prev) => ({ ...prev, [subjectId]: chapterData }));
            }
        }
    };

    return (
        <div className="bg-light border-end vh-100 p-3" style={{ width: "230px" }}>
            <h5 className="mb-4">📚 Subjects</h5>
            {subjects.map((subject) => (
                <div key={subject._id}>
                    <div
                        className="d-flex justify-content-between align-items-center mb-2"
                        role="button"
                        onClick={() => toggleSubject(subject._id)}
                    >
                        <strong>{subject.name}</strong>
                        <span>
                            {expandedSubjectId === subject._id ? "▼" : "▶"}
                        </span>
                    </div>

                    {expandedSubjectId === subject._id && (
                        <ul className="list-group mb-3">
                            {(chapters[subject._id] || []).map((chapter) => (
                                <li
                                    key={chapter._id}
                                    className="list-group-item list-group-item-action"
                                    role="button"
                                    onClick={() => onChapterClick?.(subject._id, chapter._id)}
                                >
                                    {chapter.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
            <h5 className="mb-4">📚 Exams</h5>
        </div>
    );
};

export default StudentSidebar;
