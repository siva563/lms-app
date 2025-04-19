const Subject = require("../models/Subject");
const SubjectAssignment = require("../models/subjectAssignmentModel");
//const SubjectAssignment = require("../models/subjectAssignmentModel");
const User = require("../models/User");

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

// controllers/subjectController.js
// exports.assignSubjectToStudents = async (req, res) => {
//     try {
//         const { subjectId, studentIds } = req.body;

//         if (!subjectId || !studentIds || !Array.isArray(studentIds)) {
//             return res.status(400).json({ message: "Invalid input" });
//         }

//         const subject = await Subject.findById(subjectId);
//         if (!subject) return res.status(404).json({ message: "Subject not found" });

//         // Merge and deduplicate student IDs
//         const uniqueAssignments = [...new Set([...subject.assignedTo.map(id => id.toString()), ...studentIds])];

//         subject.assignedTo = uniqueAssignments;
//         await subject.save();

//         res.json({ message: "✅ Subject assigned successfully" });
//     } catch (err) {
//         console.error("❌ Error assigning subject:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// exports.assignSubjectToStudents = async (req, res) => {
//     try {
//         const { subjectId, studentIds } = req.body;

//         if (!subjectId || !studentIds || studentIds.length === 0) {
//             return res.status(400).json({ message: "Missing subject or students." });
//         }

//         const assignments = studentIds.map((studentId) => ({
//             subjectId,
//             studentId,
//             createdBy: req.user._id, // ✅ Add this
//             institutionId: req.user.institutionId, // ✅ Also add this if required
//         }));

//         await SubjectAssignment.insertMany(assignments);

//         res.status(201).json({ message: "Subject assigned successfully." });
//     } catch (err) {
//         console.error("Error assigning subject:", err);
//         res.status(500).json({ message: "Failed to assign subject." });
//     }
// };



exports.assignSubjectToStudents = async (req, res) => {
    try {
        const { subjectId, studentIds } = req.body;

        if (!subjectId || !studentIds || studentIds.length === 0) {
            return res.status(400).json({ message: "Missing subject or students." });
        }

        const assignments = studentIds.map((studentId) => ({
            subjectId,
            studentId,
            createdBy: req.user._id,
            institutionId: req.user.institutionId,
        }));

        // ✅ Insert assignment entries
        await SubjectAssignment.insertMany(assignments);

        // ✅ Update each student's assignedSubjects array
        await Promise.all(
            studentIds.map((id) =>
                User.findByIdAndUpdate(
                    id,
                    { $addToSet: { assignedSubjects: subjectId } }, // addToSet avoids duplicates
                    { new: true }
                )
            )
        );

        res.status(201).json({ message: "Subject assigned successfully." });
    } catch (err) {
        console.error("❌ Error assigning subject:", err);
        res.status(500).json({ message: "Failed to assign subject." });
    }
};

