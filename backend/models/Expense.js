const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
    type: { type: String, required: true },  // <-- ADD THIS
  amount: { type: Number, required: true },
  category: { type: String }, // e.g., "Salary", "Stationary", "Maintenance"
  date: { type: Date, default: Date.now },
  notes: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Added user field
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);



