const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

// 🔗 Base path: /api/quiz

// Create a new quiz
router.post("/", quizController.createQuiz);

// Get all quizzes (filter by institutionId, subjectId, chapterId via query)
router.get("/", quizController.getAllQuizzes);

// Get single quiz by ID
router.get("/:id", quizController.getQuizById);

// Update quiz by ID
router.put("/:id", quizController.updateQuiz);

// Delete quiz by ID
router.delete("/:id", quizController.deleteQuiz);

router.post("/save-bulk", quizController.saveBulkQuiz); 

router.post("/save-with-questions", quizController.saveQuizWithQuestions);
router.post("/submit", quizController.submitQuizAttempt);

module.exports = router;
