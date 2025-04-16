const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  videoUrl: String,
  cheatsheetUrl: String,
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", default: null },
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", default: null }, // optional
  imageUrl: String,
  isLocked: { type: Boolean, default: false },
  institutionId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Institution" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Chapter", chapterSchema);
