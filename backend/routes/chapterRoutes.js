const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const { createChapter, getChapters,deleteChapter,updateChapter } = require("../controllers/chapterController");

router.use(auth, roleCheck(["admin", "superadmin", "student"]));

router.post("/", createChapter);
router.get("/", getChapters);
router.delete("/:id", deleteChapter);
router.put("/:id", updateChapter);

module.exports = router;
