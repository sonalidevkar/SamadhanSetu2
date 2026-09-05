const express = require('express');
const { submitProblem, getProblems, getNearbyProblems, mergeProblem } = require('../controllers/problem.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

router.post('/', protect, upload.fields([
    { name: 'photos', maxCount: 5 },
    { name: 'videos', maxCount: 2 },
    { name: 'documents', maxCount: 5 }
]), submitProblem);

router.get('/', protect, getProblems);
router.get('/nearby', protect, getNearbyProblems);
router.put('/:id/merge', protect, role.authorize('Admin'), mergeProblem);

module.exports = router;
