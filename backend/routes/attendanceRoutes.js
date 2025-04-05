const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { markLoginTime, markLogoutTime, getAttendanceReport, getAttendanceSummary, getAttendanceCalendar, getCalendarView, getTodayAttendance,getCourseSummary } = require("../controllers/attendanceController");
const { getCourseCompletion, getStudentRank, getExamSummary } = require("../controllers/progressController");

router.use(auth);
router.post("/mark-login", auth, markLoginTime);
router.post("/mark-logout", auth, markLogoutTime);
router.get("/report", auth, getAttendanceReport);
router.get("/summary", auth, getAttendanceSummary);
router.get("/course-progress", auth, getCourseCompletion);
router.get("/batch-rank", auth, getStudentRank);
router.get("/exam-report", auth, getExamSummary);
router.get("/calendar", auth, getAttendanceCalendar);
router.get("/calendar-view", auth, getCalendarView);
router.get("/today", auth, getTodayAttendance);
router.get("/course-summary", auth, getCourseSummary);


module.exports = router;