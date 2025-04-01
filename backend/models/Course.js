const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject", // optional linkage
    }],
    durationInDays: {
        type: Number,
        default: 150,
    },
    price: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // admin who created
        required: true,
    },
    institutionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institution",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Course", courseSchema);
