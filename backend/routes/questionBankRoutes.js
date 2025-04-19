const express = require("express");
const router = express.Router();
const controller = require("../controllers/questionBankController");

router.get("/", controller.getQuestions);
router.post("/", controller.addQuestion);
router.put("/:id", controller.updateQuestion);
router.delete("/:id", controller.deleteQuestion);

module.exports = router;
