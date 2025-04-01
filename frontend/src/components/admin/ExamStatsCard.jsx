import React from "react";

const ExamStatsCard = ({ analytics }) => {
    const {
        title,
        totalStudents,
        attempted,
        notAttempted,
        averageScore,
        highestScore,
        lowestScore,
        averageTimeTaken,
        submittedAtRange,
    } = analytics;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
            <div className="col">
                <div className="card border-success shadow-sm">
                    <div className="card-body">
                        <h6 className="card-title text-success">📘 Exam Title</h6>
                        <p className="card-text fw-bold">{title}</p>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card border-primary shadow-sm">
                    <div className="card-body">
                        <h6 className="card-title text-primary">👥 Total Students</h6>
                        <p className="card-text fw-bold">{totalStudents}</p>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card border-info shadow-sm">
                    <div className="card-body">
                        <h6 className="card-title text-info">✅ Attempted</h6>
                        <p className="card-text fw-bold">{attempted}</p>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card border-warning shadow-sm">
                    <div className="card-body">
                        <h6 className="card-title text-warning">❌ Not Attempted</h6>
                        <p className="card-text fw-bold">{notAttempted}</p>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card border-secondary shadow-sm">
                    <div className="card-body">
                        <h6 className="card-title text-secondary">📈 Avg Score</h6>
                        <p className="card-text fw-bold">{averageScore}</p>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card border-danger shadow-sm">
                    <div className="card-body">
                        <h6 className="card-title text-danger">🏆 Highest Score</h6>
                        <p className="card-text fw-bold">{highestScore}</p>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card border-dark shadow-sm">
                    <div className="card-body">
                        <h6 className="card-title text-dark">📉 Lowest Score</h6>
                        <p className="card-text fw-bold">{lowestScore}</p>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card border-success shadow-sm">
                    <div className="card-body">
                        <h6 className="card-title text-success">⏱ Avg Time Taken</h6>
                        <p className="card-text fw-bold">{formatTime(averageTimeTaken)}</p>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card border-info shadow-sm">
                    <div className="card-body">
                        <h6 className="card-title text-info">🕒 Submission Range</h6>
                        <p className="card-text">
                            <strong>From:</strong>{" "}
                            {submittedAtRange.earliest
                                ? new Date(submittedAtRange.earliest).toLocaleString()
                                : "N/A"}{" "}
                            <br />
                            <strong>To:</strong>{" "}
                            {submittedAtRange.latest
                                ? new Date(submittedAtRange.latest).toLocaleString()
                                : "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamStatsCard;
