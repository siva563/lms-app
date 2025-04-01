const Quiz = require("../models/Quiz");

exports.uploadQuizBatch = async (req, res) => {
    try {
        const { questions } = req.body;

        if (!questions || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: "No questions provided" });
        }

        await Quiz.insertMany(questions);
        res.status(201).json({ message: "Quiz uploaded successfully", count: questions.length });
    } catch (err) {
        console.error("❌ Quiz upload failed:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};



exports.getFilteredQuizzes = async (req, res) => {
    try {
        const { subjectId, chapterIds, type, difficulty, tags } = req.query;

        const filter = {
            isActive: true,
        };

        if (subjectId) filter.subjectId = subjectId;
        if (chapterIds) {
            filter.chapterId = { $in: Array.isArray(chapterIds) ? chapterIds : [chapterIds] };
        }
        if (type) filter.questionType = type;
        if (difficulty) filter.difficulty = difficulty;
        if (tags) {
            const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
            filter.tags = { $in: tagsArray };
        }

        const quizzes = await Quiz.find(filter).sort({ createdAt: -1 });
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch quizzes", error: err.message });
    }
};

