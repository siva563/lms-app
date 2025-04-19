const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/uploadMiddleware");
const { getStudentProfile, updateStudentProfile, fetchAssignedSubjectsWithChapters,fetchChaptersBySubject } = require("../controllers/studentController");

router.get("/profile", auth, getStudentProfile);
router.put("/profile", auth, upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "resume", maxCount: 1 }
]), updateStudentProfile);

router.get("/assigned-subjects", auth, fetchAssignedSubjectsWithChapters);
router.get("/chapters/:subjectId", auth, fetchChaptersBySubject);


module.exports = router;
