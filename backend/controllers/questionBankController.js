const Question = require("../models/QuestionBank");

// 🔍 GET with filters
exports.getQuestions = async (req, res) => {
    const { difficulty, tag, search } = req.query;
    const query = {};
    if (difficulty) query.difficulty = difficulty;
    if (tag) query.tags = tag;
    if (search) query.question = { $regex: search, $options: "i" };

    try {
        const results = await Question.find(query).sort({ createdAt: -1 });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch questions" });
    }
};

// 💾 Add new question
exports.addQuestion = async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(500).json({ error: "Failed to save question" });
    }
};

// 📝 Update question
exports.updateQuestion = async (req, res) => {
    try {
        const updated = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update question" });
    }
};

// 🗑 Delete question
exports.deleteQuestion = async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete question" });
    }
};
