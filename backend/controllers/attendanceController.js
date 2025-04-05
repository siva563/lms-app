const Attendance = require("../models/Attendance");
const User = require("../models/User");
const Batch = require("../models/Batch");

// exports.markLoginTime = async (req, res) => {
//     try {
//         const studentId = req.user._id;
//         const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
//         const { latitude, longitude } = req.body;

//         const student = await User.findById(studentId);
//         if (!student || student.role !== "student") {
//             return res.status(403).json({ message: "Access denied." });
//         }

//         const existing = await Attendance.findOne({ studentId, date: today });
//         if (existing) {
//             return res.status(400).json({ message: "Attendance already marked today." });
//         }

//         const attendance = new Attendance({
//             studentId,
//             batchId: student.batchId,
//             date: today,
//             loginTime: new Date(),
//             location: { latitude, longitude },
//         });

//         await attendance.save();
//         res.json({ message: "✅ Login time marked successfully." });

//     } catch (err) {
//         console.error("Error in markLoginTime:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// controllers/attendanceController.js

exports.markLoginTime = async (req, res) => {
    try {
        const studentId = req.user._id;
        const batchId = req.user.batchId;

        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

        let attendance = await Attendance.findOne({ studentId, date: today });

        if (!attendance) {
            attendance = new Attendance({
                studentId,
                batchId,
                date: today,
                loginTime: new Date(),
            });
        } else {
            attendance.loginTime = new Date();
        }

        await attendance.save();
        res.json({ message: "Login time marked ✅", loginTime: attendance.loginTime });
    } catch (err) {
        console.error("Error marking login:", err);
        res.status(500).json({ message: "Server error" });
    }
};


// exports.markLogoutTime = async (req, res) => {
//     try {
//         const studentId = req.user._id;
//         const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

//         const record = await Attendance.findOne({ studentId, date: today });
//         if (!record) {
//             return res.status(404).json({ message: "No login record found for today." });
//         }

//         if (record.logoutTime) {
//             return res.status(400).json({ message: "Logout already marked." });
//         }

//         const logoutTime = new Date();
//         const duration = Math.round((logoutTime - record.loginTime) / (1000 * 60)); // in minutes

//         record.logoutTime = logoutTime;
//         record.durationMinutes = duration;
//         await record.save();

//         res.json({ message: "✅ Logout time marked successfully." });
//     } catch (err) {
//         console.error("Error in markLogoutTime:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// controllers/attendanceController.js

exports.markLogoutTime = async (req, res) => {
    try {
        const studentId = req.user._id;
        const today = new Date().toISOString().slice(0, 10);

        const attendance = await Attendance.findOne({ studentId, date: today });
        if (!attendance) {
            return res.status(400).json({ message: "No login record found today." });
        }

        attendance.logoutTime = new Date();

        // calculate total duration in minutes
        if (attendance.loginTime && attendance.logoutTime) {
            const durationMs = attendance.logoutTime - attendance.loginTime;
            attendance.durationMinutes = Math.floor(durationMs / 60000); // minutes
        }

        await attendance.save();
        res.json({ message: "Logout time marked ✅", logoutTime: attendance.logoutTime });
    } catch (err) {
        console.error("Error marking logout:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getTodayAttendance = async (req, res) => {
    try {
        const studentId = req.user._id;
        const today = new Date().toISOString().slice(0, 10);

        const attendance = await Attendance.findOne({ studentId, date: today });

        if (!attendance) {
            return res.json({ message: "No attendance marked today yet." });
        }

        res.json(attendance);
    } catch (err) {
        console.error("Error fetching today's attendance:", err);
        res.status(500).json({ message: "Server error" });
    }
};


exports.getAttendanceReport = async (req, res) => {
    try {
        const { batchId, studentId, month } = req.query;

        const query = {};

        if (batchId) query.batchId = batchId;
        if (studentId) query.studentId = studentId;
        if (month) {
            const start = new Date(`${month}-01`);
            const end = new Date(start);
            end.setMonth(start.getMonth() + 1);
            query.date = { $gte: start.toISOString().slice(0, 10), $lt: end.toISOString().slice(0, 10) };
        }

        const records = await Attendance.find(query)
            .populate("studentId", "name email")
            .populate("batchId", "name")
            .sort({ date: 1 });

        res.json(records);
    } catch (err) {
        console.error("Attendance Report Error:", err);
        res.status(500).json({ message: "Failed to load attendance report" });
    }
};

// exports.getAttendanceSummary = async (req, res) => {
//     try {
//         const { batchId, studentId, month } = req.query;

//         if (!batchId || !month) {
//             return res.status(400).json({ message: "Batch and month are required" });
//         }

//         const start = new Date(`${month}-01`);
//         const end = new Date(start);
//         end.setMonth(start.getMonth() + 1);

//         const query = {
//             batchId,
//             date: { $gte: start.toISOString().slice(0, 10), $lt: end.toISOString().slice(0, 10) }
//         };

//         if (studentId) query.studentId = studentId;

//         const records = await Attendance.find(query);

//         const presentDays = new Set(records.map(r => r.date));
//         const totalPresent = presentDays.size;

//         // Generate total working days in month (weekdays only, Mon-Fri)
//         const workingDays = [];
//         for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
//             const day = d.getDay();
//             if (day !== 0 && day !== 6) { // exclude Sunday (0) and Saturday (6)
//                 workingDays.push(d.toISOString().slice(0, 10));
//             }
//         }

//         const totalDays = workingDays.length;
//         const totalAbsent = totalDays - totalPresent;

//         res.json({
//             totalDays,
//             totalPresent,
//             totalAbsent
//         });

//     } catch (err) {
//         console.error("Attendance summary error:", err);
//         res.status(500).json({ message: "Failed to fetch summary" });
//     }
// };


exports.getAttendanceCalendar = async (req, res) => {
    try {
        const studentId = req.user._id;
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ message: "Month is required (YYYY-MM)" });
        }

        const start = new Date(`${month}-01`);
        const end = new Date(start);
        end.setMonth(start.getMonth() + 1);

        // Fetch only that student's records for the month
        const records = await Attendance.find({
            studentId,

            date: { $gte: start.toISOString().slice(0, 10), $lt: end.toISOString().slice(0, 10) },
        });

        // Map by date
        const recordMap = {};
        records.forEach((r) => {
            recordMap[r.date] = {
                date: r.date,
                status: "present",
                loginTime: new Date(r.loginTime).toLocaleTimeString(),
                logoutTime: r.logoutTime ? new Date(r.logoutTime).toLocaleTimeString() : null,
            };
        });

        // Fill absent days (weekdays only)
        const results = [];
        const today = new Date();
        for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().slice(0, 10);
            const day = d.getDay(); // 0=Sun, 6=Sat

            // Optional: only mark Mon–Fri as working days
            if (day === 0 || day === 6) continue;

            if (recordMap[dateStr]) {
                results.push(recordMap[dateStr]);
            } else if (d < today) {
                results.push({ date: dateStr, status: "absent" });
            }
        }

        res.json(results);
    } catch (err) {
        console.error("📅 Calendar fetch error:", err);
        res.status(500).json({ message: "Failed to load attendance calendar" });
    }
};

exports.getAttendanceSummary = async (req, res) => {
    try {
        const { month } = req.query;
        const userId = req.user._id;

        if (!month) {
            return res.status(400).json({ message: "Month is required" });
        }

        // Your logic to calculate present days for userId in that month...
        // Example:
        const start = new Date(`${month}-01`);
        const end = new Date(start);
        end.setMonth(start.getMonth() + 1);

        const records = await Attendance.find({
            studentId: userId,
            date: { $gte: start.toISOString().slice(0, 10), $lt: end.toISOString().slice(0, 10) },
        });

        res.json({ totalPresent: records.length });
    } catch (err) {
        console.error("❌ Summary error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// exports.getCalendarView = async (req, res) => {
//     try {
//         const { month } = req.query;
//         const studentId = req.user._id;

//         if (!month) {
//             return res.status(400).json({ message: "Month is required" });
//         }

//         const start = new Date(`${month}-01`);
//         const end = new Date(start);
//         end.setMonth(start.getMonth() + 1);

//         const attendance = await Attendance.find({
//             studentId,
//             date: { $gte: start.toISOString().slice(0, 10), $lt: end.toISOString().slice(0, 10) },
//         }).sort({ date: 1 });

//         res.json(attendance);
//     } catch (err) {
//         console.error("❌ Error fetching calendar view:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// exports.getCalendarView = async (req, res) => {
//     try {
//         const { from, to } = req.query;
//         const studentId = req.user._id;

//         if (!from || !to) {
//             return res.status(400).json({ message: "Both 'from' and 'to' dates are required" });
//         }

//         const fromDate = new Date(from);
//         const toDate = new Date(to);
//         toDate.setDate(toDate.getDate() + 1); // Include the end day

//         const attendance = await Attendance.find({
//             studentId,
//             date: {
//                 $gte: fromDate.toISOString().slice(0, 10),
//                 $lt: toDate.toISOString().slice(0, 10),
//             },
//         }).sort({ date: 1 });

//         res.json(attendance);
//     } catch (err) {
//         console.error("❌ Error fetching calendar view:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// exports.getCalendarView = async (req, res) => {
//     try {
//         const { from, to } = req.query;
//         const studentId = req.user._id;

//         const student = await User.findById(studentId).select("batchId");
//         const batch = await Batch.findById(student.batchId).select("startTime");

//         const startTimeThreshold = batch?.startTime || "09:30"; // fallback if batch doesn't have it

//         const fromDate = new Date(from);
//         const toDate = new Date(to);
//         toDate.setDate(toDate.getDate() + 1); // include full day

//         console.log("📅 FromDate:", fromDate.toISOString());
//         console.log("📅 ToDate:", toDate.toISOString());
//         console.log("📦 Student ID:", studentId);

//         const attendance = await Attendance.find({
//             studentId,
//             date: { $gte: fromDate, $lt: toDate } // ✅ FIXED HERE
//         }).sort({ date: 1 });

//         const data = attendance.map((record) => {
//             let status = "Leave";
//             if (record.loginTime) {
//                 const login = new Date(record.loginTime).toTimeString().slice(0, 5); // 'HH:mm'
//                 status = login > startTimeThreshold ? "Late" : "On-Time";
//             }
//             return {
//                 ...record.toObject(),
//                 status,
//             };
//         });

//         res.json(data);
//     } catch (err) {
//         console.error("❌ Error in calendar view:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

exports.getCalendarView = async (req, res) => {
    try {
        const { from, to } = req.query;
        const studentId = req.user._id;

        const student = await User.findById(studentId).select("batchId");
        const batch = await Batch.findById(student.batchId).select("startTime");

        const startTimeThreshold = batch?.startTime || "09:30";

        const fromDate = new Date(from);
        const toDate = new Date(to);
        toDate.setDate(toDate.getDate() + 1); // include the full 'to' day

        const attendanceRecords = await Attendance.find({
            studentId,
            date: { $gte: fromDate, $lt: toDate },
        }).sort({ date: 1 });

        let lateDaysCount = 0;
        let presentDaysCount = 0;

        const records = attendanceRecords.map((record) => {
            let status = "Leave";

            if (record.loginTime) {
                presentDaysCount++;
                const login = new Date(record.loginTime).toTimeString().slice(0, 5); // HH:mm
                status = login > startTimeThreshold ? "Late" : "On-Time";
                if (status === "Late") lateDaysCount++;
            }

            return {
                ...record.toObject(),
                status,
            };
        });

        res.json({
            records,
            lateDaysCount,
            presentDaysCount,
        });
    } catch (err) {
        console.error("❌ Error in getCalendarView:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// controllers/attendanceController.js


exports.getCourseSummary = async (req, res) => {
    try {
        const studentId = req.user._id;
        const student = await User.findById(studentId).select("batchId name");

        if (!student || !student.batchId) {
            return res.status(400).json({ message: "Batch not found for student" });
        }

        const batch = await Batch.findById(student.batchId).select("startDate endDate");

        if (!batch) {
            return res.status(400).json({ message: "Batch not found" });
        }

        const startDate = new Date(batch.startDate);
        const endDate = new Date(batch.endDate);
        const today = new Date();

        // Calculate total course days (weekdays only Mon–Fri)
        let totalDays = 0;
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            if (d.getDay() !== 0 && d.getDay() !== 6) { // Skip Saturday(6) and Sunday(0)
                totalDays++;
            }
        }

        // Fetch present attendance
        const attendanceRecords = await Attendance.find({
            studentId,
            date: { $gte: startDate.toISOString().slice(0, 10), $lte: today.toISOString().slice(0, 10) },
        });

        const presentDays = attendanceRecords.length;

        // Days completed till now
        let completedWorkingDays = 0;
        for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
            if (d.getDay() !== 0 && d.getDay() !== 6) {
                completedWorkingDays++;
            }
        }

        const absentDays = completedWorkingDays - presentDays;
        const futureWorkingDays = totalDays - completedWorkingDays;
        const daysLeft = futureWorkingDays;

        res.json({
            studentName: student.name,
            totalDays,
            presentDays,
            absentDays,
            daysLeft,
            batchEndDate: batch.endDate,
        });
    } catch (err) {
        console.error("❌ Error in getCourseSummary:", err);
        res.status(500).json({ message: "Server error" });
    }
};
