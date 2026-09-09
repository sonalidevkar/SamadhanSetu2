const teamAssignmentService = require('../services/teamAssignment.service');
const Problem = require('../models/Problem');
const Team = require('../models/Team');
const Project = require('../models/Project');

// @desc    Recommend teams for a problem
// @route   GET /api/teams/recommend/:problemId
// @access  Private
exports.recommendTeams = async (req, res, next) => {
    try {
        const problemId = req.params.problemId;
        const matches = await teamAssignmentService.recommendTeams(problemId);
        
        const problem = await Problem.findById(problemId);
        if (problem && matches.length > 0) {
            problem.recommendedTeams = matches;
            problem.status = 'TEAM_RECOMMENDED';
            problem.statusHistory.push({
                status: 'TEAM_RECOMMENDED',
                comment: `System recommended ${matches.length} teams.`
            });
            await problem.save();
        }

        res.status(200).json({ success: true, count: matches.length, data: matches });
    } catch (error) {
        next(error);
    }
};

// @desc    Assign team to a problem (Admin)
// @route   POST /api/teams/assign
// @access  Private (Admin)
exports.assignTeam = async (req, res, next) => {
    try {
        const { problemId, teamId } = req.body;
        
        const problem = await Problem.findById(problemId);
        const team = await Team.findById(teamId);

        if (!problem) return res.status(404).json({ success: false, message: 'Problem not found' });
        if (!team) return res.status(404).json({ success: false, message: 'Team not found' });

        // Update problem
        problem.assignedTeam = team._id;
        problem.status = 'TEAM_ASSIGNED';
        problem.statusHistory.push({
            status: 'TEAM_ASSIGNED',
            changedBy: req.user.id,
            comment: `Admin assigned team: ${team.teamName}`
        });
        await problem.save();
        
        // At this point, we should also trigger Project creation.
        const project = await Project.create({
            problemId: problem._id,
            teamId: team._id,
            universityId: team.university,
            milestones: [
                { title: 'Problem Research', status: 'PENDING' },
                { title: 'Prototype', status: 'PENDING' },
                { title: 'Field Testing', status: 'PENDING' },
                { title: 'Implementation', status: 'PENDING' }
            ]
        });

        problem.project = project._id;
        await problem.save();
        
        // Update team current projects
        team.currentProjects.push(project._id);
        if (team.currentProjects.length >= team.maximumProjects) {
            team.status = 'BUSY';
        }
        await team.save();

        res.status(200).json({ success: true, message: 'Team assigned and project created successfully', data: { problem, project } });
    } catch (error) {
        next(error);
    }
};
