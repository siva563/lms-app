const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
    input: String,
    expectedOutput: String,
    marks: Number,
    required: { type: Boolean, default: false },
});

const assignmentSchema = new mongoose.Schema({
    title: String,
    subjectId: mongoose.Schema.Types.ObjectId,
    chapterId: mongoose.Schema.Types.ObjectId,
    languages: [String],
    isCoding: Boolean,
    description: String,
    testCases: [testCaseSchema],
    totalMarks: Number, // sum of all testCase.marks
    timeLimit: Number,
    tags: [String],
    createdBy: mongoose.Schema.Types.ObjectId,
    institutionId: {
        type: mongoose.Schema.Types.ObjectId, // or String if your IDs are custom
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('AssignmentBank', assignmentSchema);
