const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
        required: true,
    },

    date: {
        type: Date, // Format: 'YYYY-MM-DD'
        required: true,
    },

    loginTime: {
        type: Date,
        required: true,
    },

    logoutTime: {
        type: Date,
    },

    durationMinutes: {
        type: Number,
    },

    location: {
        latitude: Number,
        longitude: Number,
    },
}, { timestamps: true });

// Ensure only one attendance per student per day
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
