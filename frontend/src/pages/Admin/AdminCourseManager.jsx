import React, { useEffect, useState } from "react";
import {
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
} from "../../services/courseService";
import CourseForm from "../../components/admin/CourseForm";
import CourseList from "../../components/admin/CourseList";

const AdminCourseManager = () => {
    const [courses, setCourses] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);

    const loadCourses = async () => {
        try {
            const data = await fetchCourses();
            if (Array.isArray(data)) {
                setCourses(data);
            } else {
                console.error("Expected array but got:", data);
                setCourses([]); // Fallback
            }
        } catch (err) {
            console.error("❌ Failed to load courses", err);
            setCourses([]);
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const handleSubmit = async (formData) => {
        try {
            if (editingCourse) {
                await updateCourse(editingCourse._id, formData);
            } else {
                await createCourse(formData);
            }
            setEditingCourse(null);
            loadCourses();
        } catch (err) {
            alert("Error saving course");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            await deleteCourse(id);
            loadCourses();
        }
    };

    return (
        <div className="container py-4">
            <h3 className="mb-4">🎓 Manage Courses</h3>
            <CourseForm onSubmit={handleSubmit} editingCourse={editingCourse} clearEdit={() => setEditingCourse(null)} />
            <CourseList courses={courses} onEdit={setEditingCourse} onDelete={handleDelete} />
        </div>
    );
};

export default AdminCourseManager;
