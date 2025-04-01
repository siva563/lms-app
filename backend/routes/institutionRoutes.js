const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const {
    createInstitution,
    getInstitutions,
    getInstitutionById,
    updateInstitution,
    deleteInstitution
} = require("../controllers/institutionController");

// All routes protected for Super Admin only
router.use(auth, roleCheck(["superadmin"]));

router.post("/", createInstitution);
router.get("/", getInstitutions);
router.get("/:id", getInstitutionById);
router.put("/:id", updateInstitution);
router.delete("/:id", deleteInstitution);

module.exports = router;
