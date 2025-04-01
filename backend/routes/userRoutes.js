const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers
} = require("../controllers/userController");

// ✅ Apply auth & role check to all routes
router.use(auth, roleCheck(["superadmin", "admin"]));

router.get("/all", getAllUsers);         // ✅ No need to reapply `auth` here
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;