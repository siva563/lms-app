// // const Chapter = require("../models/Chapter");

// // exports.createChapter = async (req, res) => {
// //     try {
// //         const { name, subjectId, institutionId } = req.body;
// //         const chapter = await Chapter.create({ name, subjectId, institutionId });
// //         res.status(201).json(chapter);
// //     } catch (err) {
// //         console.error("Create Chapter:", err);
// //         res.status(500).json({ message: "Failed to create chapter" });
// //     }
// // };

// // exports.getChapters = async (req, res) => {
// //     try {
// //         const { subjectId } = req.query;
// //         const chapters = await Chapter.find({ subjectId }).sort({ createdAt: -1 });
// //         res.json(chapters);
// //     } catch (err) {
// //         res.status(500).json({ message: "Failed to fetch chapters" });
// //     }
// // };

// // exports.deleteChapter = async (req, res) => {
// //     try {
// //         await Chapter.findByIdAndDelete(req.params.id);
// //         res.json({ message: "Deleted" });
// //     } catch (err) {
// //         res.status(500).json({ message: "Delete failed" });
// //     }
// // };

// // exports.updateChapter = async (req, res) => {
// //     try {
// //         const updated = await Chapter.findByIdAndUpdate(
// //             req.params.id,
// //             { name: req.body.name },
// //             { new: true }
// //         );
// //         res.json(updated);
// //     } catch (err) {
// //         res.status(500).json({ message: "Update failed" });
// //     }
// // };


// // controllers/chapterController.js

// const Chapter = require("../models/Chapter");
// const Subject = require("../models/Subject");

// // ✅ Create Chapter
// exports.createChapter = async (req, res) => {
//     try {
//         const chapter = new Chapter({
//             ...req.body,
//             createdBy: req.user._id,
//             institutionId: req.user.institutionId,
//         });
//         await chapter.save();
//         res.status(201).json(chapter);
//     } catch (err) {
//         console.error("Create Chapter Error:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ✅ Get All Chapters for Subject
// exports.getChaptersBySubject = async (req, res) => {
//     try {
//         const { subjectId } = req.params;
//         const chapters = await Chapter.find({
//             subjectId,
//             institutionId: req.user.institutionId,
//         }).sort({ order: 1 });
//         res.json(chapters);
//     } catch (err) {
//         console.error("Fetch Chapters Error:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ✅ Get Chapter by ID
// exports.getChapterById = async (req, res) => {
//     try {
//         const chapter = await Chapter.findOne({
//             _id: req.params.id,
//             institutionId: req.user.institutionId,
//         });
//         if (!chapter) return res.status(404).json({ message: "Chapter not found" });
//         res.json(chapter);
//     } catch (err) {
//         console.error("Get Chapter Error:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ✅ Update Chapter
// exports.updateChapter = async (req, res) => {
//     try {
//         const chapter = await Chapter.findOneAndUpdate(
//             { _id: req.params.id, institutionId: req.user.institutionId },
//             req.body,
//             { new: true }
//         );
//         if (!chapter) return res.status(404).json({ message: "Chapter not found" });
//         res.json(chapter);
//     } catch (err) {
//         console.error("Update Chapter Error:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ✅ Delete Chapter
// exports.deleteChapter = async (req, res) => {
//     try {
//         const result = await Chapter.findOneAndDelete({
//             _id: req.params.id,
//             institutionId: req.user.institutionId,
//         });
//         if (!result) return res.status(404).json({ message: "Chapter not found" });
//         res.json({ message: "Chapter deleted" });
//     } catch (err) {
//         console.error("Delete Chapter Error:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };
const Chapter = require("../models/Chapter");
const Assignment = require("../models/Assignment");

exports.createChapter = async (req, res) => {
    try {
        let {
            title,
            description,
            subjectId,
            videoUrl,
            cheatsheetUrl,
            quizId,
            assignmentId,
            imageUrl,
            isLocked,
        } = req.body;

        // Clean up empty string values
        if (!quizId) quizId = null;
        if (!assignmentId) assignmentId = null;

        const chapter = new Chapter({
            title,
            description,
            subjectId,
            videoUrl,
            cheatsheetUrl,
            quizId,
            assignmentId,
            imageUrl,
            isLocked,
            institutionId: req.user.institutionId,
            createdBy: req.user._id
        });

        await chapter.save();
        res.status(201).json(chapter);
    } catch (err) {
        console.error("Create Chapter: Error:", err);
        res.status(500).json({ message: err.message || "Failed to create chapter" });
    }
};




// ✅ Get all chapters (optional: filter by subjectId)
exports.getAllChapters = async (req, res) => {
    try {
        const { subjectId } = req.query;
        const filter = {
            institutionId: req.user.institutionId,
            ...(subjectId && { subjectId }),
        };

        const chapters = await Chapter.find(filter)
            .populate("subjectId", "name")
            .populate("quizId", "title")
            .populate("assignmentId", "title")
            .sort({ createdAt: -1 });

        res.json(chapters);
    } catch (err) {
        console.error("❌ Error fetching chapters:", err);
        res.status(500).json({ message: "Server error while fetching chapters" });
    }
};

// ✅ Get a single chapter by ID
exports.getChapterById = async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id)
            .populate("subjectId", "name")
            .populate("quizId", "title")
            .populate("assignmentId", "title");

        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }

        res.json(chapter);
    } catch (err) {
        console.error("❌ Error fetching chapter:", err);
        res.status(500).json({ message: "Server error while fetching chapter" });
    }
};

// ✅ Update chapter
// exports.updateChapter = async (req, res) => {
//     try {
//         const updated = await Chapter.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updated) return res.status(404).json({ message: "Chapter not found" });

//         res.json(updated);
//     } catch (err) {
//         console.error("❌ Error updating chapter:", err);
//         res.status(500).json({ message: "Server error while updating chapter" });
//     }
// };

exports.updateChapter = async (req, res) => {
    try {
        const data = req.body;

        // Convert empty strings to null for optional ObjectId fields
        if (data.quizId === "") data.quizId = null;
        if (data.assignmentId === "") data.assignmentId = null;

        const updated = await Chapter.findByIdAndUpdate(req.params.id, data, {
            new: true,
            runValidators: true,
        });

        res.json(updated);
    } catch (err) {
        console.error("❌ Error updating chapter:", err);
        res.status(500).json({ message: err.message || "Failed to update chapter" });
    }
};

// ✅ Delete chapter
exports.deleteChapter = async (req, res) => {
    try {
        const deleted = await Chapter.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Chapter not found" });

        res.json({ message: "Chapter deleted successfully" });
    } catch (err) {
        console.error("❌ Error deleting chapter:", err);
        res.status(500).json({ message: "Server error while deleting chapter" });
    }
};
