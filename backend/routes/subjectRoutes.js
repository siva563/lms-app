// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const roleCheck = require("../middleware/roleCheck");
// const { createSubject, getSubjects,deleteSubject,updateSubject } = require("../controllers/subjectController");

// router.use(auth, roleCheck(["admin", "superadmin", "student"]));

// router.post("/", createSubject);
// router.get("/", getSubjects);
// router.delete("/:id", deleteSubject);
// router.put("/:id", updateSubject);

// module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
    createSubject,
    getSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject,
} = require("../controllers/subjectController");

router.use(auth); // 🔒 Authenticated routes only

router.post("/", createSubject);
router.get("/", getSubjects);
router.get("/:id", getSubjectById);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

module.exports = router;
