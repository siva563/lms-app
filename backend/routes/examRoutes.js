const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

const {
    createExam,
    getAllExams,
    getExamById,
} = require("../controllers/examController");

router.use(auth, roleCheck(["admin", "instructor", "superadmin", "student"]));

router.post("/", createExam);
router.get("/", auth, getAllExams);
router.get("/:id", getExamById);

module.exports = router;
