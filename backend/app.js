require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const app = express();
const batchRoutes = require("./routes/batchRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const studentRoutes = require("./routes/studentRoutes");
const quizSuggest = require("./routes/quizSuggest");
const questionBankRoutes = require("./routes/questionBankRoutes");
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/institutions", require("./routes/institutionRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/setup", require("./routes/setupRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));
app.use("/api/chapters", require("./routes/chapterRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes"));
app.use("/api/exams", require("./routes/examRoutes"));
app.use("/api/submissions", require("./routes/submissionRoutes"));
app.use("/api/admin", adminRoutes);
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/batches", batchRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/quiz", quizSuggest);
app.use("/api/question-bank", questionBankRoutes);


module.exports = app;
