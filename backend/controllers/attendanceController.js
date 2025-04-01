const Attendance = require("../models/Attendance");
const User = require("../models/User");

exports.markLoginTime = async (req, res) => {
    try {
        const studentId = req.user._id;
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const { latitude, longitude } = req.body;

        const student = await User.findById(studentId);
        if (!student || student.role !== "student") {
            return res.status(403).json({ message: "Access denied." });
        }

        const existing = await Attendance.findOne({ studentId, date: today });
        if (existing) {
            return res.status(400).json({ message: "Attendance already marked today." });
        }

        const attendance = new Attendance({
            studentId,
            batchId: student.batchId,
            date: today,
            loginTime: new Date(),
            location: { latitude, longitude },
        });

        await attendance.save();
        res.json({ message: "✅ Login time marked successfully." });

    } catch (err) {
        console.error("Error in markLoginTime:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.markLogoutTime = async (req, res) => {
    try {
        const studentId = req.user._id;
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

        const record = await Attendance.findOne({ studentId, date: today });
        if (!record) {
            return res.status(404).json({ message: "No login record found for today." });
        }

        if (record.logoutTime) {
            return res.status(400).json({ message: "Logout already marked." });
        }

        const logoutTime = new Date();
        const duration = Math.round((logoutTime - record.loginTime) / (1000 * 60)); // in minutes

        record.logoutTime = logoutTime;
        record.durationMinutes = duration;
        await record.save();

        res.json({ message: "✅ Logout time marked successfully." });
    } catch (err) {
        console.error("Error in markLogoutTime:", err);
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

exports.getAttendanceSummary = async (req, res) => {
    try {
        const { batchId, studentId, month } = req.query;

        if (!batchId || !month) {
            return res.status(400).json({ message: "Batch and month are required" });
        }

        const start = new Date(`${month}-01`);
        const end = new Date(start);
        end.setMonth(start.getMonth() + 1);

        const query = {
            batchId,
            date: { $gte: start.toISOString().slice(0, 10), $lt: end.toISOString().slice(0, 10) }
        };

        if (studentId) query.studentId = studentId;

        const records = await Attendance.find(query);

        const presentDays = new Set(records.map(r => r.date));
        const totalPresent = presentDays.size;

        // Generate total working days in month (weekdays only, Mon-Fri)
        const workingDays = [];
        for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
            const day = d.getDay();
            if (day !== 0 && day !== 6) { // exclude Sunday (0) and Saturday (6)
                workingDays.push(d.toISOString().slice(0, 10));
            }
        }

        const totalDays = workingDays.length;
        const totalAbsent = totalDays - totalPresent;

        res.json({
            totalDays,
            totalPresent,
            totalAbsent
        });

    } catch (err) {
        console.error("Attendance summary error:", err);
        res.status(500).json({ message: "Failed to fetch summary" });
    }
};


