import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const StudentLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setCollapsed(!collapsed);

    const navItems = [
        { icon: "bi-speedometer2", label: "Dashboard", path: "/student/dashboard" },
        { icon: "bi-book-half", label: "Subjects", path: "/student/subjects" },
        { icon: "bi-journal-check", label: "Assignments", path: "/student/assignments" },
        { icon: "bi-terminal", label: "Coding Challenges", path: "/student/coding" },
        { icon: "bi-people", label: "Interviews", path: "/student/interviews" },
        { icon: "bi-award", label: "Badges", path: "/student/badges" },
        { icon: "bi-calendar-event", label: "Calendar", path: "/student/calendar" },
    ];

    return (
        <div className="d-flex">
            {/* Sidebar */}
            {/* <div
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
                    {navItems.map(({ icon, label, path }) => (
                        <li className="nav-item" key={label}>
                            <Link
                                className={`nav-link text-white ${location.pathname === path ? "active bg-dark" : ""}`}
                                to={path}
                            >
                                <i className={`bi ${icon} me-2`}></i> {!collapsed && label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div> */}

            <div
                className={`bg-success text-white d-flex flex-column p-3 position-sticky`}
                style={{
                    top: 0,
                    height: "100vh",
                    width: collapsed ? "80px" : "250px",
                    transition: "0.3s",
                    overflowY: "auto",
                    zIndex: 1030
                }}
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
                    {navItems.map(({ icon, label, path }) => (
                        <li className="nav-item" key={label}>
                            <Link
                                className={`nav-link text-white ${location.pathname === path ? "active bg-dark" : ""}`}
                                to={path}
                            >
                                <i className={`bi ${icon} me-2`}></i> {!collapsed && label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow-1">
                {/* Top Nav */}
                <div
                    className="d-flex justify-content-between align-items-center px-4 py-3 shadow"
                    style={{ background: "#f5f7fa" }}
                >
                    <h4 className="fw-bold m-0">Welcome, Student 👋</h4>

                    <div className="dropdown">
                        <img
                            src="/assets/Profile_40x40.png"
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

                {/* Page Content will render here */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default StudentLayout;
