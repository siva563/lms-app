// models/QuizAttempt.js
const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionBank" },
    givenAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean,
    marks: Number
});

const quizAttemptSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    studentId: String,
    answers: [answerSchema],
    score: Number,
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
