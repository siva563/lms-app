// // const mongoose = require("mongoose");

// // const userSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true,
// //   },

// //   email: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //   },

// //   mobile: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //   },

// //   passwordHash: {
// //     type: String,
// //     required: true,
// //   },

// //   role: {
// //     type: String,
// //     enum: ["superadmin", "admin", "instructor", "student"],
// //     required: true,
// //   },

// //   institutionId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "Institution",
// //     required: true,
// //   },

// //   assignedSubjects: [{
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "Subject",
// //   }],

// //   createdAt: {
// //     type: Date,
// //     default: Date.now,
// //   },
// // });

// // module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },

//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },

//   mobile: {
//     type: String,
//     required: true,
//     unique: true,
//   },

//   passwordHash: {
//     type: String,
//     required: true,
//   },

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

//   // ✅ NEW FIELD: Batch Reference
//   batchId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Batch",
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
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

  // ✅ NEW FIELDS
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
  },

  studentId: {
    type: String,
    unique: true,
    sparse: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetToken: String,
  resetTokenExpires: Date
});

module.exports = mongoose.model("User", userSchema);
