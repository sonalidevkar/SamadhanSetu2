const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
    universityName: { type: String, required: true },
    location: { type: String },
    departments: [String],
    facultyExpertise: [String],
    researchAreas: [String],
    laboratories: [String],
    innovationCenters: [String],
    incubationFacilities: [String],
    previousProjects: [String],
    skills: [String],
    capacity: { type: Number, default: 5 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('University', UniversitySchema);
