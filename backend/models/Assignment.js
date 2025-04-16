const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    marks: Number,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);
