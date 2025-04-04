const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Institution = require("../models/Institution");

const JWT_SECRET = process.env.JWT_SECRET;

// Register
exports.registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password, role, institutionId } = req.body;

        // Check for existing email or mobile
        const existing = await User.findOne({ $or: [{ email }, { mobile }] });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            mobile,
            passwordHash,
            role,
            institutionId,
        });

        res.status(201).json({ message: "User registered", userId: user._id });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).populate("institutionId");

        console.log("User found:", user);
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        console.log("Password match:", isMatch);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            {
                _id: user._id,
                userId: user._id,
                role: user.role,
                institutionId: user.institutionId._id,
                batchId: user.batchId
            },
            JWT_SECRET,
            { expiresIn: "2d" }
        );

        // res.json({
        //     token,
        //     user: {
        //         id: user._id,
        //         name: user.name,
        //         email: user.email,
        //         role: user.role,
        //         institution: user.institutionId.name,
        //     },
        // });
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                institution: {
                    id: user.institutionId._id,       // ✅ Fix this line
                    name: user.institutionId.name,
                    code: user.institutionId.code
                },
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.setNewPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
        resetToken: token,
        resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.passwordHash = hashed;
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();

    res.json({ message: "✅ Password set successfully! Please login now." });
};
