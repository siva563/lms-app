import React, { useState } from "react";
import ChildStep from "./ChildStep";

const ParentStep = ({ section, profile, activeSection }) => {
    const [open, setOpen] = useState(true);

    const isFilled = (fields = []) => {
        return fields.every(field => {
            const value = field.split('.').reduce((o, i) => o?.[i], profile);
            return value && value !== "";
        });
    };

    const childStatuses = section.children.map(child => isFilled(child.fields));

    const getParentStatus = () => {
        if (childStatuses.every(Boolean)) return "✅";
        if (childStatuses.some(Boolean)) return "🟡";
        return "⬜️";
    };

    const scrollToSection = () => {
        const el = document.getElementById(section.title);
        if (el) {
            window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
        }
    };

    return (
        <div className="mb-2 position-relative ps-3 border-start border-2 border-secondary">
            <div
                className={`d-flex justify-content-between align-items-center py-1 ${activeSection === section.title ? "text-primary" : ""}`}
                onClick={scrollToSection}
                style={{ cursor: "pointer", fontWeight: "bold" }}
            >
                <div>{getParentStatus()} {section.title}</div>
                <div onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>{open ? "▼" : "▶"}</div>
            </div>

            {open && (
                <ul className="list-group list-group-flush ms-2">
                    {section.children.map((child, idx) => (
                        <ChildStep key={idx} child={child} profile={profile} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ParentStep;
