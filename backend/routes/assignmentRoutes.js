const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

router.post('/create', assignmentController.createAssignment);
router.get('/by-chapter/:chapterId', assignmentController.getAssignmentByChapterId);

module.exports = router;
