const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    university: { type: mongoose.Schema.ObjectId, ref: 'University' },
    facultyMentor: { type: mongoose.Schema.ObjectId, ref: 'User' },
    industryMentor: { type: mongoose.Schema.ObjectId, ref: 'User' },
    studentMembers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    expertise: [String],
    skills: [String],
    previousProjects: [String],
    currentProjects: [{ type: mongoose.Schema.ObjectId, ref: 'Project' }],
    maximumProjects: { type: Number, default: 3 },
    location: { type: String },
    status: {
        type: String,
        enum: ['AVAILABLE', 'BUSY', 'INACTIVE'],
        default: 'AVAILABLE'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Team', TeamSchema);
