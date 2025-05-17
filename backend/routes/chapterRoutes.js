const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const {
    createChapter,
    getAllChapters,
    getChapterById,
    updateChapter,
    deleteChapter,
} = require("../controllers/chapterController");

// ✅ Apply middleware: Only authenticated users with roles can access
router.use(auth, roleCheck(["superadmin", "admin", "instructor"]));

// CRUD Routes
router.post("/", createChapter);            // ➕ Create
router.get("/", getAllChapters);            // 📥 List all
router.get("/:id", getChapterById);         // 🔍 Get one
router.put("/:id", updateChapter);          // ✏️ Update
router.delete("/:id", deleteChapter);       // ❌ Delete

module.exports = router;
