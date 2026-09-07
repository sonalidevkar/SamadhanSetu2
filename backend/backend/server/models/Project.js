const mongoose = require('mongoose');

const MilestoneSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: {
        type: String,
        enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
        default: 'PENDING'
    },
    dueDate: Date,
    completedDate: Date
});

const ProjectSchema = new mongoose.Schema({
    problemId: { type: mongoose.Schema.ObjectId, ref: 'Problem', required: true },
    teamId: { type: mongoose.Schema.ObjectId, ref: 'Team', required: true },
    universityId: { type: mongoose.Schema.ObjectId, ref: 'University' },
    industryId: { type: mongoose.Schema.ObjectId, ref: 'Industry' },
    facultyMentor: { type: mongoose.Schema.ObjectId, ref: 'User' },
    
    startDate: { type: Date, default: Date.now },
    expectedCompletionDate: Date,
    
    milestones: [MilestoneSchema],
    deliverables: [String],
    budget: Number,
    
    prototype: { type: String }, // e.g. URL or description
    testingResults: { type: String },
    
    implementationStatus: {
        type: String,
        enum: ['PLANNING', 'PROTOTYPING', 'TESTING', 'PILOT', 'FULL_IMPLEMENTATION', 'COMPLETED'],
        default: 'PLANNING'
    },
    
    impactMetrics: {
        peopleBenefited: Number,
        costSaved: Number,
        timeSaved: Number,
        customMetrics: mongoose.Schema.Types.Mixed
    },
    
    patents: [String],
    startupCreated: { type: Boolean, default: false },
    technologyTransfer: { type: Boolean, default: false },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

ProjectSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Project', ProjectSchema);
