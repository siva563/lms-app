import React, { useEffect, useState } from "react";
import { getMyRank } from "../../../services/progressService";

const RankCard = () => {
    const [rank, setRank] = useState(null);

    useEffect(() => {
        const fetchRank = async () => {
            try {
                const data = await getMyRank();
                setRank(data);
            } catch (err) {
                console.error("Rank fetch error:", err);
            }
        };

        fetchRank();
    }, []);

    if (!rank) return <div className="card"><div className="card-body">Loading...</div></div>;

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title text-warning">🏆 Your Rank</h5>
                <p className="card-text fs-5">
                    In Batch: <strong>#{rank.batchRank}</strong> / {rank.batchSize}
                </p>
                <p className="card-text">
                    Overall: <strong>#{rank.overallRank}</strong> / {rank.totalStudents}
                </p>
                <a href="/student/leaderboard" className="btn btn-sm btn-outline-warning mt-2">
                    View Leaderboard
                </a>
            </div>
        </div>
    );
};

export default RankCard;
