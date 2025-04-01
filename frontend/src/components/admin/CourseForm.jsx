import React, { useState, useEffect } from "react";

const CourseForm = ({ onSubmit, editingCourse, clearEdit }) => {
    const [name, setName] = useState("");

    useEffect(() => {
        if (editingCourse) {
            setName(editingCourse.name);
        }
    }, [editingCourse]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return alert("Please enter course name");
        onSubmit({ name });
        setName("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter course name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                    {editingCourse ? "Update" : "Add"}
                </button>
                {editingCourse && (
                    <button className="btn btn-secondary" type="button" onClick={clearEdit}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default CourseForm;
