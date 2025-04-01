const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Chapter", chapterSchema);
