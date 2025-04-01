const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { markLoginTime, markLogoutTime, getAttendanceReport, getAttendanceSummary } = require("../controllers/attendanceController");

router.use(auth);
router.post("/mark-login", auth, markLoginTime);
router.post("/mark-logout", auth, markLogoutTime);
router.get("/report", auth, getAttendanceReport);
router.get("/summary", auth, getAttendanceSummary);

module.exports = router;