import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { addAttendanceAPI } from "../../services/adminAttendanceService";

const AddAttendanceModal = ({ show, onHide, onAttendanceAdded, student }) => {
  const [date, setDate] = useState("");
  const [loginTime, setLoginTime] = useState("");
  const [logoutTime, setLogoutTime] = useState("");

  useEffect(() => {
    if (show) {
      const now = new Date();
      const today = now.toISOString().slice(0, 10);
      const timeNow = now.toTimeString().slice(0, 5); // "HH:mm"

      setDate(today);
      setLoginTime(timeNow);
      setLogoutTime(timeNow);
    }
  }, [show]);

  const handleAddAttendance = async () => {
    if (!student || !student._id) {
      alert("Invalid student information.");
      return;
    }

    if (!date || !loginTime || !logoutTime) {
      alert("Please fill all fields");
      return;
    }

    // Check login should not be after logout
    const loginDateTime = new Date(`${date}T${loginTime}`);
    const logoutDateTime = new Date(`${date}T${logoutTime}`);
    if (loginDateTime > logoutDateTime) {
      alert("Login Time should be before Logout Time.");
      return;
    }

    try {
      await addAttendanceAPI({
        studentId: student._id,
        date,
        loginTime: loginDateTime,
        logoutTime: logoutDateTime,
      });
      alert("✅ Attendance added successfully!");
      onAttendanceAdded();
      onHide();
    } catch (err) {
      console.error("❌ Failed to add attendance:", err);
      alert("Failed to add attendance.");
    }
  };

  if (!student) return null; // prevent crashing if student info missing

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add Attendance</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Student Name */}
        <div className="mb-3">
          <label className="form-label">Student</label>
          <input
            type="text"
            className="form-control"
            value={student.name || "-"}
            disabled
          />
        </div>

        {/* Batch Name */}
        <div className="mb-3">
          <label className="form-label">Batch</label>
          <input
            type="text"
            className="form-control"
            value={student.batchName || "-"}
            disabled
          />
        </div>

        {/* Date */}
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Login Time */}
        <div className="mb-3">
          <label className="form-label">Login Time</label>
          <input
            type="time"
            className="form-control"
            value={loginTime}
            onChange={(e) => setLoginTime(e.target.value)}
            required
          />
        </div>

        {/* Logout Time */}
        <div className="mb-3">
          <label className="form-label">Logout Time</label>
          <input
            type="time"
            className="form-control"
            value={logoutTime}
            onChange={(e) => setLogoutTime(e.target.value)}
            required
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddAttendance}>
          Save Attendance
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAttendanceModal;
