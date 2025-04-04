const express = require("express");
const router = express.Router();
const { getExamAnalytics, getAdminExamAnalytics } = require("../controllers/analyticsController");
const { getAttendanceSummary } = require("../controllers/adminAttendanceController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/roleCheck");

// 📊 Exam analytics for admins
router.get("/exams/:examId/analytics", auth, checkRole(["admin", "superadmin"]), getExamAnalytics);
router.get("/admin-dashboard", auth, getAdminExamAnalytics);
router.get("/attendance-summary", auth, getAttendanceSummary);

module.exports = router;
