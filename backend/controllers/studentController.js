const User = require("../models/User");

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