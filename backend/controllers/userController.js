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
    //     const htmlContent = `
    //   <h3>Hello ${user.name},</h3>
    //   <p>Welcome to CodeBegun LMS! Click below to set your password:</p>
    //   <a href="${resetLink}" style="padding:10px 20px; background:#28a745; color:#fff; text-decoration:none;">Set Password</a>
    //   <p>This link expires in 2 hours.</p>
    // `;

    const htmlContent = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
      
      <h2 style="color: #2e86de;">Hey ${user.name},</h2>
      <p style="font-size: 16px; font-weight: bold;">🎉 Welcome to the CodeBegun Family!</p>

      <p style="font-size: 15px; line-height: 1.6;">
        We’re excited to have you on board! You’ve just taken the first step towards becoming a job-ready developer.
        At CodeBegun, we focus on <strong>real-world projects, AI-powered assessments</strong>, and <strong>placement support</strong> to help you stand out in the tech world.
      </p>

      <p style="font-size: 15px; margin-top: 20px;">Set your password now to access your dashboard:</p>

      <div style="text-align: center; margin: 25px 0;">
        <a href="${resetLink}" style="padding: 12px 24px; background-color: #2e86de; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Set My Password</a>
      </div>

      <p style="font-size: 14px; color: #555;">⚠️ Note: This link will expire in 2 hours for your security.</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

      <h3 style="color: #444;">📚 Our Popular Courses:</h3>
      <ul style="font-size: 14px; line-height: 1.8; color: #333; padding-left: 20px;">
        <li>Full Stack Java Development</li>
        <li>Full Stack Python Development</li>
        <li>.NET Full Stack Development</li>
        <li>Frontend Development (React.js, Angular)</li>
        <li>Data Science & Analytics</li>
        <li>AI-Powered Interview Preparation</li>
      </ul>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

      <p style="font-size: 15px;">📞 Need help? Call or WhatsApp: <strong>+91 6301099587</strong></p>
      <p style="font-size: 15px;">🌐 Visit us: <a href="https://codebegun.com" target="_blank" style="color: #2e86de;">www.codebegun.com</a></p>

      <p style="font-size: 14px; margin-top: 10px;">💬 Get instant support: <a href="https://wa.me/916301099587" target="_blank" style="color: #28a745;">Chat on WhatsApp</a></p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

      <p style="text-align: center;">
        <a href="https://www.linkedin.com/company/codebegun" target="_blank" style="margin: 0 10px;"><img src="https://cdn-icons-png.flaticon.com/24/145/145807.png " alt="LinkedIn"/></a>
        <a href="https://www.instagram.com/codebegun" target="_blank" style="margin: 0 10px;"><img src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png" alt="Instagram"/></a>
        <a href="https://www.youtube.com/@codebegun" target="_blank" style="margin: 0 10px;"><img src="https://cdn-icons-png.flaticon.com/24/1384/1384060.png" alt="YouTube"/></a>
      </p>

      <p style="font-size: 13px; color: #777; text-align: center; margin-top: 25px;">
        CodeBegun<br/>
        Plot No.4, Flat N0.102, SM Reddy Complex, House No.1-98/8/9/A, Madhapur,<br/>
        Hyderabad - 500081, Telangana, India
      </p>

      <p style="font-size: 12px; color: #aaa; text-align: center;">
        You received this email because you signed up with CodeBegun. If you did not request this, please ignore this message.
      </p>
    </div>
  </div>
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

exports.getAllStudents = async (req, res) => {
  try {
    const institutionId = req.user.institutionId;

    const students = await User.find({
      institutionId,
      role: "student",
    }).select("_id name batchId");

    res.json(students);
  } catch (err) {
    console.error("❌ Failed to fetch students:", err);
    res.status(500).json({ message: "Server error" });
  }
};