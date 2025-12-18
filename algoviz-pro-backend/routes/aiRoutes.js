const express = require('express');
const { getAITutorResponse } = require('../controllers/aiController');
const router = express.Router();

router.post('/tutor', getAITutorResponse);

module.exports = router;