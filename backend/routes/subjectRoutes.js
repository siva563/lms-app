const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const { createSubject, getSubjects,deleteSubject,updateSubject } = require("../controllers/subjectController");

router.use(auth, roleCheck(["admin", "superadmin", "student"]));

router.post("/", createSubject);
router.get("/", getSubjects);
router.delete("/:id", deleteSubject);
router.put("/:id", updateSubject);

module.exports = router;
