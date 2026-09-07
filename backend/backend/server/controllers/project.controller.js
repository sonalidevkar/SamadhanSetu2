const Project = require('../models/Project');
const Problem = require('../models/Problem');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
exports.getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find().populate('teamId problemId');
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (err) {
        next(err);
    }
};

// @desc    Add milestone to project
// @route   POST /api/projects/:id/milestones
// @access  Private
exports.addMilestone = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

        project.milestones.push(req.body);
        await project.save();

        res.status(200).json({ success: true, data: project });
    } catch (err) {
        next(err);
    }
};

// @desc    Update milestone
// @route   PUT /api/projects/:id/milestones/:milestoneId
// @access  Private
exports.updateMilestone = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

        const milestone = project.milestones.id(req.params.milestoneId);
        if (!milestone) return res.status(404).json({ success: false, message: 'Milestone not found' });

        if (req.body.status) milestone.status = req.body.status;
        if (req.body.status === 'COMPLETED') milestone.completedDate = Date.now();
        if (req.body.title) milestone.title = req.body.title;
        if (req.body.description) milestone.description = req.body.description;

        await project.save();

        // Also update problem status if specific milestones are met
        if (milestone.title === 'Prototype' && milestone.status === 'COMPLETED') {
            await Problem.findByIdAndUpdate(project.problemId, { status: 'TESTING' });
        }
        if (milestone.title === 'Implementation' && milestone.status === 'COMPLETED') {
            await Problem.findByIdAndUpdate(project.problemId, { status: 'IMPLEMENTED' });
        }

        res.status(200).json({ success: true, data: project });
    } catch (err) {
        next(err);
    }
};
