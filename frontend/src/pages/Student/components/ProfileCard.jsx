import React, { useState } from "react";

const ProfileCard = ({ formData, handleSimpleChange, handleFileChange, handleRemovePhoto }) => {
    const indianLanguages = [
        "Telugu", "Hindi", "Tamil", "Kannada", "Malayalam", "Gujarati",
        "Marathi", "Bengali", "Punjabi", "Urdu", "Odia", "Assamese"
    ];

    if (!formData) return null; 

    return (
        <div className="card p-4 shadow-sm mb-4" id="profileDetails">
            {/* Row 1 */}
            <h4 className="mb-3">🧑‍🎓 Profile</h4>

            {/* Row 2 */}
            <div className="alert alert-info small">
                Information you provide will be used for IRC Certificate etc.. Write your Name and other details carefully, just as you would in an official document.
            </div>

            {/* Row 3 - Profile Pic Preview + Upload/Remove */}
            <div className="mb-4 text-center">
                {profile.profilePic ? (
                    <img
                        src={profile.profilePic.startsWith("http") ? profile.profilePic : `http://localhost:5000/${profile.profilePic}`}
                        alt="Profile Pic"
                        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }}
                    />
                ) : (
                    <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "100px", height: "100px" }}>
                        No Photo
                    </div>
                )}
                <div className="mt-2">
                    <button type="button" className="btn btn-sm btn-outline-danger me-2" onClick={handleRemovePhoto}>Remove Photo</button>
                    <label className="btn btn-sm btn-outline-primary">
                        Upload Photo
                        <input type="file" hidden onChange={(e) => handleFileChange(e, "profilePic")} />
                    </label>
                </div>
            </div>

            {/* Form Fields */}
            <div className="row g-3">
                {/* First Name */}
                <div className="col-md-6">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.firstName || ""}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        placeholder="Ex: Sachin"
                    />
                </div>

                {/* Last Name */}
                <div className="col-md-6">
                    <label>Surname / Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.lastName || ""}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        placeholder="Ex: Tendulkar"
                    />
                </div>

                {/* Name on IRC Certificate */}
                <div className="col-md-6">
                    <label>Name on your IRC Certificate</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.ircName || ""}
                        onChange={(e) => setProfile({ ...profile, ircName: e.target.value })}
                        placeholder="Same as Govt ID"
                    />
                </div>

                {/* Gender */}
                <div className="col-md-6">
                    <label>Gender</label>
                    <div className="d-flex gap-3 mt-1">
                        {["Male", "Female", "Transgender"].map((g) => (
                            <div key={g}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value={g}
                                    checked={profile.gender === g}
                                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                                /> {g}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mother Tongue */}
                <div className="col-md-6">
                    <label>Mother Tongue</label>
                    <select
                        className="form-select"
                        value={profile.motherTongue || "Telugu"}
                        onChange={(e) => setProfile({ ...profile, motherTongue: e.target.value })}
                    >
                        {indianLanguages.map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>

                {/* Preferred Teaching Language */}
                <div className="col-md-6">
                    <label>Preferred Language for Teaching</label>
                    <select
                        className="form-select"
                        value={profile.preferredTeachingLanguage || "English"}
                        onChange={(e) => setProfile({ ...profile, preferredTeachingLanguage: e.target.value })}
                    >
                        <option value="English">English</option>
                    </select>
                </div>

                {/* Preferred Watching Language */}
                <div className="col-md-6">
                    <label>Preferred Language for Watching Lectures</label>
                    <select
                        className="form-select"
                        value={profile.preferredWatchingLanguage || "English"}
                        onChange={(e) => setProfile({ ...profile, preferredWatchingLanguage: e.target.value })}
                    >
                        <option value="English">English</option>
                    </select>
                </div>

                {/* Date of Birth */}
                <div className="col-md-6">
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        value={profile.dob || ""}
                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                    />
                </div>

                {/* LinkedIn URL */}
                <div className="col-md-6">
                    <label>LinkedIn Profile URL</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.linkedin || ""}
                        onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                        placeholder="https://www.linkedin.com/in/rahulattuluri/"
                    />
                </div>

                {/* GitHub URL */}
                <div className="col-md-6">
                    <label>GitHub Link</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.github || ""}
                        onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                        placeholder="https://github.com/rahulattuluri"
                    />
                </div>

                {/* CodeChef URL */}
                <div className="col-md-6">
                    <label>CodeChef Link</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.codechef || ""}
                        onChange={(e) => setProfile({ ...profile, codechef: e.target.value })}
                        placeholder="https://www.codechef.com/users/rahulattuluri"
                    />
                </div>

                {/* HackerRank URL */}
                <div className="col-md-6">
                    <label>HackerRank Link</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.hackerrank || ""}
                        onChange={(e) => setProfile({ ...profile, hackerrank: e.target.value })}
                        placeholder="https://www.hackerrank.com/profile/rahulattuluri"
                    />
                </div>

                {/* LeetCode URL */}
                <div className="col-md-6">
                    <label>LeetCode Link</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.leetcode || ""}
                        onChange={(e) => setProfile({ ...profile, leetcode: e.target.value })}
                        placeholder="https://leetcode.com/u/rahulattuluri/"
                    />
                </div>

                {/* Resume Upload */}
                <div className="col-md-6">
                    <label>Resume Upload</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => handleFileChange(e, "resume")}
                    />
                </div>

            </div> {/* End Row */}
        </div>
    );
};

export default ProfileCard;
