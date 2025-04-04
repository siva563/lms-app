import React, { useEffect, useState } from "react";
import { getCourseCompletion } from "../../../services/progressService";

const CourseProgressCard = () => {
    const [completion, setCompletion] = useState(null);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const data = await getCourseCompletion(); // % from backend
                setCompletion(data.percentage);
            } catch (err) {
                console.error("Error loading course progress", err);
            }
        };

        fetchProgress();
    }, []);

    if (completion === null) {
        return (
            <div className="card shadow-sm">
                <div className="card-body text-center">
                    <div className="spinner-border text-primary" role="status" />
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title text-success"><i class="bi bi-hourglass-split"></i> Course Progress</h5>
                <p className="card-text fs-5">
                    Completed: <strong>{completion}%</strong>
                </p>
                <div className="progress mt-2 mb-3">
                    <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${completion}%` }}
                        aria-valuenow={completion}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    />
                </div>
                <a href="/student/attendance" className="btn btn-sm btn-outline-primary mt-1">
                    View My Progress
                </a>
            </div>
        </div>
    );
};

export default CourseProgressCard;
