const Exam = require("../models/Exam");
const Question = require("../models/Quiz");
const Submission = require("../models/submissionModel");

// exports.submitExam = async (req, res) => {
//     try {
//         const { examId, studentId, answers, startedAt } = req.body;

//         const exam = await Exam.findById(examId).populate("questionIds");
//         const totalMarks = exam.totalMarks || 0;

//         const startedTime = new Date(startedAt);
//         const submittedTime = new Date();

//         const timeTakenInSeconds = Math.floor(
//             (submittedTime - startedTime) / 1000
//         );

//         // 💯 Evaluation Logic
//         let score = 0;

//         for (let question of exam.questionIds) {
//             const submittedAnswer = answers[question._id];

//             if (!submittedAnswer) continue;

//             const correctAnswer = question.correctAnswer;

//             // MCQ, Dropdown
//             // if (["mcq", "dropdown", "short"].includes(question.questionType)) {
//             //     if (submittedAnswer === correctAnswer) {
//             //         score += question.marks;
//             //     }
//             // }

//             if (
//                 ["mcq", "dropdown", "short"].includes(question.questionType) &&
//                 submittedAnswer &&
//                 submittedAnswer === question.correctAnswer
//             ) {
//                 score += question.marks;
//             }

//             // Multi-select
//             // if (question.questionType === "multiselect" && Array.isArray(submittedAnswer)) {
//             //     const correct = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
//             //     const isCorrect =
//             //         submittedAnswer.length === correct.length &&
//             //         submittedAnswer.every((val) => correct.includes(val));
//             //     if (isCorrect) score += question.marks;
//             // }

//             if (question.questionType === "multiselect" && Array.isArray(submittedAnswer)) {
//                 const correct = Array.isArray(question.correctAnswer)
//                     ? question.correctAnswer
//                     : [question.correctAnswer];

//                 const isCorrect =
//                     submittedAnswer.length === correct.length &&
//                     submittedAnswer.every((ans) => correct.includes(ans));

//                 if (isCorrect) score += question.marks;
//             }
//         }

//         if (isNaN(timeTakenInSeconds)) {
//             return res.status(400).json({ message: "Invalid startedAt or time calculation failed" });
//         }

//         const submission = await Submission.create({
//             examId,
//             studentId,
//             answers,
//             startedAt,
//             submittedAt: new Date(),
//             timeTakenInSeconds: Math.floor((new Date() - new Date(startedAt)) / 1000),
//             score,
//             totalMarks,
//         });

//         res.status(201).json({
//             message: "Submission successful",
//             submissionId: submission._id,
//             score,
//             totalMarks,
//             timeTakenInSeconds: submission.timeTakenInSeconds,
//         });
//     } catch (err) {
//         console.error("❌ Submission error:", err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

exports.submitExam = async (req, res) => {
    try {
        const { examId, studentId, answers, startedAt } = req.body;

        // ✅ Block if already submitted
        const alreadySubmitted = await Submission.findOne({ examId, studentId });
        if (alreadySubmitted) {
            return res.status(400).json({ message: "❌ Already submitted!" });
        }

        const exam = await Exam.findById(examId).populate("questionIds");
        const totalMarks = exam.totalMarks || 0;

        let score = 0;

        for (let question of exam.questionIds) {
            const submittedAnswer = answers[question._id];
            const correctAnswer = question.correctAnswer;

            if (!submittedAnswer) continue;

            if (
                ["mcq", "dropdown", "short"].includes(question.questionType) &&
                submittedAnswer === correctAnswer
            ) {
                score += question.marks;
            }

            if (
                question.questionType === "multiselect" &&
                Array.isArray(submittedAnswer)
            ) {
                const correct = Array.isArray(correctAnswer)
                    ? correctAnswer
                    : [correctAnswer];
                const isCorrect =
                    submittedAnswer.length === correct.length &&
                    submittedAnswer.every((val) => correct.includes(val));
                if (isCorrect) score += question.marks;
            }
        }

        const timeTakenInSeconds = Math.floor(
            (new Date() - new Date(startedAt)) / 1000
        );

        const submission = await Submission.create({
            examId,
            studentId,
            answers,
            startedAt,
            submittedAt: new Date(),
            timeTakenInSeconds,
            score,
            totalMarks,
        });

        res.status(201).json({
            message: "✅ Submission successful",
            submissionId: submission._id,
            score,
            totalMarks,
            timeTakenInSeconds,
        });
    } catch (err) {
        console.error("❌ Submission error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getStudentResult = async (req, res) => {
    try {
        const { examId, studentId } = req.params;

        const submission = await Submission.findOne({ examId, studentId })
            .populate("examId", "title")
            .lean();

        if (!submission) {
            return res.status(404).json({ message: "Result not found" });
        }

        res.status(200).json({
            examTitle: submission.examId.title,
            score: submission.score,
            totalMarks: submission.totalMarks,
            timeTakenInSeconds: submission.timeTakenInSeconds,
            submittedAt: submission.submittedAt,
        });
    } catch (err) {
        console.error("❌ Failed to fetch result:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.checkIfSubmitted = async (req, res) => {
    const { examId, studentId } = req.query;

    if (!examId || !studentId) {
        return res.status(400).json({ message: "examId and studentId are required" });
    }

    try {
        const existing = await Submission.findOne({ examId, studentId });
        res.json({ alreadySubmitted: !!existing });
    } catch (err) {
        console.error("❌ Submission check error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getSubmissionResult = async (req, res) => {
    const { examId, studentId } = req.query;

    try {
        const submission = await Submission.findOne({ examId, studentId }).populate("examId");

        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        const exam = await Exam.findById(examId).lean();
        const questions = await Question.find({ _id: { $in: exam.questionIds } });

        const questionDetails = questions.map((q) => {
            const studentAnswer = submission.answers[q._id] || null;
            let isCorrect = false;

            if (["mcq", "dropdown", "short"].includes(q.questionType)) {
                isCorrect = studentAnswer === q.correctAnswer;
            } else if (q.questionType === "multiselect" && Array.isArray(studentAnswer)) {
                const correct = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
                isCorrect =
                    studentAnswer.length === correct.length &&
                    studentAnswer.every((ans) => correct.includes(ans));
            }

            return {
                questionText: q.questionText,
                studentAnswer: Array.isArray(studentAnswer) ? studentAnswer.join(", ") : studentAnswer || "Not Answered",
                correctAnswer: Array.isArray(q.correctAnswer) ? q.correctAnswer.join(", ") : q.correctAnswer,
                isCorrect,
            };
        });

        res.json({
            examTitle: exam.title,
            score: submission.score,
            totalMarks: submission.totalMarks,
            timeTakenInSeconds: submission.timeTakenInSeconds,
            startedAt: submission.startedAt,
            submittedAt: submission.submittedAt,
            questionDetails,
        });
    } catch (err) {
        console.error("❌ Result fetch error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getLeaderboard = async (req, res) => {
    const { examId } = req.query;

    if (!examId) {
        return res.status(400).json({ message: "Exam ID is required" });
    }

    try {
        const submissions = await Submission.find({ examId })
            .sort({ score: -1, timeTakenInSeconds: 1, submittedAt: 1 })
            .limit(10)
            .populate("studentId", "name");

        const leaderboard = submissions.map((s, index) => ({
            rank: index + 1,
            name: s.studentId?.name || "Anonymous",
            score: s.score,
            totalMarks: s.totalMarks,
            timeTakenInSeconds: s.timeTakenInSeconds,
            submittedAt: s.submittedAt,
        }));

        res.json(leaderboard);
    } catch (err) {
        console.error("❌ Leaderboard error:", err);
        res.status(500).json({ message: "Failed to fetch leaderboard" });
    }
};
