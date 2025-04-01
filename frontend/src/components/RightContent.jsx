import React, { useState, useEffect } from "react";

const RightContent = ({ selectedChapter }) => {
    const [activeTab, setActiveTab] = useState("mcq");

    if (!selectedChapter) {
        return <div className="text-muted">📖 Select a chapter to view content.</div>;
    }

    return (
        <div className="p-3">
            {/* 🎥 Video Section */}
            <div className="mb-3">
                {/* <h5 className="mb-2">🎥 Chapter Video</h5> */}
                <div style={{ width: "70%", height: "400px", border: "1px solid #ccc", overflow: "hidden" }}>
                    <iframe
                        src={selectedChapter.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                        title="Chapter Video"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                    />
                </div>
            </div>

            {/* 🧩 Tabs */}
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "mcq" ? "active" : ""}`}
                        onClick={() => setActiveTab("mcq")}
                    >
                        🧠 MCQ's
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "cheatsheet" ? "active" : ""}`}
                        onClick={() => setActiveTab("cheatsheet")}
                    >
                        📄 Cheatsheet
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "assignment" ? "active" : ""}`}
                        onClick={() => setActiveTab("assignment")}
                    >
                        📝 Assignments
                    </button>
                </li>
            </ul>

            {/* 📦 Tab Content */}
            <div>
                {activeTab === "mcq" && (
                    <div>
                        <h6>🧠 Multiple Choice Questions</h6>
                        {/* Load MCQs from API or mock here */}
                        <p>No MCQs available yet.</p>
                    </div>
                )}
                {activeTab === "cheatsheet" && (
                    <div>
                        <h6>📄 Cheatsheet</h6>
                        <p>No cheatsheet uploaded for this chapter.</p>
                    </div>
                )}
                {activeTab === "assignment" && (
                    <div>
                        <h6>📝 Assignments</h6>
                        <p>No assignments added yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RightContent;
