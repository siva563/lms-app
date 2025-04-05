import React from "react";

const CurrentExpertiseCard = ({ profile, setProfile }) => {
    return (
        <div className="card p-4 shadow-sm mb-4" id="expertiseDetails">
            {/* Heading */}
            <h4 className="mb-3">💻 Current Expertise</h4>

            {/* Info Text */}
            <div className="alert alert-info small">
                Please provide the following details to mentor you better
            </div>

            {/* Fields */}
            <div className="row g-3">
                {/* Current Coding Level */}
                <div className="col-md-6">
                    <label>Current Coding Level</label>
                    <select
                        className="form-select"
                        value={profile.codingLevel || ""}
                        onChange={(e) => setProfile({ ...profile, codingLevel: e.target.value })}
                    >
                        <option value="">Select your level</option>
                        <option value="No knowledge">I don't have knowledge in coding</option>
                        <option value="Basic">I know basic programming</option>
                        <option value="Intermediate">Intermediate - can solve problems</option>
                        <option value="Advanced">Advanced - good at coding interviews</option>
                    </select>
                </div>

                {/* Laptop/Computer Available */}
                <div className="col-md-6">
                    <label>Do you have a Laptop/Computer?</label>
                    <select
                        className="form-select"
                        value={profile.hasLaptop || ""}
                        onChange={(e) => setProfile({ ...profile, hasLaptop: e.target.value })}
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                {/* Technical Skills */}
                <div className="col-12">
                    <label>Technical Skills (if any)</label>
                    <select
                        className="form-select"
                        multiple
                        value={profile.skills || []}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                skills: Array.from(e.target.selectedOptions, (option) => option.value),
                            })
                        }
                    >
                        {/* Real-world tech stack options */}
                        <option value="Java">Java</option>
                        <option value="Python">Python</option>
                        <option value="C/C++">C / C++</option>
                        <option value="React.js">React.js</option>
                        <option value="Angular">Angular</option>
                        <option value="Node.js">Node.js</option>
                        <option value="Spring Boot">Spring Boot</option>
                        <option value=".NET">.NET</option>
                        <option value="HTML/CSS/JS">HTML/CSS/JavaScript</option>
                        <option value="Android/Flutter">Android / Flutter</option>
                        <option value="SQL">SQL / MySQL</option>
                        <option value="AWS/Cloud">AWS / Cloud</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Data Science">Data Science</option>
                        <option value="DevOps">DevOps</option>
                        <option value="NA">Not Applicable (NA)</option>
                    </select>
                    <small className="text-muted">Hold CTRL (Windows) or CMD (Mac) to select multiple skills</small>
                </div>
            </div>
        </div>
    );
};

export default CurrentExpertiseCard;
