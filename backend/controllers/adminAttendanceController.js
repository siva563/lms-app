const User = require("../models/User");
const Batch = require("../models/Batch");
const Attendance = require("../models/Attendance");

function getWorkingDaysBetween(fromDate, toDate) {
    const day = 1000 * 60 * 60 * 24;
    let count = 0;
    const current = new Date(fromDate);
    while (current <= toDate) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) count++; // skip Sunday, Saturday
        current.setDate(current.getDate() + 1);
    }
    return count;
}

exports.getAttendanceSummary = async (req, res) => {
    try {
        const { batchId, studentId, from, to } = req.query;

        const institutionId = req.user.institutionId;

        // Filter students
        const studentQuery = {
            role: "student",
            institutionId,
            ...(batchId && { batchId }),
            ...(studentId && { _id: studentId }),
        };

        const students = await User.find(studentQuery)
            .populate("batchId", "name startDate endDate startTime")
            .select("name batchId");

        const fromDate = from ? new Date(from) : new Date();
        const toDate = to ? new Date(to) : new Date();

        const result = [];

        for (const student of students) {
            const attendance = await Attendance.find({
                studentId: student._id,
                date: { $gte: fromDate, $lte: toDate }
            });

            const presentDays = attendance.length;
            const lateDays = attendance.filter((a) => {
                if (!a.loginTime) return false;
                const loginTime = new Date(a.loginTime).toTimeString().slice(0, 5);
                const threshold = student.batchId.startTime || "09:30";
                return loginTime > threshold;
            }).length;

            const totalWorkingDays = getWorkingDaysBetween(fromDate, toDate);
            const absentDays = totalWorkingDays - presentDays;

            const percentage = totalWorkingDays === 0 ? 0 : ((presentDays / totalWorkingDays) * 100).toFixed(1);

            result.push({
                studentId: student._id,
                name: student.name,
                batchId: student.batchId._id,
                batchName: student.batchId.name,
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
