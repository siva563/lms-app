const Submission = require("../models/submissionModel");
const Exam = require("../models/Exam");
const User = require("../models/User");

exports.getExamAnalytics = async (req, res) => {
    const { examId } = req.params;

    try {
        const exam = await Exam.findById(examId);
        if (!exam) return res.status(404).json({ message: "Exam not found" });

        const submissions = await Submission.find({ examId });

        const totalStudents = await User.countDocuments({
            institutionId: exam.institutionId,
            role: "student",
        });

        const attempted = submissions.length;
        const notAttempted = totalStudents - attempted;

        const scores = submissions.map((s) => s.score);
        const timeTaken = submissions.map((s) => s.timeTakenInSeconds || 0);
        const submittedTimes = submissions.map((s) => new Date(s.submittedAt));

        const avgScore = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : 0;
        const highScore = Math.max(...scores, 0);
        const lowScore = Math.min(...scores, 0);
        const avgTime = timeTaken.length ? Math.floor(timeTaken.reduce((a, b) => a + b, 0) / timeTaken.length) : 0;

        const earliest = submittedTimes.length ? new Date(Math.min(...submittedTimes)) : null;
        const latest = submittedTimes.length ? new Date(Math.max(...submittedTimes)) : null;

        res.json({
            examId,
            title: exam.title,
            totalStudents,
            attempted,
            notAttempted,
            averageScore: parseFloat(avgScore),
            highestScore: highScore,
            lowestScore: lowScore,
            averageTimeTaken: avgTime,
            submittedAtRange: {
                earliest,
                latest
            }
        });

    } catch (err) {
        console.error("❌ Analytics Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getExamStats = async (req, res) => {

    console.log("🏫 Institution ID in analytics:", req.user.institutionId);
    try {
        const totalExams = await Exam.countDocuments({
            institutionId: req.user.institutionId,
        });

        res.json({ totalExams });
    } catch (err) {
        console.error("❌ Analytics error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAdminExamAnalytics = async (req, res) => {
    try {
        const institutionId = req.user.institutionId;

        // ✅ 1. Total Exams
        const totalExams = await Exam.countDocuments({ institutionId });

        // ✅ 2. Submissions per Exam
        const submissionsPerExam = await Submission.aggregate([
            { $match: { institutionId: new mongoose.Types.ObjectId(institutionId) } },
            { $group: { _id: "$examId", count: { $sum: 1 } } }
        ]);

        // ✅ 3. Top Scoring Students
        const topStudents = await Submission.find({ institutionId })
            .sort({ score: -1 })
            .limit(5)
            .populate("studentId", "name email");

        // ✅ 4. Average Time Taken per Exam
        const avgTimePerExam = await Submission.aggregate([
            { $match: { institutionId: new mongoose.Types.ObjectId(institutionId) } },
            { $group: { _id: "$examId", avgTime: { $avg: "$timeTakenInSeconds" } } }
        ]);

        // ✅ 5. Most Recent Exams
        const recentExams = await Exam.find({ institutionId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("title createdAt");

        res.json({
            totalExams,
            submissionsPerExam,
            topStudents,
            avgTimePerExam,
            recentExams,
        });
    } catch (err) {
        console.error("❌ Admin Analytics Error:", err);
        res.status(500).json({ message: "Failed to fetch analytics" });
    }
};