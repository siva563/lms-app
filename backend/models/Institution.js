const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true, // e.g., "CB2025"
    },
    logoUrl: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Institution", institutionSchema);
