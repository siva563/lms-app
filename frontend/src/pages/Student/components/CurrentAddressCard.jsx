import React from "react";

const CurrentAddressCard = ({ profile, setProfile }) => {
    return (
        <div className="card p-4 shadow-sm mb-4" id="addressDetails">
            {/* Heading */}
            <h4 className="mb-3">🏠 Current Address</h4>

            {/* Info Text */}
            <div className="alert alert-info small">
                Will be shared with companies for further communication, such as sending offer letters, etc. Please provide your complete address.
            </div>

            {/* Fields */}
            <div className="row g-3">
                {/* Address Line 1 */}
                <div className="col-md-6">
                    <label>Address Line 1</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.addressLine1 || ""}
                        onChange={(e) => setProfile({ ...profile, addressLine1: e.target.value })}
                        placeholder="Eg: Kondagunturu Pakalu"
                    />
                </div>

                {/* Address Line 2 */}
                <div className="col-md-6">
                    <label>Address Line 2</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.addressLine2 || ""}
                        onChange={(e) => setProfile({ ...profile, addressLine2: e.target.value })}
                        placeholder="Eg: Rajahmundry"
                    />
                </div>

                {/* Country */}
                <div className="col-md-4">
                    <label>Country</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.country || "India"}
                        readOnly
                    />
                </div>

                {/* Postal / Pin Code */}
                <div className="col-md-4">
                    <label>Postal/Pin Code</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.pincode || ""}
                        onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
                        placeholder="Eg: 533124"
                    />
                </div>

                {/* State */}
                <div className="col-md-4">
                    <label>State</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.state || ""}
                        onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                        placeholder="Eg: Andhra Pradesh"
                    />
                </div>

                {/* District */}
                <div className="col-md-6">
                    <label>District</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.district || ""}
                        onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                        placeholder="Eg: East Godavari"
                    />
                </div>

                {/* City/Town */}
                <div className="col-md-6">
                    <label>City / Town</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.city || ""}
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                        placeholder="Eg: Rajahmundry"
                    />
                </div>
            </div>
        </div>
    );
};

export default CurrentAddressCard;
