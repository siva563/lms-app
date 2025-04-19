const Quiz = require("../models/Quiz");
const QuestionBank = require("../models/QuestionBank");
const Chapter = require("../models/Chapter");
const QuizAttempt = require("../models/QuizAttempt");

// 🎯 Create new quiz
exports.createQuiz = async (req, res) => {
    try {
        const { institutionId, title, subjectId, chapterId, questionIds, createdBy } = req.body;

        const newQuiz = new Quiz({
            institutionId,
            title,
            subjectId,
            chapterId,
            questionIds,
            createdBy,
        });

        await newQuiz.save();
        res.status(201).json({ message: "Quiz created successfully", quiz: newQuiz });
    } catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({ error: "Failed to create quiz" });
    }
};

// 📋 Get all quizzes (by institution, optionally filter by subject/chapter)
exports.getAllQuizzes = async (req, res) => {
    try {
        const { institutionId, subjectId, chapterId } = req.query;

        const query = { institutionId };
        if (subjectId) query.subjectId = subjectId;
        if (chapterId) query.chapterId = chapterId;

        const quizzes = await Quiz.find(query)
            .populate("subjectId", "name")
            .populate("chapterId", "title")
            .populate("questionIds");

        res.json(quizzes);
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
};

// 📄 Get single quiz by ID
exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
            .populate("subjectId", "name")
            .populate("chapterId", "title")
            .populate("questionIds");

        if (!quiz) return res.status(404).json({ error: "Quiz not found" });
        res.json(quiz);
    } catch (error) {
        console.error("Error fetching quiz:", error);
        res.status(500).json({ error: "Failed to fetch quiz" });
    }
};

// 📝 Update quiz by ID
exports.updateQuiz = async (req, res) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!updatedQuiz) return res.status(404).json({ error: "Quiz not found" });
        res.json({ message: "Quiz updated", quiz: updatedQuiz });
    } catch (error) {
        console.error("Error updating quiz:", error);
        res.status(500).json({ error: "Failed to update quiz" });
    }
};

// 🗑 Delete quiz by ID
exports.deleteQuiz = async (req, res) => {
    try {
        await Quiz.findByIdAndDelete(req.params.id);
        res.json({ message: "Quiz deleted successfully" });
    } catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({ error: "Failed to delete quiz" });
    }
};


exports.saveBulkQuiz = async (req, res) => {
    try {
        const { institutionId, title, subjectId, chapterId, createdBy, questions } = req.body;

        // Save each question to QuestionBank
        const savedQuestions = await QuestionBank.insertMany(
            questions.map((q) => ({
                institutionId,
                question: q.question,
                options: q.options,
                answer: q.answer,
                type: q.type,
                marks: q.marks,
                difficulty: q.difficulty || "easy",
                tags: q.tags || [],
                image: q.image || null,
                codeSnippet: q.codeSnippet || "",
            }))
        );

        const questionIds = savedQuestions.map((q) => q._id);

        // Create the quiz with the question references
        const quiz = new Quiz({
            institutionId,
            title,
            subjectId,
            chapterId,
            createdBy,
            questionIds,
        });

        await quiz.save();

        res.status(201).json({ message: "Quiz created successfully", quiz });
    } catch (err) {
        console.error("❌ Error in saveBulkQuiz:", err);
        res.status(500).json({ error: "Failed to save quiz and questions" });
    }
};

// exports.saveQuizWithQuestions = async (req, res) => {
//     try {
//       const { title, subjectId, chapterId, institutionId, createdBy, questions } = req.body;

//       // Step 1: Save all questions to QuestionBank
//       const savedQuestions = await QuestionBank.insertMany(
//         questions.map(q => ({
//           institutionId,
//           question: q.question,
//           options: q.options,
//           answer: q.answer,
//           type: q.type,
//           marks: q.marks,
//           image: q.image || null,
//           codeSnippet: q.codeSnippet || "",
//           tags: q.tags || [],
//           difficulty: q.difficulty || "easy"
//         }))
//       );

//       // Step 2: Create Quiz with question references
//       const quiz = new Quiz({
//         title,
//         subjectId,
//         chapterId,
//         institutionId,
//         createdBy,
//         isAssignedToChapter: true,
//         questionIds: savedQuestions.map(q => q._id)
//       });

//       await quiz.save();

//       res.status(201).json({ message: "Quiz created and assigned to chapter", quiz });
//     } catch (err) {
//       console.error("❌ Error in saveQuizWithQuestions:", err);
//       res.status(500).json({ error: "Failed to save quiz and questions" });
//     }
//   };



// exports.saveQuizWithQuestions = async (req, res) => {
//     try {
//         const {
//             title,
//             subjectId,
//             chapterId,
//             institutionId,
//             createdBy,
//             questions,
//         } = req.body;

//         // Step 1: Save Questions to QuestionBank
//         const savedQuestions = await QuestionBank.insertMany(
//             questions.map((q) => ({
//                 institutionId,
//                 question: q.question,
//                 options: q.options,
//                 answer: q.answer,
//                 type: q.type,
//                 marks: q.marks,
//                 image: q.image || null,
//                 codeSnippet: q.codeSnippet || "",
//                 tags: q.tags || [],
//                 difficulty: q.difficulty || "easy",
//             }))
//         );

//         // Step 2: Create Quiz with references to QuestionBank
//         const quiz = new Quiz({
//             title,
//             subjectId,
//             chapterId,
//             institutionId,
//             createdBy,
//             isAssignedToChapter: true,
//             questionIds: savedQuestions.map((q) => q._id),
//         });

//         await quiz.save();

//         // Step 3: Update Chapter with quizId
//         if (chapterId) {
//             await Chapter.findByIdAndUpdate(
//                 chapterId,
//                 { quizId: quiz._id },
//                 { new: true }
//             );
//         }

//         res.status(201).json({
//             message: "✅ Quiz created and assigned to chapter",
//             quizId: quiz._id,
//         });
//     } catch (err) {
//         console.error("❌ Error in saveQuizWithQuestions:", err);
//         res
//             .status(500)
//             .json({ error: "Failed to save quiz and assign to chapter" });
//     }
// };


exports.saveQuizWithQuestions = async (req, res) => {
    try {
        const {
            title,
            subjectId,
            chapterId,
            institutionId,
            createdBy,
            questions,
        } = req.body;

        // Step 1: Validate and filter incoming questions
        const validQuestions = questions.filter(
            (q) => q.question?.trim() && q.answer?.trim()
        );

        if (validQuestions.length === 0) {
            return res.status(400).json({ error: "❌ No valid questions found" });
        }

        // Step 2: Save valid questions to QuestionBank
        const savedQuestions = await QuestionBank.insertMany(
            validQuestions.map((q) => ({
                institutionId,
                question: q.question,
                options: q.options || [],
                answer: q.answer,
                type: q.type || "mcq",
                marks: q.marks || 1,
                image: q.image || null,
                codeSnippet: q.codeSnippet || "",
                tags: q.tags || [],
                difficulty: q.difficulty || "easy",
            }))
        );

        // Step 3: Create a quiz document with saved question references
        const quiz = new Quiz({
            title,
            subjectId,
            chapterId,
            institutionId,
            createdBy,
            isAssignedToChapter: true,
            questionIds: savedQuestions.map((q) => q._id),
        });

        await quiz.save();

        // Step 4: Assign quizId to the chapter (if provided)
        if (chapterId) {
            await Chapter.findByIdAndUpdate(
                chapterId,
                { quizId: quiz._id },
                { new: true }
            );
        }

        // Step 5: Respond with success
        return res.status(201).json({
            message: "✅ Quiz created and assigned to chapter",
            quizId: quiz._id,
        });
    } catch (err) {
        console.error("❌ Error in saveQuizWithQuestions:", err);
        return res.status(500).json({
            error: "Failed to save quiz and assign to chapter",
            details: err.message,
        });
    }
};


exports.submitQuizAttempt = async (req, res) => {
    try {
        const { quizId, studentId, answers } = req.body;

        const quiz = await Quiz.findById(quizId).populate("questionIds");
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        let totalScore = 0;
        const responseDetails = [];

        for (const question of quiz.questionIds) {
            const studentAnswer = answers[question._id] || "";
            const isCorrect = studentAnswer === question.answer;
            if (isCorrect) totalScore += question.marks || 1;

            responseDetails.push({
                questionId: question._id,
                givenAnswer: studentAnswer,
                correctAnswer: question.answer,
                isCorrect,
                marks: question.marks || 1,
            });
        }

        const attempt = new QuizAttempt({
            quizId,
            studentId,
            answers: responseDetails,
            score: totalScore,
        });

        await attempt.save();

        res.status(201).json({ message: "Quiz submitted", score: totalScore });
    } catch (err) {
        console.error("❌ Error submitting quiz:", err);
        res.status(500).json({ message: "Submission failed" });
    }
};
