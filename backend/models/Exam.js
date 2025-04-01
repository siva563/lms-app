const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    chapterIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
    questionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
    durationInMinutes: Number,
    totalMarks: Number,

    scheduledAt: Date,
    isPublished: { type: Boolean, default: false },

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

module.exports = mongoose.model("Exam", examSchema);
