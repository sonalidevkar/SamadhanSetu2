const mongoose = require('mongoose');

const IndustrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  sector: { type: String, required: true },
  contactEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Industry', IndustrySchema);
