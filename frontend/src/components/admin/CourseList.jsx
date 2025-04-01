import React from "react";

const CourseList = ({ courses, onEdit, onDelete }) => {
    return (
        <table className="table table-bordered shadow-sm">
            <thead className="table-dark">
                <tr>
                    <th>#</th>
                    <th>Course Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course, i) => (
                    <tr key={course._id}>
                        <td>{i + 1}</td>
                        <td>{course.name}</td>
                        <td>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(course)}>
                                Edit
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => onDelete(course._id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CourseList;
