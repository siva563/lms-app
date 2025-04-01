const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Institution = require("../models/Institution");

const router = express.Router();

// TEMPORARY: Seed Super Admin + Institution
router.post("/init-superadmin", async (req, res) => {
    try {
        const existing = await User.findOne({ email: "admin@codebegun.com" });
        if (existing) return res.status(400).json({ message: "Admin already exists" });

        const institution = await Institution.create({
            name: "CodeBegun",
            code: "CB2025"
        });

        const passwordHash = await bcrypt.hash("admin123", 10);

        const user = await User.create({
            name: "Super Admin",
            email: "admin@codebegun.com",
            mobile: "9999999999",
            passwordHash,
            role: "superadmin",
            institutionId: institution._id
        });

        res.json({ message: "Super Admin created", user });
    } catch (err) {
        console.error("Seeder error:", err);
        res.status(500).json({ message: "Setup failed", error: err.message });
    }
});

module.exports = router;
