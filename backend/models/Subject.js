const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    institutionId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Institution" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    createdAt: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model("Subject", subjectSchema);