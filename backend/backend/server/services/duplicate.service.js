const axios = require('axios');
const { AI_SERVICE_URL } = require('../config/env');
const Problem = require('../models/Problem');
const gisService = require('./gis.service');

exports.detectDuplicates = async (problemId) => {
    try {
        const problem = await Problem.findById(problemId);
        if (!problem) return;

        const [longitude, latitude] = problem.location.coordinates;
        
        // 1. GIS: Find nearby existing problems within 10km (10000m)
        const nearbyProblems = await gisService.findNearbyProblems(longitude, latitude, 10000);
        
        // Filter out the current problem itself and problems that are not yet submitted properly
        const candidateProblems = nearbyProblems.filter(p => 
            p._id.toString() !== problem._id.toString()
        );

        if (candidateProblems.length === 0) {
            problem.duplicateStatus = 'UNIQUE';
            problem.duplicateScore = 0;
            
            problem.statusHistory.push({
                status: 'DUPLICATE_CHECKED',
                comment: 'No nearby candidates found. Marked as UNIQUE.'
            });
            problem.status = 'DUPLICATE_CHECKED';
            await problem.save();
            return;
        }

        // 2. Prepare data for Python AI
        const existingTexts = candidateProblems.map(p => p.description);

        // 3. Call AI Service for Semantic Similarity
        const aiResponse = await axios.post(`${AI_SERVICE_URL}/duplicate-check`, {
            new_problem_text: problem.description,
            existing_problems_texts: existingTexts
        });

        const similarityScores = aiResponse.data.similarity_scores;
        
        let highestScore = 0;
        let matchedProblem = null;

        // 4. Calculate Final Duplicate Score (Combining Semantic + Category match)
        for (let i = 0; i < candidateProblems.length; i++) {
            const candidate = candidateProblems[i];
            const semanticScore = similarityScores[i] * 100; // e.g., 0.94 -> 94
            
            let finalScore = semanticScore;
            
            // Boost score if categories match exactly
            if (candidate.category === problem.category) {
                finalScore += 5;
            }
            if (candidate.subCategory === problem.subCategory) {
                finalScore += 5;
            }
            
            // Cap at 100
            finalScore = Math.min(finalScore, 100);

            if (finalScore > highestScore) {
                highestScore = finalScore;
                matchedProblem = candidate;
            }
        }

        problem.duplicateScore = highestScore;

        if (highestScore >= 85) {
            problem.duplicateStatus = 'POSSIBLE_DUPLICATE';
            problem.matchedProblem = matchedProblem._id;
            
            problem.statusHistory.push({
                status: 'DUPLICATE_CHECKED',
                comment: `Possible duplicate found with score ${highestScore}%. Awaiting admin review.`
            });
        } else {
            problem.duplicateStatus = 'UNIQUE';
            
            problem.statusHistory.push({
                status: 'DUPLICATE_CHECKED',
                comment: `Not a duplicate. Highest match score: ${highestScore}%`
            });
        }

        problem.status = 'DUPLICATE_CHECKED';
        await problem.save();
        
        // Next Step in Lifecycle: Match Universities / Industry
        // We will trigger that externally or here. For separation, we will just save here.

    } catch (error) {
        console.error("Duplicate Detection Error:", error);
    }
};
