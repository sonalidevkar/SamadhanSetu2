const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
  status: { 
    type: String, 
    enum: ['proposed', 'active', 'completed'], 
    default: 'proposed' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
