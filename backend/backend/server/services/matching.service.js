const Problem = require('../models/Problem');
const University = require('../models/University');
const Industry = require('../models/Industry');

exports.matchUniversities = async (problemId) => {
    try {
        const problem = await Problem.findById(problemId);
        if (!problem) return [];

        const universities = await University.find();
        
        let matches = [];
        
        for (const uni of universities) {
            let score = 0;
            
            // Basic matching logic
            const requiredExp = problem.requiredExpertise || [];
            
            // Match expertise
            const matchingExp = uni.facultyExpertise.filter(exp => requiredExp.includes(exp));
            if (matchingExp.length > 0) score += (matchingExp.length * 20);
            
            // Match category with research areas
            if (uni.researchAreas.includes(problem.category)) {
                score += 30;
            }
            
            // Cap score
            score = Math.min(score, 100);
            
            if (score > 30) {
                matches.push({ university: uni._id, score });
            }
        }
        
        // Sort by score
        matches.sort((a, b) => b.score - a.score);
        return matches;
    } catch (error) {
        console.error("University matching error:", error);
        return [];
    }
};

exports.matchIndustries = async (problemId) => {
    try {
        const problem = await Problem.findById(problemId);
        if (!problem) return [];

        const industries = await Industry.find();
        
        let matches = [];
        
        for (const ind of industries) {
            let score = 0;
            
            // Match expertise
            const requiredExp = problem.requiredExpertise || [];
            const matchingExp = ind.expertise.filter(exp => requiredExp.includes(exp));
            if (matchingExp.length > 0) score += (matchingExp.length * 20);
            
            if (ind.industryDomain === problem.category) score += 30;
            
            if (problem.priority === 'CRITICAL' && ind.CSRCapability) score += 20;

            // Cap score
            score = Math.min(score, 100);
            
            if (score > 30) {
                matches.push({ industry: ind._id, score });
            }
        }
        
        matches.sort((a, b) => b.score - a.score);
        return matches;
    } catch (error) {
        console.error("Industry matching error:", error);
        return [];
    }
};
