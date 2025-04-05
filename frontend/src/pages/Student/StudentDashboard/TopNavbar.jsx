// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Dropdown } from "react-bootstrap";

// const TopNavbar = ({ studentName = "John Doe", profileImage }) => {
//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
//             {/* Left - Logo */}
//             <a className="navbar-brand fw-bold fs-4 text-primary" href="/">
//                 CodeBegun
//             </a>

//             {/* Right - Profile Dropdown */}
//             <div className="ms-auto d-flex align-items-center">
//                 <span className="me-2 fw-semibold">{studentName}</span>

//                 <Dropdown align="end">
//                     <Dropdown.Toggle
//                         variant="link"
//                         id="dropdown-basic"
//                         className="p-0 border-0 bg-transparent"
//                     >
//                         <img
//                             src={
//                                 profileImage ||
//                                 "https://ui-avatars.com/api/?name=" + studentName
//                             }
//                             alt="Profile"
//                             className="rounded-circle"
//                             width="40"
//                             height="40"
//                         />
//                     </Dropdown.Toggle>

//                     <Dropdown.Menu>
//                         <Dropdown.Item href="/my-profile">My Profile</Dropdown.Item>
//                         <Dropdown.Divider />
//                         <Dropdown.Item onClick={() => handleLogout()}>Logout</Dropdown.Item>
//                     </Dropdown.Menu>
//                 </Dropdown>
//             </div>
//         </nav>
//     );
// };

// // 🔐 Optional logout logic
// const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
// };

// export default TopNavbar;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import codeBegunLogo from "../../../assets/logo.png"; // 👈 YOUR LOGO PATH

const TopNavbar = ({ studentName = "John Doe", profileImage }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">

            {/* Left - Logo */}
            <a className="navbar-brand d-flex align-items-center" href="/">
                <img
                    src={codeBegunLogo}
                    alt="CodeBegun Logo"
                    height="40"
                    className="me-2"
                />
                {/* <span className="fw-bold fs-5 text-primary"></span> */}
            </a>

            {/* Right - Profile Dropdown */}
            <div className="ms-auto d-flex align-items-center">
                <span className="me-2 fw-semibold">{studentName}</span>

                <Dropdown align="end">
                    <Dropdown.Toggle
                        variant="link"
                        id="dropdown-basic"
                        className="p-0 border-0 bg-transparent"
                    >
                        <img
                            src={
                                profileImage ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(studentName)}`
                            }
                            alt="Profile"
                            className="rounded-circle"
                            width="40"
                            height="40"
                        />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/my-profile">My Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </nav>
    );
};

// 🔐 Logout Function
const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
};

export default TopNavbar;

