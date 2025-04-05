import React from "react";

const ParentGuardianDetailsCard = ({ profile, setProfile }) => {
  return (
    <div className="card p-4 shadow-sm mb-4" id="parentDetails">
      {/* Heading */}
      <h4 className="mb-3">👨‍👩‍👦 Parent/Guardian Details</h4>

      {/* Info Text */}
      <div className="alert alert-info small">
        Parent/Guardian is the one who supports the student during their Intensive journey. <br />
        Eg: Father, Mother, Uncle, etc
      </div>

      {/* Fields */}
      <div className="row g-3">
        {/* First Name */}
        <div className="col-md-4">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            value={profile.parentFirstName || ""}
            onChange={(e) => setProfile({ ...profile, parentFirstName: e.target.value })}
            placeholder="Ex: Ramesh"
          />
        </div>

        {/* Last Name */}
        <div className="col-md-4">
          <label>Surname / Last Name</label>
          <input
            type="text"
            className="form-control"
            value={profile.parentLastName || ""}
            onChange={(e) => setProfile({ ...profile, parentLastName: e.target.value })}
            placeholder="Ex: Tendulkar"
          />
        </div>

        {/* Relation */}
        <div className="col-md-4">
          <label>Relation with the Student</label>
          <select
            className="form-select"
            value={profile.parentRelation || ""}
            onChange={(e) => setProfile({ ...profile, parentRelation: e.target.value })}
          >
            <option value="">Select</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Uncle">Uncle</option>
            <option value="Aunt">Aunt</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ParentGuardianDetailsCard;
