import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { updateAttendanceAPI } from "../../services/adminAttendanceService";

const EditAttendanceModal = ({ show, onHide, record, onAttendanceUpdated }) => {
    const [form, setForm] = useState({
        date: "",
        loginTime: "",
        logoutTime: "",
    });

    // useEffect(() => {
    //     if (record) {
    //         console.log("Edit Record is:" + JSON.stringify(record));
    //         setForm({
    //             date: record.date || "",
    //             loginTime: record.loginTime ? new Date(record.loginTime).toISOString().slice(0, 16) : "",
    //             logoutTime: record.logoutTime ? new Date(record.logoutTime).toISOString().slice(0, 16) : "",
    //         });
    //     }
    // }, [record]);

    useEffect(() => {
        if (record) {
            console.log("Edit Record is:" + JSON.stringify(record));
            // setForm({
            //     date: record.date ? new Date(record.date).toISOString().slice(0, 10) : "",
            //     loginTime: record.loginTime ? new Date(record.loginTime).toISOString().slice(0, 16) : "",
            //     logoutTime: record.logoutTime ? new Date(record.logoutTime).toISOString().slice(0, 16) : "",
            // });
            setForm({
                date: record.date ? record.date.slice(0, 10) : "",
                loginTime: formatDateTimeLocal(record.loginTime),
                logoutTime: formatDateTimeLocal(record.logoutTime),
            });
        }
    }, [record]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const calculateDuration = (loginTime, logoutTime) => {
        if (!loginTime || !logoutTime) return "—";
        const start = new Date(loginTime);
        const end = new Date(logoutTime);
        const diffMs = end - start;
        if (diffMs <= 0) return "—";

        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours}h ${minutes}m`;
    };

    const formatDateTimeLocal = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        const corrected = new Date(date.getTime() - offset * 60000);
        return corrected.toISOString().slice(0, 16); // this gives correct 'yyyy-MM-ddTHH:mm'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.loginTime && form.logoutTime) {
            const login = new Date(form.loginTime);
            const logout = new Date(form.logoutTime);

            if (login >= logout) {
                alert("❌ Login Time must be before Logout Time.");
                return; // 👉 STOP here
            }
        }

        try {
            await updateAttendanceAPI(record._id, form);
            alert("✅ Attendance updated successfully!");
            onAttendanceUpdated();
            onHide();
        } catch (err) {
            console.error("❌ Failed to update attendance:", err);
            alert("Failed to update attendance.");
        }
    };

    if (!record) return null; // 👈 Safely return null if record is not loaded

    return (
        <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Attendance</Modal.Title>
            </Modal.Header>

            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    {/* Student Info */}
                    {/* <div className="mb-3">
                        <label className="form-label">Student Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={record.studentName || "-"}
                            disabled
                        />
                    </div> */}

                    {/* Batch Info */}
                    {/* <div className="mb-3">
                        <label className="form-label">Batch Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={record.batchName || "-"}
                            disabled
                        />
                    </div> */}

                    {/* Date */}
                    <div className="mb-3">
                        <label className="form-label">Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Login Time */}
                    <div className="mb-3">
                        <label className="form-label">Login Time</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            name="loginTime"
                            value={form.loginTime}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Logout Time */}
                    <div className="mb-3">
                        <label className="form-label">Logout Time</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            name="logoutTime"
                            value={form.logoutTime}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Auto-calculated Duration */}
                    <div className="mb-3">
                        <label className="form-label">Total Duration</label>
                        <input
                            type="text"
                            className="form-control"
                            value={calculateDuration(form.loginTime, form.logoutTime)}
                            disabled
                        />
                    </div>

                    {/* Location (Optional) */}
                    {record.location && (
                        <div className="mb-3">
                            <label className="form-label">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                value={`Lat: ${record.location.latitude}, Lng: ${record.location.longitude}`}
                                disabled
                            />
                        </div>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default EditAttendanceModal;
