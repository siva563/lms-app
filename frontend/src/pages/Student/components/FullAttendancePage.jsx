// // import React, { useEffect, useState } from "react";
// // import { format } from "date-fns";
// // import { fetchFullAttendance } from "../../../services/attendanceService";
// // import { da } from "date-fns/locale";

// // const FullAttendancePage = () => {
// //   const [attendance, setAttendance] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

// //   useEffect(() => {
// //     const fetchAttendance = async () => {
// //       setLoading(true);
// //       try {
// //         const data = await fetchFullAttendance(month);
// //         console.log("data is:" + JSON.stringify(data));
// //         setAttendance(data);
// //       } catch (err) {
// //         console.error("Failed to fetch attendance:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchAttendance();
// //   }, [month]);

// //   const getStatus = (loginTime) => {
// //     if (!loginTime) return "Leave";
// //     const threshold = new Date("1970-01-01T09:30:00");
// //     const login = new Date(`1970-01-01T${loginTime}`);
// //     return login > threshold ? "Late" : "On-Time";
// //   };

// //   const formatTime = (timeStr) => {
// //     // return timeStr ? new Date(`1970-01-01T${timeStr}`).toLocaleTimeString() : "—";
// //     return timeStr ? new Date(timeStr).toLocaleTimeString() : "—";
// //   };

// //   const getDurationFromTimes = (login, logout) => {
// //     if (!login || !logout) return "—";
// //     const diff = new Date(logout) - new Date(login);
// //     const mins = Math.floor(diff / 60000);
// //     const h = Math.floor(mins / 60);
// //     const m = mins % 60;
// //     return `${h}h ${m}m`;
// //   };

// //   const formatDuration = (durationMinutes) => {
// //     if (!durationMinutes) return "—";
// //     const h = Math.floor(durationMinutes / 60);
// //     const m = durationMinutes % 60;
// //     return `${h}h ${m}m`;
// //   };

// //   return (
// //     <div className="container py-4">
// //       <h3 className="mb-4">📅 Attendance History</h3>

// //       <div className="mb-3">
// //         <label>Select Month:</label>
// //         <input
// //           type="month"
// //           value={month}
// //           onChange={(e) => setMonth(e.target.value)}
// //           className="form-control w-auto"
// //         />
// //       </div>

// //       {loading ? (
// //         <div className="alert alert-info">Loading attendance...</div>
// //       ) : attendance.length === 0 ? (
// //         <div className="alert alert-warning">No attendance records found.</div>
// //       ) : (
// //         <div className="table-responsive">
// //           <table className="table table-bordered table-hover" style={{ backgroundColor: "#fff" }}>
// //             <thead className="table-light">
// //               <tr>
// //                 <th>Date</th>
// //                 <th>In-Time</th>
// //                 <th>Out-Time</th>
// //                 <th>Time Inside</th>
// //                 <th>Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {attendance.map((item, idx) => (
// //                 <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#fff" }}>
// //                   <td>{format(new Date(item.date), "EEE, d MMM yyyy")}</td>
// //                   <td>{new Date(item.loginTime).toLocaleTimeString()}</td>
// //                   <td>{formatTime(item.logoutTime)}</td>
// //                   <td>{getDurationFromTimes(item.loginTime, item.logoutTime)}</td>
// //                   <td>
// //                     <span
// //                       className={`badge bg-${getStatus(item.loginTime) === "Late" ? "warning" : getStatus(item.loginTime) === "Leave" ? "secondary" : "success"}`}
// //                     >
// //                       {getStatus(item.loginTime)}
// //                     </span>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default FullAttendancePage;
// import React, { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { fetchFullAttendance } from "../../../services/attendanceService";

// const FullAttendancePage = () => {
//   const [attendance, setAttendance] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("7days");
//   const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       setLoading(true);
//       try {
//         let fromDate, toDate;
//         const today = new Date();

//         if (filter === "7days") {
//           fromDate = new Date(today);
//           fromDate.setDate(today.getDate() - 6);
//           toDate = today;
//         } else if (filter === "30days") {
//           fromDate = new Date(today);
//           fromDate.setDate(today.getDate() - 29);
//           toDate = today;
//         } else if (filter === "month") {
//           fromDate = new Date(`${month}-01`);
//           toDate = new Date(fromDate);
//           toDate.setMonth(toDate.getMonth() + 1);
//         } else if (filter === "range") {
//           if (!from || !to) return;
//           fromDate = new Date(from);
//           toDate = new Date(to);
//         }

//         const fromStr = fromDate.toISOString().slice(0, 10);
//         const toStr = toDate.toISOString().slice(0, 10);

//         const data = await fetchFullAttendance(fromStr, toStr);
//         setAttendance(data);
//       } catch (err) {
//         console.error("Failed to fetch attendance:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttendance();
//   }, [filter, month, from, to]);

//   const getStatus = (loginTime) => {
//     if (!loginTime) return "Leave";
//     const threshold = new Date("1970-01-01T09:30:00");
//     const login = new Date(`1970-01-01T${new Date(loginTime).toTimeString().slice(0, 8)}`);
//     return login > threshold ? "Late" : "On-Time";
//   };

//   const formatTime = (timeStr) => {
//     return timeStr ? new Date(timeStr).toLocaleTimeString() : "—";
//   };

//   const getDurationFromTimes = (login, logout) => {
//     if (!login || !logout) return "—";
//     const diff = new Date(logout) - new Date(login);
//     const mins = Math.floor(diff / 60000);
//     const h = Math.floor(mins / 60);
//     const m = mins % 60;
//     return `${h}h ${m}m`;
//   };

//   return (
//     <div className="container py-4">
//       <h3 className="mb-4">📅 Attendance History</h3>

//       <div className="d-flex justify-content-between align-items-center mb-2">
//         {filter === "month" && (
//           <input
//             type="month"
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//             className="form-control w-auto"
//           />
//         )}
//         {filter === "range" && (
//           <div className="d-flex gap-2">
//             <input
//               type="date"
//               value={from}
//               onChange={(e) => setFrom(e.target.value)}
//               className="form-control"
//             />
//             <input
//               type="date"
//               value={to}
//               onChange={(e) => setTo(e.target.value)}
//               className="form-control"
//             />
//           </div>
//         )}

//         <div className="btn-group btn-group-sm ms-auto" role="group">
//           <button className={`btn btn-outline-secondary ${filter === "7days" ? "active" : ""}`} onClick={() => setFilter("7days")}>7 Days</button>
//           <button className={`btn btn-outline-secondary ${filter === "30days" ? "active" : ""}`} onClick={() => setFilter("30days")}>30 Days</button>
//           <button className={`btn btn-outline-secondary ${filter === "month" ? "active" : ""}`} onClick={() => setFilter("month")}>Month</button>
//           <button className={`btn btn-outline-secondary ${filter === "range" ? "active" : ""}`} onClick={() => setFilter("range")}>Custom</button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="alert alert-info">Loading attendance...</div>
//       ) : attendance.length === 0 ? (
//         <div className="alert alert-warning">No attendance records found.</div>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover" style={{ backgroundColor: "#fff" }}>
//             <thead className="table-light">
//               <tr>
//                 <th>Date</th>
//                 <th>In-Time</th>
//                 <th>Out-Time</th>
//                 <th>Time Inside</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendance.map((item, idx) => (
//                 <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#fff" }}>
//                   <td>{format(new Date(item.date), "EEE, d MMM yyyy")}</td>
//                   <td>{formatTime(item.loginTime)}</td>
//                   <td>{formatTime(item.logoutTime)}</td>
//                   <td>{getDurationFromTimes(item.loginTime, item.logoutTime)}</td>
//                   {/* <td>
//                     <span
//                       className={`badge bg-${getStatus(item.loginTime) === "Late" ? "warning" : getStatus(item.loginTime) === "Leave" ? "secondary" : "success"}`}
//                     >
//                       {getStatus(item.loginTime)}
//                     </span>
//                   </td> */}
//                   <td>
//                     <span className={`badge bg-${item.status === "Late" ? "warning" : item.status === "Leave" ? "secondary" : "success"}`}>
//                       {item.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FullAttendancePage;

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { fetchFullAttendance } from "../../../services/attendanceService";

const FullAttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("7days");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [lateDays, setLateDays] = useState(0);
  const [presentDays, setPresentDays] = useState(0);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        let fromDate, toDate;
        const today = new Date();

        if (filter === "7days") {
          fromDate = new Date(today);
          fromDate.setDate(today.getDate() - 6);
          toDate = today;
        } else if (filter === "30days") {
          fromDate = new Date(today);
          fromDate.setDate(today.getDate() - 29);
          toDate = today;
        } else if (filter === "month") {
          fromDate = new Date(`${month}-01`);
          toDate = new Date(fromDate);
          toDate.setMonth(toDate.getMonth() + 1);
        } else if (filter === "range") {
          if (!from || !to) return;
          fromDate = new Date(from);
          toDate = new Date(to);
        }

        const fromStr = fromDate.toISOString().slice(0, 10);
        const toStr = toDate.toISOString().slice(0, 10);

        const data = await fetchFullAttendance(fromStr, toStr);
        setAttendance(data.records || []);
        setLateDays(data.lateDaysCount || 0);
        setPresentDays(data.records?.filter((r) => r.loginTime).length || 0);
      } catch (err) {
        console.error("Failed to fetch attendance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [filter, month, from, to]);

  const formatTime = (timeStr) => {
    return timeStr ? new Date(timeStr).toLocaleTimeString() : "—";
  };

  const getDurationFromTimes = (login, logout) => {
    if (!login || !logout) return "—";
    const diff = new Date(logout) - new Date(login);
    const mins = Math.floor(diff / 60000);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">📅 Attendance History</h3>

      <div className="d-flex justify-content-between align-items-center mb-2">
        {filter === "month" && (
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="form-control w-auto"
          />
        )}
        {filter === "range" && (
          <div className="d-flex gap-2">
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="form-control"
            />
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="form-control"
            />
          </div>
        )}

        <div className="btn-group btn-group-sm ms-auto" role="group">
          <button className={`btn btn-outline-secondary ${filter === "7days" ? "active" : ""}`} onClick={() => setFilter("7days")}>7 Days</button>
          <button className={`btn btn-outline-secondary ${filter === "30days" ? "active" : ""}`} onClick={() => setFilter("30days")}>30 Days</button>
          <button className={`btn btn-outline-secondary ${filter === "month" ? "active" : ""}`} onClick={() => setFilter("month")}>Month</button>
          <button className={`btn btn-outline-secondary ${filter === "range" ? "active" : ""}`} onClick={() => setFilter("range")}>Custom</button>
        </div>
      </div>

      <div className="mb-3 d-flex gap-3">
        <span className="badge bg-warning text-dark">
          🕒 Total Late Days: {lateDays}
        </span>
        <span className="badge bg-success">
          ✅ Total Days Present: {presentDays}
        </span>
      </div>

      {loading ? (
        <div className="alert alert-info">Loading attendance...</div>
      ) : attendance.length === 0 ? (
        <div className="alert alert-warning">No attendance records found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover" style={{ backgroundColor: "#fff" }}>
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>In-Time</th>
                <th>Out-Time</th>
                <th>Time Inside</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((item, idx) => (
                <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                  <td>{format(new Date(item.date), "EEE, d MMM yyyy")}</td>
                  <td>{formatTime(item.loginTime)}</td>
                  <td>{formatTime(item.logoutTime)}</td>
                  <td>{getDurationFromTimes(item.loginTime, item.logoutTime)}</td>
                  <td>
                    <span className={`badge bg-${item.status === "Late" ? "warning" : item.status === "Leave" ? "secondary" : "success"}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FullAttendancePage;