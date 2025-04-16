// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const { markLoginTime, markLogoutTime, getAttendanceReport, getAttendanceSummary, getAttendanceCalendar, getCalendarView, getTodayAttendance, getCourseSummary } = require("../controllers/attendanceController");
// const { getCourseCompletion, getStudentRank, getExamSummary } = require("../controllers/progressController");
// const { addAttendance, editAttendance, deleteAttendance, getAttendanceById, getStudentWiseAttendance } = require("../controllers/adminAttendanceController");

// router.use(auth);
// router.post("/mark-login", auth, markLoginTime);
// router.post("/mark-logout", auth, markLogoutTime);
// router.get("/report", auth, getAttendanceReport);
// router.get("/summary", auth, getAttendanceSummary);
// router.get("/course-progress", auth, getCourseCompletion);
// router.get("/batch-rank", auth, getStudentRank);
// router.get("/exam-report", auth, getExamSummary);
// router.get("/calendar", auth, getAttendanceCalendar);
// router.get("/calendar-view", auth, getCalendarView);
// router.get("/today", auth, getTodayAttendance);
// router.get("/course-summary", auth, getCourseSummary);
// router.post("/add", addAttendance);       // ➕ Add
// router.put("/:id", editAttendance);   // ✏️ Edit
// router.delete("/:id", deleteAttendance); // ❌ Delete
// router.get("/:id", getAttendanceById);
// router.get("/student-wise", getStudentWiseAttendance);


// module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
    markLoginTime,
    markLogoutTime,
    getAttendanceReport,
    getAttendanceSummary,
    getAttendanceCalendar,
    getCalendarView,
    getTodayAttendance,
    getCourseSummary
} = require("../controllers/attendanceController");

const {
    addAttendance,
    editAttendance,
    deleteAttendance,
    getAttendanceById,
    getStudentWiseAttendance
} = require("../controllers/adminAttendanceController");

// ✅ Middleware
router.use(auth);

// ✅ Normal routes
router.post("/mark-login", markLoginTime);
router.post("/mark-logout", markLogoutTime);
router.get("/report", getAttendanceReport);
router.get("/summary", getAttendanceSummary);
router.get("/calendar", getAttendanceCalendar);
router.get("/calendar-view", getCalendarView);
router.get("/today", getTodayAttendance);
//router.get("/course-progress", getCourseCompletion);
//router.get("/batch-rank", getStudentRank);
//router.get("/exam-report", getExamSummary);
router.get("/course-summary", getCourseSummary);

// ✅ Special Admin Routes (ATTENDANCE CRUD)
router.post("/add", addAttendance);
router.get("/student-wise", getStudentWiseAttendance);  // 🛑 Must come BEFORE `/:id`
router.get("/:id", getAttendanceById);                   // Dynamic route should be LAST
router.put("/:id", editAttendance);
router.delete("/:id", deleteAttendance);

module.exports = router;
