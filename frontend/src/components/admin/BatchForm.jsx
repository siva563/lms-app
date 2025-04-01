import React, { useEffect, useState } from "react";
import { fetchCourses } from "../../services/courseService";

const BatchForm = ({ onSubmit, editingBatch, clearEdit }) => {
    const [form, setForm] = useState({
        name: "",
        startDate: "",
        batchSize: "",
        price: "",
        type: "Online",
        courseId: "",
    });

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (editingBatch) setForm(editingBatch);
        else setForm({
            name: "", startDate: "", batchSize: "", price: "", type: "Online", courseId: ""
        });
    }, [editingBatch]);

    useEffect(() => {
        const loadCourses = async () => {
            const data = await fetchCourses();
            setCourses(data);
        };
        loadCourses();
    }, []);

    const calculateEndDate = (startDate) => {
        const date = new Date(startDate);
        let addedDays = 0;
        while (addedDays < 150) {
            date.setDate(date.getDate() + 1);
            const day = date.getDay();
            if (day !== 0 && day !== 6) addedDays++; // Skip Sunday (0) and Saturday (6)
        }
        return date.toISOString().split("T")[0];
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
            endDate: name === "startDate" ? calculateEndDate(value) : prev.endDate,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form className="border p-4 shadow-sm mb-4" onSubmit={handleSubmit}>
            <h5>{editingBatch ? "✏️ Edit Batch" : "➕ Create New Batch"}</h5>
            <div className="row">
                <div className="col-md-4">
                    <label className="form-label">Batch Name</label>
                    <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Start Date</label>
                    <input type="date" className="form-control" name="startDate" value={form.startDate} onChange={handleChange} required />
                </div>
                <div className="col-md-4">
                    <label className="form-label">End Date (Auto)</label>
                    <input type="date" className="form-control" name="endDate" value={form.endDate || ""} readOnly />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Batch Size</label>
                    <input type="number" className="form-control" name="batchSize" value={form.batchSize} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Type</label>
                    <select className="form-select" name="type" value={form.type} onChange={handleChange}>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Course</label>
                    <select className="form-select" name="courseId" value={form.courseId} onChange={handleChange}>
                        <option value="">-- Select Course --</option>
                        {courses.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-3">
                <button className="btn btn-success me-2" type="submit">
                    {editingBatch ? "Update" : "Create"}
                </button>
                {editingBatch && (
                    <button className="btn btn-secondary" onClick={clearEdit}>Cancel</button>
                )}
            </div>
        </form>
    );
};

export default BatchForm;
