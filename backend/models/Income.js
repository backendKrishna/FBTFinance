const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  title: { type: String, required: true },
   type: { type: String, required: true },  // <-- ADD THIS
  amount: { type: Number, required: true },
  category: { type: String }, // optional, e.g., "Donation", "Other"
  date: { type: Date, default: Date.now },
  notes: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Added user field
}, { timestamps: true });

module.exports = mongoose.model('Income', incomeSchema);
