const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

const { uploadQuizBatch,getFilteredQuizzes} = require("../controllers/quizController");

// Only instructors (or superadmin) can upload
router.post("/bulk", auth, roleCheck(["instructor", "superadmin"]), uploadQuizBatch);
router.get("/", getFilteredQuizzes); 

module.exports = router;
