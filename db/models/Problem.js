const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { 
    type: String, 
    enum: ['open', 'in-progress', 'solved'], 
    default: 'open' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Problem', ProblemSchema);
