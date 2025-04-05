import React from "react";
import { Link } from "react-scroll";
import sidebarSections from "./sidebarSections"; // 👈 (the file above)
import "./SidebarProgress.css";

const SidebarProgress = ({ completedSections }) => {
    return (
        <div className="sidebar-progress-container">
            <h5 className="mb-4 text-center">🎯 Profile Progress</h5>

            {sidebarSections.map((section, index) => (
                <div key={index} className="sidebar-section">
                    <div className="sidebar-section-title">
                        {section.icon} {section.title}
                    </div>
                    <ul className="sidebar-item-list">
                        {section.items.map((item, idx) => (
                            <li key={idx}>
                                <Link
                                    to={item.id}
                                    smooth={true}
                                    duration={500}
                                    className="sidebar-link"
                                    activeClass="active-link"
                                    spy={true}
                                    offset={-80}
                                >
                                    {completedSections?.includes(item.id) ? (
                                        <span className="status-icon completed">✔️</span>
                                    ) : (
                                        <span className="status-icon pending">⚪</span>
                                    )}
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default SidebarProgress;
