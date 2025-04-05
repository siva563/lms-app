const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "student_profiles", // Folder inside cloudinary
        allowed_formats: ["jpg", "png", "jpeg", "pdf", "docx"],
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
