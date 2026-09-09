const Problem = require('../models/Problem');
const generateProblemId = require('../utils/generateProblemId');
const axios = require('axios');
const { AI_SERVICE_URL } = require('../config/env');
const duplicateService = require('../services/duplicate.service');
const gisService = require('../services/gis.service');

// @desc    Submit a new problem
// @route   POST /api/problems
// @access  Private (Citizen)
exports.submitProblem = async (req, res, next) => {
    try {
        const { title, description, latitude, longitude, address, village, block, district, affectedPeople, urgencyInformation } = req.body;

        const uniqueProblemId = generateProblemId();
        
        let photos = [];
        let videos = [];
        let documents = [];

        if (req.files) {
            if (req.files['photos']) photos = req.files['photos'].map(file => file.path);
            if (req.files['videos']) videos = req.files['videos'].map(file => file.path);
            if (req.files['documents']) documents = req.files['documents'].map(file => file.path);
        }

        const problem = await Problem.create({
            uniqueProblemId,
            title,
            description,
            submittedBy: req.user.id,
            address,
            village,
            block,
            district,
            affectedPeople,
            urgencyInformation,
            location: {
                type: 'Point',
                coordinates: [parseFloat(longitude) || 0, parseFloat(latitude) || 0]
            },
            photos,
            videos,
            documents,
            statusHistory: [{
                status: 'SUBMITTED',
                changedBy: req.user.id,
                comment: 'Initial problem submission'
            }]
        });

        // Trigger AI analysis asynchronously
        // In real world, use a queue like RabbitMQ or Bull. We call it directly here.
        triggerAIAnalysis(problem._id).catch(err => console.error('AI Analysis Error:', err.message));

        res.status(201).json({
            success: true,
            message: 'Problem submitted successfully. AI analysis is pending.',
            data: problem
        });
    } catch (err) {
        next(err);
    }
};

const triggerAIAnalysis = async (problemId) => {
    try {
        const problem = await Problem.findById(problemId);
        
        // 1. Classify with Python AI
        const aiResponse = await axios.post(`${AI_SERVICE_URL}/analyze`, {
            text: problem.description
        });

        const { category, subCategory, severity, priority, keywords, requiredExpertise, solutionDomain } = aiResponse.data;

        problem.category = category;
        problem.subCategory = subCategory;
        problem.severity = severity;
        problem.priority = priority;
        problem.keywords = keywords;
        problem.requiredExpertise = requiredExpertise;
        problem.solutionDomain = solutionDomain;
        problem.status = 'AI_ANALYZED';
        
        problem.statusHistory.push({
            status: 'AI_ANALYZED',
            changedBy: problem.submittedBy,
            comment: 'AI completed analysis'
        });

        await problem.save();
        
        // Trigger Duplicate Check
        await duplicateService.detectDuplicates(problem._id);
        
    } catch (error) {
        console.error('Error during AI analysis trigger:', error);
    }
};

// @desc    Get all problems
// @route   GET /api/problems
// @access  Private
exports.getProblems = async (req, res, next) => {
    try {
        const problems = await Problem.find().sort('-createdAt');
        res.status(200).json({ success: true, count: problems.length, data: problems });
    } catch (err) {
        next(err);
    }
};

// @desc    Get nearby problems
// @route   GET /api/problems/nearby
// @access  Private
exports.getNearbyProblems = async (req, res, next) => {
    try {
        const { lng, lat, radius } = req.query;
        if (!lng || !lat) {
            return res.status(400).json({ success: false, message: 'Please provide longitude and latitude' });
        }
        
        const distance = radius ? parseInt(radius) : 5000;
        const problems = await gisService.findNearbyProblems(parseFloat(lng), parseFloat(lat), distance);
        
        res.status(200).json({ success: true, count: problems.length, data: problems });
    } catch (err) {
        next(err);
    }
};

// @desc    Admin merges a duplicate problem
// @route   PUT /api/problems/:id/merge
// @access  Private (Admin)
exports.mergeProblem = async (req, res, next) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) return res.status(404).json({ success: false, message: 'Problem not found' });
        
        problem.duplicateStatus = 'DUPLICATE';
        problem.status = 'COMPLETED'; // Stop lifecycle for duplicates
        problem.statusHistory.push({
            status: 'COMPLETED',
            changedBy: req.user.id,
            comment: 'Admin merged this problem as a duplicate.'
        });
        
        await problem.save();
        res.status(200).json({ success: true, message: 'Problem merged successfully', data: problem });
    } catch (err) {
        next(err);
    }
};
