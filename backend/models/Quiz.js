const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
    {
        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
        chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },

        questionText: { type: String, required: true },
        questionType: {
            type: String,
            enum: ["mcq", "multiselect", "short", "dropdown"],
            required: true,
        },
        options: {
            A: { type: String },
            B: { type: String },
            C: { type: String },
            D: { type: String },
        },
        correctAnswer: {
            type: mongoose.Schema.Types.Mixed, // string or array
            required: true,
        },
        marks: { type: Number, default: 1 },

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "easy",
        },
        tags: [String],

        isActive: { type: Boolean, default: true },
        usedInExams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],

        institutionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
