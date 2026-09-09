const express = require('express');
const { matchUniversities } = require('../controllers/university.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/match/:problemId', protect, matchUniversities);

module.exports = router;
