const Problem = require('../models/Problem');
const Team = require('../models/Team');

exports.recommendTeams = async (problemId) => {
    try {
        const problem = await Problem.findById(problemId);
        if (!problem) return [];

        // Find available teams that have not exceeded their max projects
        const teams = await Team.find({ status: 'AVAILABLE' });
        
        let matches = [];
        
        for (const team of teams) {
            // Check capacity
            if (team.currentProjects.length >= team.maximumProjects) continue;

            let score = 0;
            
            // Match expertise & skills
            const requiredExp = problem.requiredExpertise || [];
            const matchingExp = team.expertise.filter(exp => requiredExp.includes(exp));
            const matchingSkills = team.skills.filter(skill => requiredExp.includes(skill));
            
            if (matchingExp.length > 0) score += (matchingExp.length * 15);
            if (matchingSkills.length > 0) score += (matchingSkills.length * 10);
            
            // Availability bonus
            if (team.currentProjects.length === 0) score += 20;

            // Cap score
            score = Math.min(score, 100);
            
            if (score > 30) {
                matches.push({ team: team._id, score });
            }
        }
        
        matches.sort((a, b) => b.score - a.score);
        return matches;
    } catch (error) {
        console.error("Team recommendation error:", error);
        return [];
    }
};
