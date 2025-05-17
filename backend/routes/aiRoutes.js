// routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/evaluate-code', aiController.evaluateCode);

module.exports = router;
