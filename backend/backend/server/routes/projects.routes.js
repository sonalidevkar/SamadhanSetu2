const express = require('express');
const { getProjects, addMilestone, updateMilestone } = require('../controllers/project.controller');
const { protect } = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

const router = express.Router();

router.get('/', protect, getProjects);
router.post('/:id/milestones', protect, addMilestone);
router.put('/:id/milestones/:milestoneId', protect, updateMilestone);

module.exports = router;
