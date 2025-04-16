const Subject = require("../models/Subject");

exports.createSubject = async (req, res) => {
    try {
        const { name, description } = req.body;

        const subject = new Subject({
            name,
            description,
            institutionId: req.user.institutionId, // ✅ From decoded token
            createdBy: req.user._id,               // ✅ Also from token
        });

        await subject.save();
        res.status(201).json(subject);
    } catch (err) {
        console.error("Create Subject Error:", err);
        res.status(400).json({ message: "Failed to create subject", error: err.message });
    }
};
// Get All
exports.getSubjects = async (req, res) => {
    try {
        const institutionId = req.user.institutionId;
        const subjects = await Subject.find({ institutionId });
        res.json(subjects);
    } catch (err) {
        console.error("❌ Error fetching subjects:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get By ID
exports.getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) return res.status(404).json({ message: "Not found" });
        res.json(subject);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update
exports.updateSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subject) return res.status(404).json({ message: "Not found" });
        res.json(subject);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete
exports.deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (!subject) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
