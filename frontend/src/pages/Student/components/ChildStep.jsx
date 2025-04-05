import React from "react";

const ChildStep = ({ child, profile }) => {
    const isFilled = (fields = []) => {
        return fields.every(field => {
            const value = field.split('.').reduce((o, i) => o?.[i], profile);
            return value && value !== "";
        });
    };

    return (
        <li className="list-group-item py-1 small d-flex justify-content-between align-items-center border-0 ps-4">
            <span>{child.title}</span>
            <span>{isFilled(child.fields) ? "✅" : "⬜️"}</span>
        </li>
    );
};

export default ChildStep;
