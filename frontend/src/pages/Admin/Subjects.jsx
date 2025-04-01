import React, { useEffect, useState } from "react";
import { getUser } from "../../utils/tokenHelper";
import { fetchSubjects, createSubject } from "../../services/subjectService";
import { fetchChapters, createChapter } from "../../services/chapterService";

const Subjects = () => {
    const user = getUser();
    const institutionId = user?.institution?.id || user?.institutionId;

    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState("");
    const [selectedSubjectId, setSelectedSubjectId] = useState("");
    const [newChapter, setNewChapter] = useState("");
    const [chapters, setChapters] = useState([]);

    const loadSubjects = async () => {
        const data = await fetchSubjects(institutionId);
        setSubjects(data);
    };

    const loadChapters = async (subjectId) => {
        const data = await fetchChapters(subjectId);
        setChapters(data);
    };

    const handleAddSubject = async () => {
        if (!newSubject) return;
        await createSubject(newSubject, institutionId);
        setNewSubject("");
        loadSubjects();
    };

    const handleAddChapter = async () => {
        if (!newChapter || !selectedSubjectId) return;
        await createChapter(newChapter, selectedSubjectId, institutionId);
        setNewChapter("");
        loadChapters(selectedSubjectId);
    };

    useEffect(() => {
        loadSubjects();
    }, []);

    return (
        <div className="container mt-5">
            <h3 className="mb-4 text-center">📚 Manage Subjects & Chapters</h3>

            <div className="row g-4">
                {/* Left: Subjects */}
                <div className="col-md-6">
                    <div className="card shadow-sm p-4">
                        <h5 className="mb-3">🧑‍🏫 Subjects</h5>

                        <div className="d-flex mb-3">
                            <input
                                className="form-control me-2"
                                value={newSubject}
                                placeholder="Enter subject name"
                                onChange={(e) => setNewSubject(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={handleAddSubject}>
                                Add
                            </button>
                        </div>

                        <ul className="list-group">
                            {subjects.map((sub) => (
                                <li
                                    key={sub._id}
                                    className={`list-group-item d-flex justify-content-between align-items-center ${selectedSubjectId === sub._id ? "active" : ""
                                        }`}
                                >
                                    <span
                                        onClick={() => {
                                            setSelectedSubjectId(sub._id);
                                            loadChapters(sub._id);
                                        }}
                                        style={{ cursor: "pointer", flexGrow: 1 }}
                                    >
                                        {sub.name}
                                    </span>
                                    <button
                                        className="btn btn-sm btn-outline-secondary me-1"
                                        onClick={() => {
                                            const newName = prompt("Edit Subject Name:", sub.name);
                                            if (newName) updateSubject(sub._id, newName).then(loadSubjects);
                                        }}
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => {
                                            if (window.confirm("Delete this subject?")) {
                                                deleteSubject(sub._id).then(() => {
                                                    if (selectedSubjectId === sub._id) setSelectedSubjectId("");
                                                    loadSubjects();
                                                });
                                            }
                                        }}
                                    >
                                        🗑️
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right: Chapters */}
                <div className="col-md-6">
                    <div className="card shadow-sm p-4">
                        <h5 className="mb-3">📖 Chapters</h5>

                        {selectedSubjectId ? (
                            <>
                                {/* Add New Chapter */}
                                <div className="d-flex mb-3">
                                    <input
                                        className="form-control me-2"
                                        value={newChapter}
                                        placeholder="Enter chapter name"
                                        onChange={(e) => setNewChapter(e.target.value)}
                                    />
                                    <button className="btn btn-success" onClick={handleAddChapter}>
                                        Add
                                    </button>
                                </div>

                                {/* List of Chapters */}
                                <ul className="list-group">
                                    {chapters.map((ch) => (
                                        <li
                                            key={ch._id}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            <span>{ch.name}</span>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => {
                                                        const newName = prompt("Edit Chapter Name:", ch.name);
                                                        if (newName) {
                                                            updateChapter(ch._id, newName).then(() =>
                                                                loadChapters(selectedSubjectId)
                                                            );
                                                        }
                                                    }}
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => {
                                                        if (window.confirm("Are you sure to delete this chapter?")) {
                                                            deleteChapter(ch._id).then(() =>
                                                                loadChapters(selectedSubjectId)
                                                            );
                                                        }
                                                    }}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p className="text-muted">Select a subject to manage its chapters.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Subjects;
