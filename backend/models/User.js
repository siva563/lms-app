// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   mobile: { type: String, required: true, unique: true },
//   passwordHash: { type: String, required: true },

//   role: {
//     type: String,
//     enum: ["superadmin", "admin", "instructor", "student"],
//     required: true,
//   },

//   institutionId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Institution",
//     required: true,
//   },

//   assignedSubjects: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Subject",
//   }],

//   // ✅ NEW FIELDS
//   batchId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Batch",
//   },

//   studentId: {
//     type: String,
//     unique: true,
//     sparse: true
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },

//   resetToken: String,
//   resetTokenExpires: Date
// });

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },

  role: {
    type: String,
    enum: ["superadmin", "admin", "instructor", "student"],
    required: true,
  },

  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    required: true,
  },

  assignedSubjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  }],

  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
  },

  studentId: {
    type: String,
    unique: true,
    sparse: true,
  },

  profilePic: {
    type: String, // 📸 (file path or cloud URL)
  },

  // 🔵 Education
  education: {
    ssc: {
      percentage: String,
      schoolName: String,
      board: { type: String, enum: ["State", "CBSE"], default: "State" }
    },
    intermediate: {
      percentage: String,
      collegeName: String,
      group: { type: String, enum: ["MPC", "BiPC", "CEC", "MEC", "HEC", "Other"] }
    },
    graduation: {
      degree: { type: String, enum: ["B.Tech", "BE", "BSc", "B.Com", "BCA", "M.Com", "M.Sc", "Other"] },
      percentage: String,
      collegeName: String,
      university: String
    }
  },

  // 🔵 Address
  address: {
    village: String,
    mandal: String,
    district: String,
    state: String,
    pincode: String,
  },

  githubProfile: {
    type: String,
  },

  linkedinProfile: {
    type: String,
  },

  resume: {
    type: String, // 📄 (file path or cloud URL)
  },

  resetToken: String,
  resetTokenExpires: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
