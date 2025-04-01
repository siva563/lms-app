const User = require("../models/User");
const bcrypt = require("bcrypt");
const Institution = require("../models/Institution");
const generateStudentId = require("../utils/generateStudentId");
const crypto = require("crypto");
const sendEmail = require("../utils/mailer");
// Create User (by Super Admin or Admin)
// exports.createUser = async (req, res) => {
//   try {
//     const { name, email, mobile, password, role, institutionId, assignedSubjects } = req.body;

//     const existing = await User.findOne({ $or: [{ email }, { mobile }] });
//     if (existing) return res.status(400).json({ message: "User already exists" });

//     const passwordHash = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       mobile,
//       passwordHash,
//       role,
//       institutionId,
//       assignedSubjects,
//     });

//     res.status(201).json({ message: "User created", userId: user._id });
//   } catch (err) {
//     console.error("Create User:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
      role,
      institutionId,
      assignedSubjects,
      batchId // ✅ optionally passed if student
    } = req.body;

    // 🔍 Check for existing email/mobile
    const existing = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existing) return res.status(400).json({ message: "User already exists" });

    // 🔐 Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const newUserData = {
      name,
      email,
      mobile,
      passwordHash,
      role,
      institutionId,
      assignedSubjects,
    };

    // 👨‍🎓 If student, assign batchId & generate studentId
    if (role === "student") {
      if (!batchId) return res.status(400).json({ message: "Batch is required for students" });

      const studentId = await generateStudentId();
      newUserData.batchId = batchId;
      newUserData.studentId = studentId;
    }

    const user = await User.create(newUserData);

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = Date.now() + 1000 * 60 * 60 * 2; // 2 hours
    console.log("resetToken" + resetToken);
    console.log("resetTokenExpires" + resetTokenExpires);
    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    console.log("user is:" + user);
    const resetLink = `http://192.168.0.109:5173/set-password?token=${resetToken}`;
    const htmlContent = `
  <h3>Hello ${user.name},</h3>
  <p>Welcome to CodeBegun LMS! Click below to set your password:</p>
  <a href="${resetLink}" style="padding:10px 20px; background:#28a745; color:#fff; text-decoration:none;">Set Password</a>
  <p>This link expires in 2 hours.</p>
`;

    await user.save();
    await sendEmail(user.email, "Set Your Password - CodeBegun LMS", htmlContent);
    console.log("📨 Password setup email sent to", user.email);

    res.status(201).json({ message: "User created", userId: user._id });
  } catch (err) {
    console.error("Create User:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Users for the Institution
exports.getUsers = async (req, res) => {
  try {
    const institutionId = req.user.role === "superadmin"
      ? req.query.institutionId
      : req.user.institutionId;

    const users = await User.find({ institutionId }).select("-passwordHash");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Single User
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const user = req.user;
    console.log("🔐 Authenticated user:", user);

    if (!["superadmin", "admin"].includes(user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find({ institutionId: user.institutionId })
      .select("name email role institutionId createdAt")
      .populate("institutionId", "name"); // ✅ Important for frontend

    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// const geolib = require("geolib");
// const Attendance = require("../models/Attendance");
// const User = require("../models/User");

exports.markAttendance = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const studentId = req.user._id;

    const today = new Date().toDateString();

    const existing = await Attendance.findOne({ studentId, date: today });
    if (existing) {
      return res.status(400).json({ message: "Attendance already marked today." });
    }

    // Your campus location
    const CAMPUS_LAT = 17.385044;
    const CAMPUS_LONG = 78.486671;

    const isPresent = geolib.isPointWithinRadius(
      { latitude, longitude },
      { latitude: CAMPUS_LAT, longitude: CAMPUS_LONG },
      50 // meters
    );

    if (!isPresent) {
      return res.status(403).json({ message: "You're not at the campus location." });
    }

    const student = await User.findById(studentId);
    const record = new Attendance({
      studentId,
      batchId: student.batchId,
      date: today,
    });

    await record.save();
    res.json({ message: "✅ Attendance marked successfully!" });

  } catch (err) {
    console.error("Attendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
};




// exports.getAllUsers = async (req, res) => {
//   try {
//     const user = req.user;

//     // Only superadmin or admin can access this
//     if (!["superadmin", "admin"].includes(user.role)) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const users = await User.find({ institutionId: user.institutionId }).select(
//       "name email role institutionId createdAt"
//     ).populate("institutionId", "name");

//     res.json(users);
//   } catch (err) {
//     console.error("❌ Error fetching users:", err);
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// };

// exports.getAllUsers = async (req, res) => {
//   try {
//     const user = req.user;
//     console.log("🔐 Authenticated user:", user);

//     if (!["superadmin", "admin"].includes(user.role)) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const users = await User.find({ institutionId: user.institutionId }).select(
//       "name email role institutionId createdAt"
//     );

//     res.json(users);
//   } catch (err) {
//     console.error("❌ Error fetching users:", err);
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// };