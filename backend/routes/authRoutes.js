const express = require("express");
const router = express.Router();
const { registerUser, loginUser, setNewPassword } = require("../controllers/authController");

// Register user (by superadmin/admin)
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

router.post("/set-password", setNewPassword);

module.exports = router;
