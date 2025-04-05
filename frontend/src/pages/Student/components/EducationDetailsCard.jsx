import React from "react";

const EducationDetailsCard = ({ profile, setProfile }) => {
    return (
        <div className="card p-4 shadow-sm mb-4" id="educationDetails">
            {/* Heading */}
            <h4 className="mb-3">🎓 Education Details</h4>

            {/* Info Text */}
            <div className="alert alert-warning small">
                Provide accurate information since recruiters will verify documents during placements.
            </div>

            {/* Fields */}
            <div className="row g-3">
                {/* Highest Education */}
                <div className="col-md-6">
                    <label>Highest Education Qualification</label>
                    <select
                        className="form-select"
                        value={profile.highestEducation || ""}
                        onChange={(e) => setProfile({ ...profile, highestEducation: e.target.value })}
                    >
                        <option value="">Select</option>
                        <option value="10th">10th Standard</option>
                        <option value="12th">12th / Intermediate / Diploma</option>
                        <option value="Bachelor">Bachelor's Degree</option>
                        <option value="Master">Master's Degree</option>
                        <option value="PhD">Ph.D</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Current Education (if studying) */}
                <div className="col-md-6">
                    <label>Mention your Current Education (if studying)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.currentEducation || ""}
                        onChange={(e) => setProfile({ ...profile, currentEducation: e.target.value })}
                        placeholder="Eg: B.Tech - Computer Science"
                    />
                </div>
            </div>
        </div>
    );
};

export default EducationDetailsCard;
