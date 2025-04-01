const express = require("express");
const router = express.Router();
const { submitExam, getStudentResult, checkIfSubmitted, getSubmissionResult,getLeaderboard } = require("../controllers/submissionController");
const auth = require("../middleware/auth");

router.post("/", auth, submitExam);
router.get("/:examId/:studentId", auth, getStudentResult);
router.get("/check", checkIfSubmitted);
router.get("/result", getSubmissionResult);
router.get("/leaderboard", auth, getLeaderboard);


module.exports = router;
