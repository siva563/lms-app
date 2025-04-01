const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    batchSize: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ["Online", "Offline"],
        required: true,
    },
    institutionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institution",
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Batch", batchSchema);
