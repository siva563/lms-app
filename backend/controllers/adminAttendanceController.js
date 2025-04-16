const User = require("../models/User");
const Batch = require("../models/Batch");
const Attendance = require("../models/Attendance");

// function getWorkingDaysBetween(fromDate, toDate) {
//     const day = 1000 * 60 * 60 * 24;
//     let count = 0;
//     const current = new Date(fromDate);
//     while (current <= toDate) {
//         const dayOfWeek = current.getDay();
//         if (dayOfWeek !== 0 && dayOfWeek !== 6) count++; // Monday to Friday only
//         current.setDate(current.getDate() + 1);
//     }
//     return count;
// }

function getWorkingDaysBetween(startDate, endDate) {
    let count = 0;
    const current = new Date(startDate);

    while (current <= endDate) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) { // Exclude Sunday(0) and Saturday(6)
            count++;
        }
        current.setDate(current.getDate() + 1);
    }
    return count;
}

// exports.getAttendanceSummary = async (req, res) => {
//     try {
//         const { batchId, studentId, from, to } = req.query;

//         const institutionId = req.user.institutionId;

//         // Build student query
//         const studentQuery = {
//             role: "student",
//             institutionId,
//             ...(batchId && { batchId }),
//             ...(studentId && { _id: studentId }),
//         };

//         const students = await User.find(studentQuery)
//             .populate("batchId", "name startDate endDate startTime")
//             .select("name batchId");

//         const fromDate = from ? new Date(from) : new Date();
//         const toDate = to ? new Date(to) : new Date();

//         const result = [];

//         for (const student of students) {
//             const attendance = await Attendance.find({
//                 studentId: student._id,
//                 date: { $gte: fromDate, $lte: toDate }
//             });

//             const presentDays = attendance.length;

//             const threshold = student.batchId?.startTime || "09:30"; // ✅ safe chaining

//             const lateDays = attendance.filter((a) => {
//                 if (!a.loginTime) return false;
//                 const loginTime = new Date(a.loginTime).toTimeString().slice(0, 5);
//                 return loginTime > threshold;
//             }).length;

//             const totalWorkingDays = getWorkingDaysBetween(fromDate, toDate);
//             const absentDays = totalWorkingDays - presentDays;
//             const percentage = totalWorkingDays === 0 ? 0 : ((presentDays / totalWorkingDays) * 100).toFixed(1);

//             result.push({
//                 studentId: student._id,
//                 name: student.name,
//                 batchId: student.batchId?._id || null,
//                 batchName: student.batchId?.name || "No Batch Assigned",
//                 totalWorkingDays,
//                 presentDays,
//                 lateDays,
//                 absentDays,
//                 percentage,
//             });
//         }

//         res.json(result);
//     } catch (err) {
//         console.error("❌ Error in getAttendanceSummary:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

exports.getAttendanceSummary = async (req, res) => {
    try {
        const { batchId, studentId, from, to } = req.query;
        const institutionId = req.user.institutionId;

        if (!from || !to) {
            return res.status(400).json({ message: "From and To dates are required." });
        }

        const fromDate = new Date(from);
        const toDate = new Date(to);

        // Build student query
        const studentQuery = {
            role: "student",
            institutionId,
            ...(batchId && { batchId }),
            ...(studentId && { _id: studentId }),
        };

        const students = await User.find(studentQuery)
            .populate("batchId", "name startDate endDate startTime")
            .select("name batchId");

        const result = [];

        for (const student of students) {
            // ✅ Always freshly fetch Attendance
            const attendance = await Attendance.find({
                studentId: student._id,
                date: { $gte: fromDate.toISOString().slice(0, 10), $lte: toDate.toISOString().slice(0, 10) }
            });

            const presentDays = attendance.length;

            const threshold = student.batchId?.startTime || "09:30";

            const lateDays = attendance.filter((record) => {
                if (!record.loginTime) return false;
                const login = new Date(record.loginTime).toTimeString().slice(0, 5);
                return login > threshold;
            }).length;

            const totalWorkingDays = getWorkingDaysBetween(fromDate, toDate);
            const absentDays = Math.max(0, totalWorkingDays - presentDays);
            const percentage = totalWorkingDays > 0 ? ((presentDays / totalWorkingDays) * 100).toFixed(1) : "0.0";

            result.push({
                studentId: student._id,
                name: student.name,
                batchId: student.batchId?._id || null,
                batchName: student.batchId?.name || "No Batch Assigned",
                totalWorkingDays,
                presentDays,
                lateDays,
                absentDays,
                percentage,
            });
        }

        res.json(result);
    } catch (err) {
        console.error("❌ Error in getAttendanceSummary:", err);
        res.status(500).json({ message: "Server error" });
    }
};


exports.addAttendance = async (req, res) => {
    try {
        const { studentId, date, loginTime, logoutTime } = req.body;

        // Validate student
        const student = await User.findOne({ _id: studentId, role: "student" });
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        // Check if already marked
        const existing = await Attendance.findOne({ studentId, date });
        if (existing) {
            return res.status(400).json({ message: "Attendance already exists for this date." });
        }

        const login = loginTime ? new Date(loginTime) : null;
        const logout = logoutTime ? new Date(logoutTime) : null;
        let durationMinutes = null;
        if (login && logout) {
            durationMinutes = Math.floor((logout - login) / 60000); // in minutes
        }

        const newAttendance = new Attendance({
            studentId,
            batchId: student.batchId,
            date,
            loginTime: login,
            logoutTime: logout,
            durationMinutes,
        });

        await newAttendance.save();

        res.json({ message: "Attendance added successfully ✅" });
    } catch (err) {
        console.error("❌ Error in addAttendance:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// exports.editAttendance = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { loginTime, logoutTime } = req.body;

//         const attendance = await Attendance.findById(id);
//         if (!attendance) {
//             return res.status(404).json({ message: "Attendance record not found." });
//         }

//         if (loginTime) attendance.loginTime = new Date(loginTime);
//         if (logoutTime) attendance.logoutTime = new Date(logoutTime);

//         // Recalculate duration
//         if (attendance.loginTime && attendance.logoutTime) {
//             attendance.durationMinutes = Math.floor((attendance.logoutTime - attendance.loginTime) / 60000);
//         }

//         await attendance.save();

//         res.json({ message: "Attendance updated successfully ✅" });
//     } catch (err) {
//         console.error("❌ Error in editAttendance:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// controllers/adminAttendanceController.js

// controllers/adminAttendanceController.js

exports.editAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, loginTime, logoutTime } = req.body;

        const record = await Attendance.findById(id);
        if (!record) {
            return res.status(404).json({ message: "Attendance not found" });
        }

        if (date) record.date = date;
        if (loginTime) record.loginTime = new Date(loginTime);
        if (logoutTime) record.logoutTime = new Date(logoutTime);

        // ✅ Validation: loginTime must be before logoutTime
        if (record.loginTime && record.logoutTime && record.loginTime >= record.logoutTime) {
            return res.status(400).json({ message: "Login Time must be before Logout Time." });
        }

        // ✅ Recalculate duration if both login/logout exist
        if (record.loginTime && record.logoutTime) {
            const diffMs = record.logoutTime - record.loginTime;
            record.durationMinutes = Math.floor(diffMs / 60000); // minutes
        } else {
            record.durationMinutes = 0;
        }

        await record.save();
        res.json({ message: "✅ Attendance updated successfully!" });

    } catch (err) {
        console.error("❌ Error updating attendance:", err);
        res.status(500).json({ message: "Server error" });
    }
};



exports.deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;

        const attendance = await Attendance.findById(id);
        if (!attendance) {
            return res.status(404).json({ message: "Attendance record not found." });
        }

        await attendance.deleteOne();

        res.json({ message: "Attendance deleted successfully ✅" });
    } catch (err) {
        console.error("❌ Error in deleteAttendance:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAttendanceById = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id)
            .populate("studentId", "name")   // get student name
            .populate("batchId", "name");     // get batch name

        if (!attendance) {
            return res.status(404).json({ message: "Attendance not found" });
        }

        res.json({
            _id: attendance._id,
            studentName: attendance.studentId?.name,
            batchName: attendance.batchId?.name,
            date: attendance.date,
            loginTime: attendance.loginTime,
            logoutTime: attendance.logoutTime,
            durationMinutes: attendance.durationMinutes,
            location: attendance.location,
        });
    } catch (err) {
        console.error("Failed to fetch attendance by ID:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// controllers/adminAttendanceController.js

// const Attendance = require("../models/Attendance");
// const User = require("../models/User");
// const Batch = require("../models/Batch");

// exports.getStudentWiseAttendance = async (req, res) => {
//     try {
//         const { batchId, studentId, from, to } = req.query;

//         if (!batchId || !from || !to) {
//             return res.status(400).json({ message: "batchId, from, and to are required" });
//         }

//         // Prepare date range
//         const fromDate = new Date(from);
//         const toDate = new Date(to);
//         toDate.setDate(toDate.getDate() + 1); // Include end date

//         // Build query
//         const query = {
//             batchId,
//             date: { $gte: fromDate, $lt: toDate },
//         };
//         if (studentId) {
//             query.studentId = studentId;
//         }

//         const records = await Attendance.find(query)
//             .populate("studentId", "name")   // only name
//             .populate("batchId", "name")      // only batch name
//             .sort({ date: 1 });

//         const formatted = records.map((rec) => ({
//             _id: rec._id,
//             date: rec.date,
//             loginTime: rec.loginTime,
//             logoutTime: rec.logoutTime,
//             durationMinutes: rec.durationMinutes,
//             studentName: rec.studentId?.name || "-",
//             batchName: rec.batchId?.name || "-",
//         }));

//         res.json(formatted);

//     } catch (err) {
//         console.error("❌ Error fetching student wise attendance:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };



// exports.getStudentWiseAttendance = async (req, res) => {
//     try {
//         const { studentId, from, to } = req.query;

//         if (!studentId || !from || !to) {
//             return res.status(400).json({ message: "Student ID, From, and To dates are required." });
//         }

//         const fromDate = new Date(from);
//         const toDate = new Date(to);
//         toDate.setDate(toDate.getDate() + 1); // ✅ Include end date

//         // Fetch attendance records
//         const attendanceRecords = await Attendance.find({
//             studentId,
//             date: { $gte: fromDate.toISOString().slice(0, 10), $lt: toDate.toISOString().slice(0, 10) },
//         }).sort({ date: 1 });

//         // Fetch student and batch information
//         const student = await User.findById(studentId).populate("batchId", "name");

//         const enrichedRecords = attendanceRecords.map(record => ({
//             _id: record._id,
//             date: record.date,
//             loginTime: record.loginTime,
//             logoutTime: record.logoutTime,
//             durationMinutes: record.durationMinutes,
//             batchName: student?.batchId?.name || "No Batch Assigned",
//             studentName: student?.name || "Unknown",
//         }));

//         res.json(enrichedRecords);
//     } catch (err) {
//         console.error("❌ Error fetching student attendance:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// ✅ controllers/adminAttendanceController.js



exports.getStudentWiseAttendance = async (req, res) => {
    try {
        const { studentId, from, to } = req.query;

        if (!studentId || !from || !to) {
            return res.status(400).json({ message: "Student ID, from, and to dates are required." });
        }

        // Fetch attendance records
        const records = await Attendance.find({
            studentId,
            date: { $gte: from, $lte: to },
        }).sort({ date: 1 });

        // Fetch student details
        const student = await User.findById(studentId)
            .select("name batchId")
            .populate("batchId", "name");

        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        res.json({
            records,
            student: {
                _id: student._id,
                name: student.name,
                batchName: student.batchId ? student.batchId.name : "No Batch Assigned",
            }
        });

    } catch (err) {
        console.error("❌ Error fetching student-wise attendance:", err);
        res.status(500).json({ message: "Server error" });
    }
};
