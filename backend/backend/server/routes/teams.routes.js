const express = require('express');
const { recommendTeams, assignTeam } = require('../controllers/team.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

const router = express.Router();

router.get('/recommend/:problemId', protect, recommendTeams);
router.post('/assign', protect, role.authorize('Admin'), assignTeam);

module.exports = router;
