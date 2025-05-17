const mongoose = require('mongoose');

const testCaseResultSchema = new mongoose.Schema({
    input: String,
    expectedOutput: String,
    studentOutput: String,
    passed: Boolean,
    marksAwarded: Number,
    feedback: String,
});

const aiSuggestionSchema = new mongoose.Schema({
    title: String,
    explanation: String,
    correction: String,
    tags: [String],
});

const assignmentAttemptSchema = new mongoose.Schema({
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'AssignmentBank' },
    studentId: mongoose.Schema.Types.ObjectId,
    submittedCode: String,
    language: String,
    score: Number,
    version: { type: Number, default: 1 }, // ✅ attempt version
    isDraft: { type: Boolean, default: false }, // ✅ draft save
    timeSpent: Number,
    startedAt: Date,
    submittedAt: Date,
    testCaseResults: [testCaseResultSchema],
    aiSuggestions: [aiSuggestionSchema],
}, { timestamps: true });

module.exports = mongoose.model('AssignmentAttempt', assignmentAttemptSchema);
