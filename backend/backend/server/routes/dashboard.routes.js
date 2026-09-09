const express = require('express');
const { getOverview, getCategories, getDistricts } = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/overview', protect, getOverview);
router.get('/categories', protect, getCategories);
router.get('/districts', protect, getDistricts);

module.exports = router;
