const Exam = require("../models/Exam");

exports.createExam = async (req, res) => {
    console.log("👤 req.user:", req.user);
    try {
        const {
            title,
            description,
            subjectId,
            chapterIds,
            questionIds,
            durationInMinutes,
            totalMarks,
            scheduledAt,
            institutionId,
        } = req.body;

        //const createdBy = req.user._id;
        // const createdBy = req.user._id;
        const createdBy = req.user.userId;
        console.log("created by:" + createdBy);
        const newExam = await Exam.create({
            title,
            description,
            subjectId,
            chapterIds,
            questionIds,
            durationInMinutes,
            totalMarks,
            scheduledAt,
            institutionId,
            createdBy,
        });

        res.status(201).json({ message: "Exam created", exam: newExam });
    } catch (err) {
        console.error("Create Exam Error:", err);
        res.status(500).json({ message: "Failed to create exam", error: err.message });
    }
};

// exports.getAllExams = async (req, res) => {
//     try {
//         const exams = await Exam.find({ institutionId: req.query.institutionId })
//             .populate("subjectId", "name")
//             .sort({ createdAt: -1 });
//         res.json(exams);
//     } catch (err) {
//         res.status(500).json({ message: "Failed to fetch exams" });
//     }
// };

exports.getAllExams = async (req, res) => {
    try {
        const institutionId = req.user?.institutionId;

        if (!institutionId) {
            return res.status(400).json({ message: "Institution ID missing in token" });
        }

        const exams = await Exam.find({ institutionId })
            .populate("subjectId", "name")
            .sort({ createdAt: -1 });

        res.json(exams);
    } catch (err) {
        console.error("❌ Failed to fetch exams:", err);
        res.status(500).json({ message: "Failed to fetch exams" });
    }
};

exports.getExamById = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id)
            .populate("questionIds")
            .populate("subjectId", "name")
            .populate("chapterIds", "name");

        if (!exam) return res.status(404).json({ message: "Exam not found" });

        res.json(exam);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch exam details" });
    }
};
