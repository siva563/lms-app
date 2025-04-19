import React, { useEffect, useState } from "react";
import {
    createChapter,
    fetchChapters,
    updateChapter,
    deleteChapter,
} from "../../services/chapterService";
import { fetchSubjects } from "../../services/subjectService";

const ChapterManager = () => {
    const [chapters, setChapters] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [filterSubject, setFilterSubject] = useState("");
    const [searchTitle, setSearchTitle] = useState("");

    const [form, setForm] = useState({
        title: "",
        description: "",
        subjectId: "",
        videoUrl: "",
        cheatsheetUrl: "",
        quizId: "",
        assignmentId: "",
        imageUrl: "",
        isLocked: false,
    });

    useEffect(() => {
        loadChapters();
        loadSubjects();
    }, []);

    const loadChapters = async () => {
        const data = await fetchChapters();
        setChapters(data);
    };

    const loadSubjects = async () => {
        const data = await fetchSubjects();
        setSubjects(data);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanedForm = {
            ...form,
            quizId: form.quizId || null,
            assignmentId: form.assignmentId || null,
        };

        if (editingId) {
            await updateChapter(editingId, cleanedForm);
        } else {
            await createChapter(cleanedForm);
        }

        setForm({
            title: "",
            description: "",
            subjectId: "",
            videoUrl: "",
            cheatsheetUrl: "",
            quizId: "",
            assignmentId: "",
            imageUrl: "",
            isLocked: false,
        });
        setEditingId(null);
        loadChapters();
    };

    const handleEdit = (chapter) => {
        setForm({
            title: chapter.title || "",
            description: chapter.description || "",
            subjectId: chapter.subjectId?._id || chapter.subjectId || "",
            videoUrl: chapter.videoUrl || "",
            cheatsheetUrl: chapter.cheatsheetUrl || "",
            quizId: chapter.quizId || "",
            assignmentId: chapter.assignmentId || "",
            imageUrl: chapter.imageUrl || "",
            isLocked: chapter.isLocked || false,
        });
        setEditingId(chapter._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this chapter?")) {
            await deleteChapter(id);
            loadChapters();
        }
    };

    const filteredChapters = chapters
        .filter((ch) =>
            filterSubject ? ch.subjectId?._id === filterSubject : true
        )
        .filter((ch) =>
            ch.title?.toLowerCase().includes(searchTitle.toLowerCase())
        );

    return (
        <div className="container py-4">
            <h3>📘 Chapter Management</h3>

            {/* 🔍 Filter Section */}
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <div className="d-flex align-items-center gap-2">
                    <label className="form-label mb-0">Subject:</label>
                    <select
                        className="form-select"
                        value={filterSubject}
                        onChange={(e) => setFilterSubject(e.target.value)}
                    >
                        <option value="">All Subjects</option>
                        {subjects.map((s) => (
                            <option key={s._id} value={s._id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="d-flex align-items-center gap-2">
                    <label className="form-label mb-0">Search:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                </div>
            </div>

            {/* ➕ Add / Edit Form */}
            <form className="card p-3 shadow-sm mb-4" onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Chapter Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Subject</label>
                        <select
                            className="form-select"
                            name="subjectId"
                            value={form.subjectId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            {subjects.map((sub) => (
                                <option key={sub._id} value={sub._id}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Video URL</label>
                        <input
                            type="text"
                            className="form-control"
                            name="videoUrl"
                            value={form.videoUrl}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Cheatsheet URL</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cheatsheetUrl"
                            value={form.cheatsheetUrl}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Quiz ID</label>
                        <input
                            type="text"
                            className="form-control"
                            name="quizId"
                            value={form.quizId}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Assignment ID</label>
                        <input
                            type="text"
                            className="form-control"
                            name="assignmentId"
                            value={form.assignmentId}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            name="imageUrl"
                            value={form.imageUrl}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-3 d-flex align-items-end">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="isLocked"
                                checked={form.isLocked}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">Locked?</label>
                        </div>
                    </div>

                    <div className="col-md-3 d-flex align-items-end">
                        <button className="btn btn-primary w-100" type="submit">
                            {editingId ? "Update Chapter" : "Add Chapter"}
                        </button>
                    </div>
                </div>
            </form>

            {/* 📋 Chapter List */}
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Video</th>
                            <th>Quiz</th>
                            <th>Assignment</th>
                            <th>Locked</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredChapters.map((ch) => (
                            <tr key={ch._id}>
                                <td>{ch.title}</td>
                                <td>{ch.subjectId?.name || ""}</td>
                                <td>{ch.videoUrl ? "✅" : "—"}</td>
                                <td>{ch.quizId ? "✅" : "—"}</td>
                                <td>{ch.assignmentId ? "✅" : "—"}</td>
                                <td>{ch.isLocked ? "🔒" : "🔓"}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => handleEdit(ch)}
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(ch._id)}
                                    >
                                        ❌ Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChapterManager;
