import React, { useState, useEffect } from "react";
import { fetchStudentProfile, updateStudentProfile } from "../../../services/studentService";

const StudentProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchStudentProfile();
        setProfile(data || {});
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateStudentProfile(profile);
    alert("✅ Profile Updated Successfully!");
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-4">
      <form onSubmit={handleSubmit}>
        {/* Profile Details Card */}
        <div className="card p-4 shadow-sm mb-4">
          <h5 className="mb-3">🧑‍🎓 Profile Details</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" value={profile.firstName || ""} onChange={(e) => handleChange("firstName", e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Surname / Last Name</label>
              <input type="text" className="form-control" value={profile.lastName || ""} onChange={(e) => handleChange("lastName", e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Name on IRC Certificate</label>
              <input type="text" className="form-control" value={profile.ircName || ""} onChange={(e) => handleChange("ircName", e.target.value)} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Gender</label>
              <div className="d-flex gap-3 align-items-center">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gender" value="Male" checked={profile.gender === "Male"} onChange={(e) => handleChange("gender", e.target.value)} />
                  <label className="form-check-label">Male</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gender" value="Female" checked={profile.gender === "Female"} onChange={(e) => handleChange("gender", e.target.value)} />
                  <label className="form-check-label">Female</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gender" value="Transgender" checked={profile.gender === "Transgender"} onChange={(e) => handleChange("gender", e.target.value)} />
                  <label className="form-check-label">Transgender</label>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <label className="form-label">Date of Birth</label>
              <input type="date" className="form-control" value={profile.dob || ""} onChange={(e) => handleChange("dob", e.target.value)} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Mother Tongue</label>
              <select className="form-select" value={profile.motherTongue || ""} onChange={(e) => handleChange("motherTongue", e.target.value)}>
                <option>Telugu</option>
                <option>Hindi</option>
                <option>Kannada</option>
                <option>Tamil</option>
                <option>Malayalam</option>
                <option>Gujarati</option>
                <option>Marathi</option>
                <option>Bengali</option>
                <option>Other</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">LinkedIn Profile URL</label>
              <input type="text" className="form-control" value={profile.linkedin || ""} onChange={(e) => handleChange("linkedin", e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label">GitHub Profile URL</label>
              <input type="text" className="form-control" value={profile.github || ""} onChange={(e) => handleChange("github", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Contact Details Card */}
        <div className="card p-4 shadow-sm mb-4">
          <h5 className="mb-3">📞 Contact Details</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Mobile Number</label>
              <input type="text" className="form-control" value={profile.mobile || ""} disabled />
            </div>
            <div className="col-md-4">
              <label className="form-label">WhatsApp Number</label>
              <input type="text" className="form-control" value={profile.whatsapp || ""} onChange={(e) => handleChange("whatsapp", e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" value={profile.email || ""} disabled />
            </div>
          </div>
        </div>

        {/* Address Details Card */}
        <div className="card p-4 shadow-sm mb-4">
          <h5 className="mb-3">🏡 Address Details</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Village</label>
              <input type="text" className="form-control" value={profile.village || ""} onChange={(e) => handleChange("village", e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Mandal</label>
              <input type="text" className="form-control" value={profile.mandal || ""} onChange={(e) => handleChange("mandal", e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">District</label>
              <input type="text" className="form-control" value={profile.district || ""} onChange={(e) => handleChange("district", e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">State</label>
              <input type="text" className="form-control" value={profile.state || ""} onChange={(e) => handleChange("state", e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Pincode</label>
              <input type="text" className="form-control" value={profile.pincode || ""} onChange={(e) => handleChange("pincode", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center my-4">
          <button className="btn btn-success px-5 py-2">Save Profile</button>
        </div>

      </form>
    </div>
  );
};

export default StudentProfile;
