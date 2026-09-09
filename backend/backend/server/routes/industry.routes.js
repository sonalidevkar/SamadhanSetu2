const express = require('express');
const { matchIndustries } = require('../controllers/industry.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/match/:problemId', protect, matchIndustries);

module.exports = router;
