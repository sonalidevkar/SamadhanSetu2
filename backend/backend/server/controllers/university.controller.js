const matchingService = require('../services/matching.service');
const Problem = require('../models/Problem');

// @desc    Match universities for a problem
// @route   GET /api/universities/match/:problemId
// @access  Private
exports.matchUniversities = async (req, res, next) => {
    try {
        const problemId = req.params.problemId;
        const matches = await matchingService.matchUniversities(problemId);
        
        // Optionally save matches to problem
        const problem = await Problem.findById(problemId);
        if (problem && matches.length > 0) {
            problem.recommendedUniversities = matches;
            await problem.save();
        }

        res.status(200).json({ success: true, count: matches.length, data: matches });
    } catch (error) {
        next(error);
    }
};
