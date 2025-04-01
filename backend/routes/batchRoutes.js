const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
    createBatch,
    getBatches,
    updateBatch,
    deleteBatch,
    getBatchById
} = require("../controllers/batchController");

router.use(auth);

router.get("/", getBatches);
router.post("/", createBatch);
router.get("/:id", getBatchById);
router.put("/:id", updateBatch);
router.delete("/:id", deleteBatch);

module.exports = router;
