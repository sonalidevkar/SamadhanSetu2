const mongoose = require('mongoose');

const IndustrySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    industryDomain: { type: String },
    expertise: [String],
    technologies: [String],
    mentors: [String],
    fundingCapability: { type: Boolean, default: false },
    CSRCapability: { type: Boolean, default: false },
    prototypingCapability: { type: Boolean, default: false },
    implementationCapability: { type: Boolean, default: false },
    location: { type: String },
    previousProjects: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Industry', IndustrySchema);
