const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
        type: String,
        enum: ['PROBLEM_UPDATE', 'TEAM_ASSIGNMENT', 'MILESTONE_UPDATE', 'SYSTEM_ALERT'],
        default: 'SYSTEM_ALERT'
    },
    relatedProblem: { type: mongoose.Schema.ObjectId, ref: 'Problem' },
    relatedProject: { type: mongoose.Schema.ObjectId, ref: 'Project' },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);
