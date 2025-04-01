const Subject = require("../models/Subject");

exports.createSubject = async (req, res) => {
    try {
        const { name, institutionId } = req.body;
        const subject = await Subject.create({ name, institutionId });
        res.status(201).json(subject);
    } catch (err) {
        console.error("Create Subject:", err);
        res.status(500).json({ message: "Failed to create subject" });
    }
};

exports.getSubjects = async (req, res) => {
    try {
        const { institutionId } = req.query;
        const subjects = await Subject.find({ institutionId }).sort({ createdAt: -1 });
        res.json(subjects);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch subjects" });
    }
};

exports.deleteSubject = async (req, res) => {
    try {
        await Subject.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
};

exports.updateSubject = async (req, res) => {
    try {
        const updated = await Subject.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
};