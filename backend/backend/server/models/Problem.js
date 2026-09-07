const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    uniqueProblemId: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    submittedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    address: String,
    village: String,
    block: String,
    district: String,
    affectedPeople: Number,
    urgencyInformation: String,
    
    // AI Detected Fields
    category: String,
    subCategory: String,
    severity: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'PENDING'],
        default: 'PENDING'
    },
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'PENDING'],
        default: 'PENDING'
    },
    keywords: [String],
    requiredExpertise: [String],
    solutionDomain: String,

    // GIS Location
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            index: '2dsphere'
        }
    },
    
    // Media
    photos: [String],
    videos: [String],
    documents: [String],

    // Duplication
    duplicateStatus: {
        type: String,
        enum: ['UNIQUE', 'POSSIBLE_DUPLICATE', 'DUPLICATE', 'PENDING'],
        default: 'PENDING'
    },
    duplicateScore: Number,
    matchedProblem: {
        type: mongoose.Schema.ObjectId,
        ref: 'Problem'
    },

    // Matching
    recommendedUniversities: [{
        university: { type: mongoose.Schema.ObjectId, ref: 'University' },
        score: Number
    }],
    recommendedIndustries: [{
        industry: { type: mongoose.Schema.ObjectId, ref: 'Industry' },
        score: Number
    }],
    recommendedTeams: [{
        team: { type: mongoose.Schema.ObjectId, ref: 'Team' },
        score: Number
    }],

    // Lifecycle
    assignedTeam: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team'
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project'
    },
    status: {
        type: String,
        enum: [
            'SUBMITTED', 'AI_ANALYZED', 'DUPLICATE_CHECKED', 'UNDER_REVIEW',
            'VALIDATED', 'TEAM_RECOMMENDED', 'TEAM_ASSIGNED', 'IN_PROGRESS',
            'PROTOTYPE', 'TESTING', 'PILOT_IMPLEMENTATION', 'IMPLEMENTED',
            'IMPACT_MEASURED', 'COMPLETED'
        ],
        default: 'SUBMITTED'
    },
    statusHistory: [{
        status: String,
        changedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
        timestamp: { type: Date, default: Date.now },
        comment: String
    }],

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp before saving
ProblemSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Problem', ProblemSchema);
