import React from "react";

const BatchList = ({ batches, onEdit, onDelete }) => {
    return (
        <table className="table table-bordered shadow-sm">
            <thead className="table-dark">
                <tr>
                    <th>#</th>
                    <th>Batch Name</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Course</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {batches.map((b, i) => (
                    <tr key={b._id}>
                        <td>{i + 1}</td>
                        <td>{b.name}</td>
                        <td>{new Date(b.startDate).toLocaleDateString()}</td>
                        <td>{new Date(b.endDate).toLocaleDateString()}</td>
                        <td>{b.courseId?.name}</td>
                        <td>{b.type}</td>
                        <td>₹{b.price}</td>
                        <td>{b.batchSize}</td>
                        <td>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(b)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => onDelete(b._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BatchList;
