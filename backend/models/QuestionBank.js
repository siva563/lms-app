const mongoose = require("mongoose");

const questionBankSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [String],
    answer: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
    tags: [String],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QuestionBank", questionBankSchema);
