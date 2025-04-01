const Chapter = require("../models/Chapter");

exports.createChapter = async (req, res) => {
    try {
        const { name, subjectId, institutionId } = req.body;
        const chapter = await Chapter.create({ name, subjectId, institutionId });
        res.status(201).json(chapter);
    } catch (err) {
        console.error("Create Chapter:", err);
        res.status(500).json({ message: "Failed to create chapter" });
    }
};

exports.getChapters = async (req, res) => {
    try {
        const { subjectId } = req.query;
        const chapters = await Chapter.find({ subjectId }).sort({ createdAt: -1 });
        res.json(chapters);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch chapters" });
    }
};

exports.deleteChapter = async (req, res) => {
    try {
        await Chapter.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
};

exports.updateChapter = async (req, res) => {
    try {
        const updated = await Chapter.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
};
