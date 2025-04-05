import React from "react";

const ContactDetailsCard = ({ profile, setProfile }) => {
  return (
    <div className="card p-4 shadow-sm mb-4" id="contactDetails">
      {/* Heading */}
      <h4 className="mb-3">📞 Contact Details</h4>

      {/* Fields */}
      <div className="row g-3">
        {/* Mobile Number */}
        <div className="col-md-4">
          <label>Mobile Number</label>
          <input
            type="text"
            className="form-control"
            value={profile.mobile || ""}
            disabled // Mobile Number is non-editable
          />
        </div>

        {/* WhatsApp Number */}
        <div className="col-md-4">
          <label>WhatsApp Number</label>
          <input
            type="text"
            className="form-control"
            value={profile.whatsappNumber || ""}
            onChange={(e) => setProfile({ ...profile, whatsappNumber: e.target.value })}
            placeholder="Enter your WhatsApp number"
          />
        </div>

        {/* Email ID */}
        <div className="col-md-4">
          <label>Email ID</label>
          <input
            type="email"
            className="form-control"
            value={profile.email || ""}
            disabled // Email ID is non-editable
          />
        </div>

        {/* Communication Preference */}
        <div className="col-12 mt-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={profile.communicationConsent || false}
              onChange={(e) => setProfile({ ...profile, communicationConsent: e.target.checked })}
              id="communicationConsent"
            />
            <label className="form-check-label" htmlFor="communicationConsent">
              I would like to receive future communications
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsCard;
