const Problem = require('../models/Problem');

// Function to find problems within a given radius (in meters)
exports.findNearbyProblems = async (longitude, latitude, maxDistance = 5000) => {
    try {
        const problems = await Problem.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: maxDistance
                }
            }
        });
        return problems;
    } catch (error) {
        console.error("GIS Search Error:", error);
        return [];
    }
};
