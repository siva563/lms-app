// controllers/assignmentController.js
const AssignmentBank = require('../models/AssignmentBank');
const Chapter = require('../models/Chapter');

exports.createAssignment = async (req, res) => {
    console.log("assignment is created");
    try {
        const {
            title,
            subjectId,
            chapterId,
            languages,
            isCoding,
            description,
            testCases,
            timeLimit,
            tags,
            createdBy,
            institutionId,
        } = req.body;

        // ✅ Auto calculate totalMarks from testCases
        const totalMarks = testCases.reduce((sum, tc) => sum + (tc.marks || 0), 0);

        if (!institutionId) {
            return res.status(400).json({ error: "institutionId is required" });
        }

        if (!subjectId || !chapterId) {
            return res.status(400).json({ error: "Subject and Chapter are required." });
        }

        // ✅ Create assignment entry
        const newAssignment = new AssignmentBank({
            title,
            subjectId,
            chapterId,
            languages,
            isCoding,
            description,
            testCases,
            totalMarks,
            timeLimit,
            tags,
            createdBy,
            institutionId,
        });

        const savedAssignment = await newAssignment.save();

        // ✅ Update Chapter with assignment reference
        if (chapterId) {
            await Chapter.findByIdAndUpdate(chapterId, {
                assignmentId: savedAssignment._id,
                assignmentScore: totalMarks,
            });
        }


        console.log("Done babu done");
        res.status(201).json({
            message: '✅ Assignment created successfully',
            assignment: savedAssignment,
        });
    } catch (error) {
        console.error("❌ Error creating assignment:", error);
        res.status(500).json({ error: "Assignment creation failed" });
    }
};

// controllers/assignmentController.js
exports.getAssignmentByChapterId = async (req, res) => {
    try {
        const { chapterId } = req.params;
        //  const { institutionId } = req.query;
        const institutionId = req.headers['institutionid'];

        if (!institutionId) {
            return res.status(400).json({ error: "institutionId is required" });
        }

        const assignment = await AssignmentBank.findOne({
            chapterId,
            institutionId,
        });

        if (!assignment) {
            return res.status(404).json({ error: 'No assignment found for this chapter.' });
        }

        res.json(assignment);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch assignment.' });
    }
};
