const Problem = require('../models/Problem');
const Project = require('../models/Project');
const University = require('../models/University');
const Industry = require('../models/Industry');
const Team = require('../models/Team');

// @desc    Get dashboard overview
// @route   GET /api/dashboard/overview
// @access  Private
exports.getOverview = async (req, res, next) => {
    try {
        const totalProblems = await Problem.countDocuments();
        const solvedProblems = await Problem.countDocuments({ status: 'COMPLETED' });
        const pendingProblems = await Problem.countDocuments({ status: { $ne: 'COMPLETED' } });
        const duplicateProblems = await Problem.countDocuments({ duplicateStatus: 'DUPLICATE' });
        
        const activeProjects = await Project.countDocuments({ implementationStatus: { $ne: 'COMPLETED' } });
        const completedProjects = await Project.countDocuments({ implementationStatus: 'COMPLETED' });
        
        const totalUniversities = await University.countDocuments();
        const totalIndustries = await Industry.countDocuments();
        const totalTeams = await Team.countDocuments();
        
        res.status(200).json({
            success: true,
            data: {
                totalProblems,
                solvedProblems,
                pendingProblems,
                duplicateProblems,
                activeProjects,
                completedProjects,
                totalUniversities,
                totalIndustries,
                totalTeams
            }
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get dashboard category breakdown
// @route   GET /api/dashboard/categories
// @access  Private
exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Problem.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);
        res.status(200).json({ success: true, data: categories });
    } catch (err) {
        next(err);
    }
};

// @desc    Get dashboard districts breakdown
// @route   GET /api/dashboard/districts
// @access  Private
exports.getDistricts = async (req, res, next) => {
    try {
        const districts = await Problem.aggregate([
            { $group: { _id: "$district", count: { $sum: 1 } } }
        ]);
        res.status(200).json({ success: true, data: districts });
    } catch (err) {
        next(err);
    }
};
