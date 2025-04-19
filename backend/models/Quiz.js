const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution", required: true },
    questionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuestionBank" }],
    createdBy: String,
    isAssignedToChapter: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
  });

module.exports = mongoose.model("Quiz", quizSchema);
