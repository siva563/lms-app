const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} = require("../controllers/courseController");

router.use(auth, roleCheck(["superadmin", "admin"]));

router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
