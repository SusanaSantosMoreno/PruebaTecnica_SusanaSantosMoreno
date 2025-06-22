const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  responsible: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);