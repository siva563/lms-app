// import React from "react";
// import { ProgressBar } from "react-bootstrap";

// const StudentBoard = () => {
//     return (
//         <div className="container py-4">
//             <div className="row g-4">
//                 {/* Left Sidebar */}
//                 <div className="col-md-3">
//                     <div className="card shadow-sm mb-4">
//                         <div className="card-body text-center">
//                             <img
//                                 src="https://via.placeholder.com/100"
//                                 alt="Profile"
//                                 className="rounded-circle mb-2"
//                             />
//                             <h5 className="card-title mb-1">👩‍🎓 Siva</h5>
//                             <p className="text-muted mb-1">Full Stack Developer</p>
//                             <hr />
//                             <ul className="nav flex-column text-start">
//                                 <li className="nav-item mb-2">📅 Attendance</li>
//                                 <li className="nav-item mb-2">📘 Courses</li>
//                                 <li className="nav-item mb-2">🧠 Coding Challenges</li>
//                                 <li className="nav-item mb-2">📝 Assignments</li>
//                                 <li className="nav-item mb-2">🎤 Mock Interviews</li>
//                                 <li className="nav-item mb-2">🏆 Rank</li>
//                                 <li className="nav-item mb-2">🔥 Daily Streak</li>
//                                 <li className="nav-item mb-2">🎖️ Badges</li>
//                                 <li className="nav-item mb-2">📅 Calendar</li>
//                                 <li className="nav-item mb-2">👤 Profile</li>
//                                 <li className="nav-item">🚪 Logout</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Main Content */}
//                 <div className="col-md-9">
//                     <div className="row g-3">
//                         {/* Progress Summary Cards */}
//                         <div className="col-md-6">
//                             <div className="card p-3 shadow-sm">
//                                 <h6>📚 Course Progress</h6>
//                                 <ProgressBar now={72} label={`72%`} />
//                             </div>
//                         </div>
//                         <div className="col-md-6">
//                             <div className="card p-3 shadow-sm">
//                                 <h6>📅 Attendance</h6>
//                                 <ProgressBar variant="success" now={85} label={`85%`} />
//                             </div>
//                         </div>
//                         <div className="col-md-4">
//                             <div className="card p-3 shadow-sm text-center">
//                                 <h6>🧠 Coding Challenges</h6>
//                                 <p className="display-6">18/30</p>
//                             </div>
//                         </div>
//                         <div className="col-md-4">
//                             <div className="card p-3 shadow-sm text-center">
//                                 <h6>📝 Assignments</h6>
//                                 <p className="display-6">12/20</p>
//                             </div>
//                         </div>
//                         <div className="col-md-4">
//                             <div className="card p-3 shadow-sm text-center">
//                                 <h6>🎤 Mock Interviews</h6>
//                                 <p className="display-6">3</p>
//                             </div>
//                         </div>

//                         {/* Rank & Streak */}
//                         <div className="col-md-6">
//                             <div className="card p-3 shadow-sm">
//                                 <h6>🏆 Rank</h6>
//                                 <p className="mb-0">Batch Rank: <strong>#4</strong></p>
//                                 <p>Overall Rank: <strong>#12</strong></p>
//                             </div>
//                         </div>
//                         <div className="col-md-6">
//                             <div className="card p-3 shadow-sm">
//                                 <h6>🔥 Daily Streak</h6>
//                                 <p className="display-6 text-center">7 Days</p>
//                             </div>
//                         </div>

//                         {/* Badges and Calendar */}
//                         <div className="col-md-6">
//                             <div className="card p-3 shadow-sm">
//                                 <h6>🎖️ Badges</h6>
//                                 <div className="d-flex flex-wrap gap-2">
//                                     <span className="badge bg-primary">JS Master</span>
//                                     <span className="badge bg-warning text-dark">React Pro</span>
//                                     <span className="badge bg-success">Quiz Champ</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-md-6">
//                             <div className="card p-3 shadow-sm">
//                                 <h6>📅 Calendar</h6>
//                                 <p className="text-muted small">Coming soon...</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StudentBoard;
// import React from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// import "bootstrap-icons/font/bootstrap-icons.css";

// const StudentBoard = () => {
//   return (
//     <div className="d-flex min-vh-100">
//       {/* Sidebar */}
//       <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
//         <h4 className="text-center mb-4">CodeBegun</h4>
//         <ul className="nav flex-column gap-2">
//           <li className="nav-item">
//             <Link className="nav-link text-white" to="/student/dashboard">
//               <i className="bi bi-speedometer2 me-2"></i> Dashboard
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link text-white" to="/student/subjects">
//               <i className="bi bi-book-half me-2"></i> Subjects
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link text-white" to="/student/assignments">
//               <i className="bi bi-journal-check me-2"></i> Assignments
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link text-white" to="/student/coding">
//               <i className="bi bi-terminal me-2"></i> Coding Challenges
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link text-white" to="/student/interviews">
//               <i className="bi bi-people me-2"></i> Interviews
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link text-white" to="/student/badges">
//               <i className="bi bi-award me-2"></i> Badges
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link text-white" to="/student/calendar">
//               <i className="bi bi-calendar-event me-2"></i> Calendar
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link text-white" to="/student/profile">
//               <i className="bi bi-person-circle me-2"></i> Profile
//             </Link>
//           </li>
//           <li className="nav-item mt-3">
//             <Link className="nav-link text-danger" to="/logout">
//               <i className="bi bi-box-arrow-right me-2"></i> Logout
//             </Link>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow-1 p-4">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2 className="fw-bold">Welcome, Student 👋</h2>
//           <div className="d-flex align-items-center gap-3">
//             <i className="bi bi-bell fs-5"></i>
//             <img
//               src="https://via.placeholder.com/40"
//               alt="Profile"
//               className="rounded-circle"
//             />
//           </div>
//         </div>

//         <div className="row g-4">
//           <div className="col-md-4">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <h6>Attendance</h6>
//                 <p className="text-muted">90% Present</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <h6>Course Progress</h6>
//                 <p className="text-muted">70% Completed</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <h6>Assignments</h6>
//                 <p className="text-muted">5 Pending</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="row g-4 mt-2">
//           <div className="col-md-4">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <h6>Coding Challenges</h6>
//                 <p className="text-muted">15 Solved</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <h6>Mock Interviews</h6>
//                 <p className="text-muted">2 Scheduled</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <h6>Rank & Badges</h6>
//                 <p className="text-muted">Top 5% 💎</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="row g-4 mt-2">
//           <div className="col-md-6">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <h6>Daily Streak</h6>
//                 <p className="text-muted">🔥 12 Days Active</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <h6>Upcoming Calendar</h6>
//                 <p className="text-muted">Next: JS Quiz @ 4PM</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentBoard;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

// const StudentBoard = () => {
//     const [sidebarOpen, setSidebarOpen] = useState(true);

//     return (
//         <div className="d-flex min-vh-100">
//             {/* Sidebar */}
//             <div
//                 className={`bg-primary text-white p-3 d-flex flex-column justify-content-between ${sidebarOpen ? "" : "collapsed"}`}
//                 style={{ width: sidebarOpen ? "250px" : "70px", transition: "0.3s" }}
//             >
//                 <div>
//                     <div className="d-flex justify-content-between align-items-center mb-4">
//                         <h4 className="mb-0">{sidebarOpen ? "CodeBegun" : "CB"}</h4>
//                         <button
//                             className="btn btn-sm btn-outline-light"
//                             onClick={() => setSidebarOpen(!sidebarOpen)}
//                         >
//                             <i className="bi bi-list"></i>
//                         </button>
//                     </div>

//                     <ul className="nav flex-column gap-2">
//                         <li className="nav-item">
//                             <Link className="nav-link text-white" to="/student/dashboard">
//                                 <i className="bi bi-speedometer2 me-2"></i>
//                                 {sidebarOpen && "Dashboard"}
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link text-white" to="/student/subjects">
//                                 <i className="bi bi-book-half me-2"></i>
//                                 {sidebarOpen && "Subjects"}
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link text-white" to="/student/assignments">
//                                 <i className="bi bi-journal-check me-2"></i>
//                                 {sidebarOpen && "Assignments"}
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link text-white" to="/student/coding">
//                                 <i className="bi bi-terminal me-2"></i>
//                                 {sidebarOpen && "Coding Challenges"}
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link text-white" to="/student/interviews">
//                                 <i className="bi bi-people me-2"></i>
//                                 {sidebarOpen && "Interviews"}
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link text-white" to="/student/badges">
//                                 <i className="bi bi-award me-2"></i>
//                                 {sidebarOpen && "Badges"}
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link text-white" to="/student/calendar">
//                                 <i className="bi bi-calendar-event me-2"></i>
//                                 {sidebarOpen && "Calendar"}
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>

//                 <div className="dropdown">
//                     <a
//                         className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
//                         href="#"
//                         role="button"
//                         id="dropdownUser"
//                         data-bs-toggle="dropdown"
//                         aria-expanded="false"
//                     >
//                         <img
//                             src="https://via.placeholder.com/40"
//                             alt="Profile"
//                             className="rounded-circle me-2"
//                             width="40"
//                             height="40"
//                         />
//                         {sidebarOpen && <strong>Student</strong>}
//                     </a>
//                     <ul className="dropdown-menu dropdown-menu-end text-small shadow" aria-labelledby="dropdownUser">
//                         <li>
//                             <Link className="dropdown-item" to="/student/profile">Profile</Link>
//                         </li>
//                         <li>
//                             <hr className="dropdown-divider" />
//                         </li>
//                         <li>
//                             <Link className="dropdown-item text-danger" to="/logout">Logout</Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-grow-1">
//                 <nav className="navbar navbar-light" style={{ backgroundColor: "#f2f5fa" }}>
//                     <div className="container-fluid">
//                         <span className="navbar-brand fw-bold">Student Dashboard</span>
//                     </div>
//                 </nav>

//                 <div className="p-4">
//                     <div className="row g-4">
//                         <div className="col-md-4">
//                             <div className="card shadow-sm">
//                                 <div className="card-body">
//                                     <h6>Attendance</h6>
//                                     <p className="text-muted">90% Present</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-md-4">
//                             <div className="card shadow-sm">
//                                 <div className="card-body">
//                                     <h6>Course Progress</h6>
//                                     <p className="text-muted">70% Completed</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-md-4">
//                             <div className="card shadow-sm">
//                                 <div className="card-body">
//                                     <h6>Assignments</h6>
//                                     <p className="text-muted">5 Pending</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="col-md-4">
//                             <div className="card shadow-sm">
//                                 <div className="card-body">
//                                     <h6>Coding Challenges</h6>
//                                     <p className="text-muted">15 Solved</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-md-4">
//                             <div className="card shadow-sm">
//                                 <div className="card-body">
//                                     <h6>Mock Interviews</h6>
//                                     <p className="text-muted">2 Scheduled</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-md-4">
//                             <div className="card shadow-sm">
//                                 <div className="card-body">
//                                     <h6>Rank & Badges</h6>
//                                     <p className="text-muted">Top 5% 💎</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="col-md-6">
//                             <div className="card shadow-sm">
//                                 <div className="card-body">
//                                     <h6>Daily Streak</h6>
//                                     <p className="text-muted">🔥 12 Days Active</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-md-6">
//                             <div className="card shadow-sm">
//                                 <div className="card-body">
//                                     <h6>Upcoming Calendar</h6>
//                                     <p className="text-muted">Next: JS Quiz @ 4PM</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StudentBoard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const StudentBoard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`bg-success text-white d-flex flex-column p-3 ${collapsed ? "collapsed-sidebar" : ""}`}
        style={{ minHeight: "100vh", width: collapsed ? "80px" : "250px", transition: "0.3s" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          {!collapsed && <h4 className="m-0">CodeBegun</h4>}
          <i
            className={`bi ${collapsed ? "bi-arrow-bar-right" : "bi-arrow-bar-left"} cursor-pointer`}
            onClick={toggleSidebar}
            role="button"
          ></i>
        </div>

        <ul className="nav nav-pills flex-column gap-2">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/student/dashboard">
              <i className="bi bi-speedometer2 me-2"></i> {!collapsed && "Dashboard"}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/student/subjects">
              <i className="bi bi-book-half me-2"></i> {!collapsed && "Subjects"}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/student/assignments">
              <i className="bi bi-journal-check me-2"></i> {!collapsed && "Assignments"}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/student/coding">
              <i className="bi bi-terminal me-2"></i> {!collapsed && "Coding Challenges"}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/student/interviews">
              <i className="bi bi-people me-2"></i> {!collapsed && "Interviews"}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/student/badges">
              <i className="bi bi-award me-2"></i> {!collapsed && "Badges"}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/student/calendar">
              <i className="bi bi-calendar-event me-2"></i> {!collapsed && "Calendar"}
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Navbar */}
        <div
          className="d-flex justify-content-between align-items-center px-4 py-3 shadow"
          style={{ background: "#f5f7fa" }}
        >
          <h4 className="fw-bold m-0">Welcome, Student 👋</h4>

          <div className="dropdown">
            <img
              src="../../assets/Profile_40x40.png"
              className="rounded-circle"
              alt="Profile"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            />
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/student/profile">
                  <i className="bi bi-person me-2"></i> Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item text-danger" to="/logout">
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6>Attendance</h6>
                  <p className="text-muted">90% Present</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6>Course Progress</h6>
                  <p className="text-muted">70% Completed</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6>Assignments</h6>
                  <p className="text-muted">5 Pending</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-2">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6>Coding Challenges</h6>
                  <p className="text-muted">15 Solved</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6>Mock Interviews</h6>
                  <p className="text-muted">2 Scheduled</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6>Rank & Badges</h6>
                  <p className="text-muted">Top 5% 💎</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-2">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6>Daily Streak</h6>
                  <p className="text-muted">🔥 12 Days Active</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6>Upcoming Calendar</h6>
                  <p className="text-muted">Next: JS Quiz @ 4PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentBoard;
