import React from "react";

const TenthStandardCard = ({ profile, setProfile }) => {
    return (
        <div className="card p-4 shadow-sm mb-4" id="tenthDetails">
            {/* Heading */}
            <h5 className="mb-3">📚 10th Standard Details</h5>

            <div className="row g-3">
                {/* Percentage */}
                <div className="col-md-4">
                    <label>Percentage / CGPA</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.tenthPercentage || ""}
                        onChange={(e) => setProfile({ ...profile, tenthPercentage: e.target.value })}
                        placeholder="Eg: 85% or 9.2 CGPA"
                    />
                </div>

                {/* School Name */}
                <div className="col-md-4">
                    <label>School Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.tenthSchool || ""}
                        onChange={(e) => setProfile({ ...profile, tenthSchool: e.target.value })}
                        placeholder="Eg: ZPHS Rajahmundry"
                    />
                </div>

                {/* Board */}
                <div className="col-md-4">
                    <label>Board</label>
                    <select
                        className="form-select"
                        value={profile.tenthBoard || ""}
                        onChange={(e) => setProfile({ ...profile, tenthBoard: e.target.value })}
                    >
                        <option value="">Select Board</option>
                        <option value="State">State Board</option>
                        <option value="CBSE">CBSE</option>
                        <option value="ICSE">ICSE</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TenthStandardCard;
