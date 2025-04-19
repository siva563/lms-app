const User = require("../models/User");
const Subject = require("../models/Subject");
const Chapter = require("../models/Chapter");
const SubjectAssignment = require("../models/subjectAssignmentModel");



// exports.updateStudentProfile = async (req, res) => {
//     try {
//         const student = await User.findById(req.user._id);

//         if (!student) {
//             return res.status(404).json({ message: "Student not found" });
//         }

//         // Handle File Uploads
//         if (req.files.profilePic) {
//             student.profilePic = req.files.profilePic[0].path; // Cloudinary URL
//         }
//         if (req.files.resume) {
//             student.resume = req.files.resume[0].path; // Cloudinary URL
//         }

//         // Handle Other Form Fields
//         const {
//             education,
//             address,
//             githubProfile,
//             linkedinProfile
//         } = req.body;

//         if (education) student.education = JSON.parse(education);
//         if (address) student.address = JSON.parse(address);
//         if (githubProfile) student.githubProfile = githubProfile;
//         if (linkedinProfile) student.linkedinProfile = linkedinProfile;

//         await student.save();

//         res.json({ message: "Profile updated successfully!" });
//     } catch (err) {
//         console.error("❌ Error updating profile:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

exports.getStudentProfile = async (req, res) => {
    try {
        const student = await User.findById(req.user._id)
            .select("-passwordHash -resetToken -resetTokenExpires") // Hide sensitive fields
            .populate("batchId", "name startDate endDate startTime"); // Optional: If you want to show batch info too

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (err) {
        console.error("❌ Error fetching student profile:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// exports.updateStudentProfile = async (req, res) => {
//     try {
//         const student = await User.findById(req.user._id);

//         if (!student) {
//             return res.status(404).json({ message: "Student not found" });
//         }

//         // Handle File Uploads
//         if (req.files.profilePic) {
//             student.profilePic = req.files.profilePic[0].path;
//         }
//         if (req.files.resume) {
//             student.resume = req.files.resume[0].path;
//         }

//         // Handle Other Form Fields
//         const {
//             education,
//             address,
//             githubProfile,
//             linkedinProfile
//         } = req.body;

//         if (education) student.education = JSON.parse(education);
//         if (address) student.address = JSON.parse(address);
//         if (githubProfile) student.githubProfile = githubProfile;
//         if (linkedinProfile) student.linkedinProfile = linkedinProfile;

//         await student.save();

//         res.json({ message: "Profile updated successfully!" });
//     } catch (err) {
//         console.error("❌ Error updating profile:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

exports.updateStudentProfile = async (req, res) => {
    try {
        const student = await User.findById(req.user._id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // ✅ Safe file uploads
        if (req.files && req.files.profilePic && req.files.profilePic.length > 0) {
            student.profilePic = req.files.profilePic[0].path;
        }
        if (req.files && req.files.resume && req.files.resume.length > 0) {
            student.resume = req.files.resume[0].path;
        }

        // ✅ Safe parsing
        if (req.body.education) {
            try {
                student.education = JSON.parse(req.body.education);
            } catch (error) {
                console.error("Failed to parse education:", error);
            }
        }

        if (req.body.address) {
            try {
                student.address = JSON.parse(req.body.address);
            } catch (error) {
                console.error("Failed to parse address:", error);
            }
        }

        if (req.body.githubProfile) student.githubProfile = req.body.githubProfile;
        if (req.body.linkedinProfile) student.linkedinProfile = req.body.linkedinProfile;

        await student.save();
        res.json({ message: "Profile updated successfully!" });

    } catch (err) {
        console.error("❌ Error updating profile:", err);
        res.status(500).json({ message: "Server error" });
    }
};



// exports.fetchAssignedSubjectsWithChapters = async (req, res) => {
//     try {

//         if (!req.user || !req.user._id) {
//             return res.status(401).json({ message: "Unauthorized - No user found in request" });
//         }
//         const studentId = req.user._id;
//         const institutionId = req.user.institutionId;



//         // Step 1: Find subjects assigned to this student
//         const subjects = await Subject.find({
//             assignedTo: studentId,
//             institutionId,
//         });

//         // Step 2: Get subject IDs
//         const subjectIds = subjects.map((s) => s._id);

//         // Step 3: Get chapters for those subjects
//         const chapters = await Chapter.find({
//             subjectId: { $in: subjectIds },
//             institutionId,
//         }).sort({ createdAt: 1 }); // optional: sort chapters

//         // Step 4: Group chapters under their respective subjects
//         const subjectData = subjects.map((subject) => {
//             const subjectChapters = chapters.filter(
//                 (ch) => ch.subjectId.toString() === subject._id.toString()
//             );
//             return {
//                 _id: subject._id,
//                 name: subject.name,
//                 description: subject.description,
//                 chapters: subjectChapters,
//             };
//         });

//         res.json(subjectData);
//     } catch (err) {
//         console.error("❌ Error fetching assigned subjects:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };



exports.fetchAssignedSubjectsWithChapters = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized - No user found in request" });
        }

        const studentId = req.user._id;
        const institutionId = req.user.institutionId;

        // Step 1: Get subject assignments for this student
        const assigned = await SubjectAssignment.find({
            studentId,
            institutionId,
        });

        const subjectIds = assigned.map((a) => a.subjectId);

        // Step 2: Fetch subject details
        const subjects = await Subject.find({
            _id: { $in: subjectIds },
            institutionId,
        });

        // Step 3: Fetch all chapters for those subjects
        const chapters = await Chapter.find({
            subjectId: { $in: subjectIds },
            institutionId,
        }).sort({ createdAt: 1 });

        // Step 4: Group chapters under each subject
        const result = subjects.map((subj) => {
            const relatedChapters = chapters.filter(
                (ch) => ch.subjectId.toString() === subj._id.toString()
            );
            return {
                _id: subj._id,
                name: subj.name,
                description: subj.description,
                chapters: relatedChapters,
            };
        });

        res.json(result);
    } catch (err) {
        console.error("❌ Error fetching assigned subjects:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// exports.fetchChaptersBySubject = async (req, res) => {
//     try {
//         const { subjectId } = req.params;

//         if (!req.user || !req.user._id) {
//             return res.status(401).json({ message: "Unauthorized - No user found in request" });
//         }

//         const institutionId = req.user.institutionId;
//         const studentId = req.user._id;

//         // Optionally validate the student is assigned this subject
//         const isAssigned = await SubjectAssignment.findOne({
//             subjectId,
//             studentId,
//             institutionId,
//         });

//         if (!isAssigned) {
//             return res.status(403).json({ message: "You are not assigned to this subject." });
//         }

//         const chapters = await Chapter.find({
//             subjectId,
//             institutionId,
//         }).sort({ createdAt: 1 });

//         res.json(chapters);
//     } catch (err) {
//         console.error("❌ Error fetching chapters by subject:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

exports.fetchChaptersBySubject = async (req, res) => {
    try {
        const { subjectId } = req.params;
        const userId = req.user._id;
        const institutionId = req.user.institutionId;
        const userRole = req.user.role;

        // ✅ Allow Admins and Instructors directly
        const isAdminOrInstructor = userRole === "Admin" || userRole === "Instructor" || userRole === "superadmin";

        // 🛡 Check if the subject is assigned to the student
        const isAssigned = await SubjectAssignment.findOne({
            subjectId,
            studentId: userId,
        });

        if (!isAssigned && !isAdminOrInstructor) {
            return res.status(403).json({ message: "You are not assigned to this subject." });
        }

        const chapters = await Chapter.find({
            subjectId,
            institutionId,
        }).sort({ createdAt: 1 });

        res.json(chapters);
    } catch (err) {
        console.error("❌ Error fetching chapters:", err);
        res.status(500).json({ message: "Server error" });
    }
};
