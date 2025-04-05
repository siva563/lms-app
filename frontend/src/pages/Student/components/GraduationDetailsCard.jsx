import React from "react";

const GraduationDetailsCard = ({ profile, setProfile }) => {
    return (
        <div className="card p-4 shadow-sm mb-4" id="graduationDetails">
            {/* Heading */}
            <h5 className="mb-3">🎓 Graduation Details</h5>

            <div className="row g-3">
                {/* Degree Name */}
                <div className="col-md-6">
                    <label>Bachelor's Degree</label>
                    <select
                        className="form-select"
                        value={profile.graduationDegree || ""}
                        onChange={(e) => setProfile({ ...profile, graduationDegree: e.target.value })}
                    >
                        <option value="">Select Degree</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="B.E">B.E</option>
                        <option value="B.Sc">B.Sc</option>
                        <option value="B.Com">B.Com</option>
                        <option value="BCA">BCA</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Degree Status */}
                <div className="col-md-6">
                    <label>Degree Status</label>
                    <select
                        className="form-select"
                        value={profile.graduationStatus || ""}
                        onChange={(e) => setProfile({ ...profile, graduationStatus: e.target.value })}
                    >
                        <option value="">Select Status</option>
                        <option value="Completed Successfully">Completed Successfully</option>
                        <option value="Pursuing">Pursuing</option>
                    </select>
                </div>

                {/* Department / Branch */}
                <div className="col-md-6">
                    <label>Department / Branch</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.graduationBranch || ""}
                        onChange={(e) => setProfile({ ...profile, graduationBranch: e.target.value })}
                        placeholder="Eg: Electrical & Electronics Engineering (EEE)"
                    />
                </div>

                {/* CGPA */}
                <div className="col-md-3">
                    <label>CGPA (if available)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.graduationCGPA || ""}
                        onChange={(e) => setProfile({ ...profile, graduationCGPA: e.target.value })}
                        placeholder="Eg: 7.2"
                    />
                </div>

                {/* Percentage */}
                <div className="col-md-3">
                    <label>Percentage (if available)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.graduationPercentage || ""}
                        onChange={(e) => setProfile({ ...profile, graduationPercentage: e.target.value })}
                        placeholder="Eg: 72%"
                    />
                </div>

                {/* Start Year */}
                <div className="col-md-3">
                    <label>Start Year</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.graduationStartYear || ""}
                        onChange={(e) => setProfile({ ...profile, graduationStartYear: e.target.value })}
                        placeholder="Eg: 2016"
                    />
                </div>

                {/* End Year */}
                <div className="col-md-3">
                    <label>End Year</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.graduationEndYear || ""}
                        onChange={(e) => setProfile({ ...profile, graduationEndYear: e.target.value })}
                        placeholder="Eg: 2020"
                    />
                </div>

                {/* Institute Country */}
                <div className="col-md-4">
                    <label>Institute Country</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.instituteCountry || "India"}
                        readOnly
                    />
                </div>

                {/* Institute Name */}
                <div className="col-md-8">
                    <label>Institute Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.instituteName || ""}
                        onChange={(e) => setProfile({ ...profile, instituteName: e.target.value })}
                        placeholder="Eg: Aditya Engineering College (AEC), Surampalem"
                    />
                </div>

                {/* Institute Pincode */}
                <div className="col-md-3">
                    <label>Institute Pincode</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.institutePincode || ""}
                        onChange={(e) => setProfile({ ...profile, institutePincode: e.target.value })}
                        placeholder="Eg: 533291"
                    />
                </div>

                {/* Institute State */}
                <div className="col-md-3">
                    <label>Institute State</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.instituteState || ""}
                        onChange={(e) => setProfile({ ...profile, instituteState: e.target.value })}
                        placeholder="Eg: Andhra Pradesh"
                    />
                </div>

                {/* Institute District */}
                <div className="col-md-3">
                    <label>Institute District</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.instituteDistrict || ""}
                        onChange={(e) => setProfile({ ...profile, instituteDistrict: e.target.value })}
                        placeholder="Eg: East Godavari"
                    />
                </div>

                {/* Institute City */}
                <div className="col-md-3">
                    <label>Institute City</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.instituteCity || ""}
                        onChange={(e) => setProfile({ ...profile, instituteCity: e.target.value })}
                        placeholder="Eg: Peddapuram"
                    />
                </div>
            </div>
        </div>
    );
};

export default GraduationDetailsCard;
