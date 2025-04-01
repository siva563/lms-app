const mongoose = require("mongoose");
const { Schema } = mongoose;

const submissionSchema = new Schema({
    examId: { type: Schema.Types.ObjectId, ref: "Exam", required: true },
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    answers: { type: Map, of: Schema.Types.Mixed, required: true },
    startedAt: { type: Date, required: true },
    submittedAt: { type: Date, default: Date.now },
    timeTakenInSeconds: { type: Number }, // 🧠 optional, calculated after save
    score: { type: Number, default: 0 },
    totalMarks: { type: Number, default: 0 },
});

module.exports = mongoose.model("Submission", submissionSchema);
