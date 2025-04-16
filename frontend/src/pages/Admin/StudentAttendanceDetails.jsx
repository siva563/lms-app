// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { fetchStudentWiseAttendance } from "../../services/adminAttendanceService";
// // import AddAttendanceModal from "./AddAttendanceModal";
// // import EditAttendanceModal from "./EditAttendanceModal";

// // const StudentAttendanceDetails = () => {
// //   const { studentId } = useParams();
// //   const navigate = useNavigate();

// //   const [attendanceList, setAttendanceList] = useState([]);
// //   const [studentInfo, setStudentInfo] = useState(null); // 🛑 Start as null
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [showEditModal, setShowEditModal] = useState(false);
// //   const [editRecord, setEditRecord] = useState(null);

// //   useEffect(() => {
// //     if (studentId) {
// //       loadAttendance();
// //     }
// //   }, [studentId]);

// //   const loadAttendance = async () => {
// //     const today = new Date();
// //     const from = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10);
// //     const to = today.toISOString().slice(0, 10);

// //     try {
// //       const { records = [], student = null } = await fetchStudentWiseAttendance({ studentId, from, to });
// //       setAttendanceList(records);
// //       setStudentInfo(student);
// //     } catch (err) {
// //       console.error("❌ Failed to load student attendance:", err);
// //     }
// //   };

// //   const calculateDuration = (loginTime, logoutTime) => {
// //     if (!loginTime || !logoutTime) return "-";
// //     const start = new Date(loginTime);
// //     const end = new Date(logoutTime);
// //     const diffMs = end - start;
// //     if (diffMs <= 0) return "-";

// //     const hours = Math.floor(diffMs / (1000 * 60 * 60));
// //     const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
// //     return `${hours}h ${minutes}m`;
// //   };

// //   const formatDate = (isoDate) => {
// //     if (!isoDate) return "-";
// //     const options = { day: '2-digit', month: 'short', year: 'numeric' };
// //     return new Date(isoDate).toLocaleDateString('en-GB', options).replace(/ /g, '-');
// //   };

// //   if (!studentInfo) {
// //     return <div className="container py-4">Loading student info...</div>;
// //   }

// //   return (
// //     <div className="container py-4">
// //       {/* Top Buttons */}
// //       <div className="d-flex justify-content-between align-items-center mb-3">
// //         <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
// //           ← Back
// //         </button>

// //         <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
// //           ➕ Add Attendance
// //         </button>
// //       </div>

// //       {/* Student Details */}
// //       <div className="card p-3 mb-4 shadow-sm">
// //         <h4>{studentInfo.name || "Student Name"}</h4>
// //         <p className="text-muted">{studentInfo.batchName || "Batch Info"}</p>
// //       </div>

// //       {/* Attendance Table */}
// //       <div className="table-responsive">
// //         <table className="table table-bordered table-hover">
// //           <thead className="table-light">
// //             <tr>
// //               <th>Date</th>
// //               <th>Login Time</th>
// //               <th>Logout Time</th>
// //               <th>Duration</th>
// //               <th>Status</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {attendanceList.length === 0 ? (
// //               <tr>
// //                 <td colSpan="6" className="text-center text-muted">
// //                   No attendance records found.
// //                 </td>
// //               </tr>
// //             ) : (
// //               attendanceList.map((att) => (
// //                 <tr key={att._id}>
// //                   <td>{formatDate(att.date)}</td>
// //                   <td>{att.loginTime ? new Date(att.loginTime).toLocaleTimeString() : "-"}</td>
// //                   <td>{att.logoutTime ? new Date(att.logoutTime).toLocaleTimeString() : "-"}</td>
// //                   <td>{calculateDuration(att.loginTime, att.logoutTime)}</td>
// //                   <td>{att.status || "-"}</td>
// //                   <td>
// //                     <button
// //                       className="btn btn-sm btn-outline-primary"
// //                       onClick={() => {
// //                         setEditRecord(att);
// //                         setShowEditModal(true);
// //                       }}
// //                     >
// //                       ✏️ Edit
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Modals */}
// //       <AddAttendanceModal
// //         show={showAddModal}
// //         onHide={() => setShowAddModal(false)}
// //         onAttendanceAdded={loadAttendance}
// //         student={studentInfo} // 🛑 Pass the student info here
// //       />
// //       <EditAttendanceModal
// //         show={showEditModal}
// //         onHide={() => setShowEditModal(false)}
// //         record={editRecord}
// //         onAttendanceUpdated={loadAttendance}
// //       />
// //     </div>
// //   );
// // };

// // export default StudentAttendanceDetails;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchStudentWiseAttendance } from "../../services/adminAttendanceService";
// import AddAttendanceModal from "./AddAttendanceModal";
// import EditAttendanceModal from "./EditAttendanceModal";

// const StudentAttendanceDetails = ({ isStudent = false }) => {
//   const { studentId: routeStudentId } = useParams();
//   const navigate = useNavigate();

//   const [attendanceList, setAttendanceList] = useState([]);
//   const [studentInfo, setStudentInfo] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editRecord, setEditRecord] = useState(null);

//   useEffect(() => {
//     if (isStudent || routeStudentId) {
//       loadAttendance();
//     }
//   }, [isStudent, routeStudentId]);

//   const loadAttendance = async () => {
//     try {
//       const today = new Date();
//       const from = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10);
//       const to = today.toISOString().slice(0, 10);

//       // if it's student page, get studentId from token else from params
//       const studentId = isStudent ? JSON.parse(localStorage.getItem("user"))?._id : routeStudentId;
//       if (!studentId) {
//         console.error("❌ No studentId found!");
//         return;
//       }

//       const { records = [], student = null } = await fetchStudentWiseAttendance({ studentId, from, to });
//       setAttendanceList(records);
//       setStudentInfo(student);
//     } catch (err) {
//       console.error("❌ Failed to load attendance:", err);
//     }
//   };

//   const calculateDuration = (loginTime, logoutTime) => {
//     if (!loginTime || !logoutTime) return "-";
//     const start = new Date(loginTime);
//     const end = new Date(logoutTime);
//     const diffMs = end - start;
//     if (diffMs <= 0) return "-";

//     const hours = Math.floor(diffMs / (1000 * 60 * 60));
//     const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
//     return `${hours}h ${minutes}m`;
//   };

//   const formatDate = (isoDate) => {
//     if (!isoDate) return "-";
//     const options = { day: "2-digit", month: "short", year: "numeric" };
//     return new Date(isoDate).toLocaleDateString("en-GB", options).replace(/ /g, "-");
//   };

//   if (!studentInfo) {
//     return <div className="container py-4">Loading student info...</div>;
//   }

//   return (
//     <div className="container py-4">
//       {/* Top Bar */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         {!isStudent && (
//           <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
//             ← Back
//           </button>
//         )}
//         {!isStudent && (
//           <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
//             ➕ Add Attendance
//           </button>
//         )}
//       </div>

//       {/* Student Details */}
//       <div className="card p-3 mb-4 shadow-sm">
//         <h4>{studentInfo?.name || "Student Name"}</h4>
//         <p className="text-muted">{studentInfo?.batchName || "Batch Info"}</p>
//       </div>

//       {/* Attendance Table */}
//       <div className="table-responsive">
//         <table className="table table-bordered table-hover">
//           <thead className="table-light">
//             <tr>
//               <th>Date</th>
//               <th>Login Time</th>
//               <th>Logout Time</th>
//               <th>Duration</th>
//               <th>Status</th>
//               {!isStudent && <th>Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceList.length === 0 ? (
//               <tr>
//                 <td colSpan={isStudent ? 5 : 6} className="text-center text-muted">
//                   No attendance records found.
//                 </td>
//               </tr>
//             ) : (
//               attendanceList.map((att) => (
//                 <tr key={att._id}>
//                   <td>{formatDate(att.date)}</td>
//                   <td>{att.loginTime ? new Date(att.loginTime).toLocaleTimeString() : "-"}</td>
//                   <td>{att.logoutTime ? new Date(att.logoutTime).toLocaleTimeString() : "-"}</td>
//                   <td>{calculateDuration(att.loginTime, att.logoutTime)}</td>
//                   <td>{att.status || "-"}</td>
//                   {!isStudent && (
//                     <td>
//                       <button
//                         className="btn btn-sm btn-outline-primary"
//                         onClick={() => {
//                           setEditRecord(att);
//                           setShowEditModal(true);
//                         }}
//                       >
//                         ✏️ Edit
//                       </button>
//                     </td>
//                   )}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modals */}
//       {!isStudent && (
//         <>
//           <AddAttendanceModal
//             show={showAddModal}
//             onHide={() => setShowAddModal(false)}
//             onAttendanceAdded={loadAttendance}
//             student={studentInfo}
//           />
//           <EditAttendanceModal
//             show={showEditModal}
//             onHide={() => setShowEditModal(false)}
//             record={editRecord}
//             onAttendanceUpdated={loadAttendance}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default StudentAttendanceDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStudentWiseAttendance } from "../../services/adminAttendanceService";
import { fetchStudentProfile } from "../../services/studentService"; // ✅

import AddAttendanceModal from "./AddAttendanceModal";
import EditAttendanceModal from "./EditAttendanceModal";

const StudentAttendanceDetails = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [attendanceList, setAttendanceList] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [myProfile, setMyProfile] = useState(null); // ✅ who is logged in

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    if (studentId) {
      loadAttendance();
      loadMyProfile(); // ✅ load current logged-in profile
    }
  }, [studentId]);

  const loadAttendance = async () => {
    const today = new Date();
    const from = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10);
    const to = today.toISOString().slice(0, 10);

    try {
      const { records = [], student = null } = await fetchStudentWiseAttendance({ studentId, from, to });
      setAttendanceList(records);
      setStudentInfo(student);
    } catch (err) {
      console.error("❌ Failed to load student attendance:", err);
    }
  };

  const loadMyProfile = async () => {
    try {
      const res = await fetchStudentProfile();
      setMyProfile(res);
    } catch (err) {
      console.error("❌ Failed to load my profile:", err);
    }
  };

  const calculateDuration = (loginTime, logoutTime) => {
    if (!loginTime || !logoutTime) return "-";
    const start = new Date(loginTime);
    const end = new Date(logoutTime);
    const diffMs = end - start;
    if (diffMs <= 0) return "-";

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "-";
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(isoDate).toLocaleDateString('en-GB', options).replace(/ /g, '-');
  };

  if (!studentInfo || !myProfile) {
    return <div className="container py-4">Loading student info...</div>;
  }

  const isAdmin = myProfile.role === "admin" || myProfile.role === "superadmin"; // ✅ only admin can add/edit

  return (
    <div className="container py-4">

      {/* Top buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* Only Admin can see ➕ Add Attendance button */}
        {isAdmin && (
          <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
            ➕ Add Attendance
          </button>
        )}
      </div>

      {/* Student Info Card */}
      <div className="card p-3 mb-4 shadow-sm">
        <h4>{studentInfo.name || "Student Name"}</h4>
        <p className="text-muted">{studentInfo.batchName || "Batch Info"}</p>
      </div>

      {/* Attendance Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Login Time</th>
              <th>Logout Time</th>
              <th>Duration</th>
              <th>Status</th>
              {/* Only Admin can see Actions column */}
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {attendanceList.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? "6" : "5"} className="text-center text-muted">
                  No attendance records found.
                </td>
              </tr>
            ) : (
              attendanceList.map((att) => (
                <tr key={att._id}>
                  <td>{formatDate(att.date)}</td>
                  <td>{att.loginTime ? new Date(att.loginTime).toLocaleTimeString() : "-"}</td>
                  <td>{att.logoutTime ? new Date(att.logoutTime).toLocaleTimeString() : "-"}</td>
                  <td>{calculateDuration(att.loginTime, att.logoutTime)}</td>
                  <td>{att.status || "-"}</td>
                  {/* Only Admin can see ✏️ Edit button */}
                  {isAdmin && (
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                          setEditRecord(att);
                          setShowEditModal(true);
                        }}
                      >
                        ✏️ Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddAttendanceModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAttendanceAdded={loadAttendance}
        student={studentInfo}
      />
      <EditAttendanceModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        record={editRecord}
        onAttendanceUpdated={loadAttendance}
      />
    </div>
  );
};

export default StudentAttendanceDetails;
