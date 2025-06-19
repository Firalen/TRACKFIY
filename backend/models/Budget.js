const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  month: {
    type: String,
    required: true,
    match: [/^\d{4}-(0[1-9]|1[0-2])$/, 'Month must be in YYYY-MM format'] // ✅ Regex format check
  },
  totalBudget: {
    type: Number,
    required: true,
    min: [0, 'Total budget cannot be negative'] // ✅ Clear validation
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// ✅ Compound index: one budget per user per month
budgetSchema.index({ user: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('Budget', budgetSchema);
