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
    format: 'YYYY-MM'
  },
  totalBudget: {
    type: Number,
    required: true,
    min: 0
  },
  categories: [{
    category: {
      type: String,
      required: true,
      enum: ['Food', 'Transport', 'Rent', 'Entertainment', 'Shopping', 'Healthcare', 'Education', 'Utilities', 'Other']
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index to ensure unique budget per user per month
budgetSchema.index({ user: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('Budget', budgetSchema); 