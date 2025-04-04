const User = require("../models/User");
const Exam = require("../models/Exam");
const ExamSubmission = require("../models/submissionModel");

exports.getCourseCompletion = async (req, res) => {
    try {
        const studentId = req.user._id;

        const totalChapters = 100; // Replace with DB call
        const completedChapters = 42; // Replace with DB call

        const percentage = Math.round((completedChapters / totalChapters) * 100);

        res.json({ percentage });
    } catch (err) {
        console.error("Progress Error:", err);
        res.status(500).json({ message: "Failed to load progress" });
    }
};

exports.getStudentRank = async (req, res) => {
    try {
        const studentId = req.user._id.toString();

        const allStudents = await User.find({ role: "student" }).select("_id batchId totalScore");

        const currentStudent = allStudents.find(s => s._id.toString() === studentId);

        if (!currentStudent || !currentStudent.batchId) {
            return res.status(400).json({ message: "Student or batchId not found" });
        }

        // Batch Ranking
        const batchStudents = allStudents.filter(s =>
            s.batchId?.toString() === currentStudent.batchId.toString()
        );

        batchStudents.sort((a, b) => b.totalScore - a.totalScore);
        const batchRank = batchStudents.findIndex(s => s._id.toString() === studentId) + 1;

        // Overall Ranking
        allStudents.sort((a, b) => b.totalScore - a.totalScore);
        const overallRank = allStudents.findIndex(s => s._id.toString() === studentId) + 1;

        res.json({
            batchRank,
            batchSize: batchStudents.length,
            overallRank,
            totalStudents: allStudents.length
        });

    } catch (err) {
        console.error("Error in getStudentRank:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getExamSummary = async (req, res) => {
    try {
        const institutionId = req.user.institutionId;

        const totalExams = await Exam.countDocuments({ institutionId });
        const totalAttempts = await ExamSubmission.countDocuments({ institutionId });

        res.json({ totalExams, totalAttempts });
    } catch (err) {
        console.error("Error fetching exam summary:", err);
        res.status(500).json({ message: "Server error" });
    }
};


