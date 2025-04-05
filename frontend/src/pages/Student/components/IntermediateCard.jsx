import React from "react";

const IntermediateCard = ({ profile, setProfile }) => {
    return (
        <div className="card p-4 shadow-sm mb-4" id="intermediateDetails">
            {/* Heading */}
            <h5 className="mb-3">📚 Intermediate / 12th / Diploma Details</h5>

            <div className="row g-3">
                {/* Percentage */}
                <div className="col-md-4">
                    <label>Percentage / CGPA</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.intermediatePercentage || ""}
                        onChange={(e) => setProfile({ ...profile, intermediatePercentage: e.target.value })}
                        placeholder="Eg: 88% or 9.0 CGPA"
                    />
                </div>

                {/* College Name */}
                <div className="col-md-4">
                    <label>College Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.intermediateCollege || ""}
                        onChange={(e) => setProfile({ ...profile, intermediateCollege: e.target.value })}
                        placeholder="Eg: Narayana Junior College"
                    />
                </div>

                {/* Stream / Group */}
                <div className="col-md-4">
                    <label>Stream / Group</label>
                    <select
                        className="form-select"
                        value={profile.intermediateGroup || ""}
                        onChange={(e) => setProfile({ ...profile, intermediateGroup: e.target.value })}
                    >
                        <option value="">Select Group</option>
                        <option value="MPC">MPC</option>
                        <option value="BiPC">BiPC</option>
                        <option value="CEC">CEC</option>
                        <option value="MEC">MEC</option>
                        <option value="HEC">HEC</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default IntermediateCard;
