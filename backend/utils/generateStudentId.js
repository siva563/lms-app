const User = require("../models/User")

const generateStudentId = async () => {
  const year = new Date().getFullYear();
  const prefix = `${year}CB`;

  const lastStudent = await User.findOne({ studentId: new RegExp(`^${prefix}`) })
    .sort({ createdAt: -1 });

  let nextNumber = 1;
  if (lastStudent && lastStudent.studentId) {
    const last = parseInt(lastStudent.studentId.slice(-4), 10);
    nextNumber = last + 1;
  }

  const padded = String(nextNumber).padStart(4, '0');
  return `${prefix}${padded}`;
};

module.exports = generateStudentId;
