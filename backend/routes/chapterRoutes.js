// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const roleCheck = require("../middleware/roleCheck");
// const { createChapter, getChapters,deleteChapter,updateChapter } = require("../controllers/chapterController");

// router.use(auth, roleCheck(["admin", "superadmin", "student"]));

// router.post("/", createChapter);
// router.get("/", getChapters);
// router.delete("/:id", deleteChapter);
// router.put("/:id", updateChapter);

// module.exports = router;

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
