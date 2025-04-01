const Course = require("../models/Course");

// Create Course
exports.createCourse = async (req, res) => {
    try {
        const { name, description, subjects, durationInDays, price } = req.body;
        const course = await Course.create({
            name,
            description,
            subjects,
            durationInDays,
            price,
            createdBy: req.user.userId,
            institutionId: req.user.institutionId,
        });
        res.status(201).json(course);
    } catch (err) {
        console.error("Create Course:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all courses for institution
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find({ institutionId: req.user.institutionId });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};

// Get single course
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Not found" });
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update course
exports.updateCourse = async (req, res) => {
    try {
        const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete course
exports.deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: "Course deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
