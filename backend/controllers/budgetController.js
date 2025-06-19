const Budget = require('../models/Budget');
const Expense = require('../models/Expense');

// @desc    Get current month budget
// @route   GET /api/budgets/current
// @access  Private
const getCurrentBudget = async (req, res) => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
    let budget = await Budget.findOne({ 
      user: req.user._id, 
      month: currentMonth 
    });

    if (!budget) {
      // Create default budget if none exists
      budget = await Budget.create({
        user: req.user._id,
        month: currentMonth,
        totalBudget: 0
      });
    }

    // Get total expenses for the month
    const startDate = new Date(currentMonth + '-01');
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1));
    const totalSpent = await Expense.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]).then(result => (result[0]?.total || 0));

    res.json({
      totalBudget: budget.totalBudget,
      totalSpent,
      remaining: budget.totalBudget - totalSpent
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or update budget
// @route   POST /api/budgets
// @access  Private
const createBudget = async (req, res) => {
  try {
    const { totalBudget } = req.body;
    if (totalBudget === undefined || totalBudget === null) {
      return res.status(400).json({ message: 'Total budget is required' });
    }
    if (typeof totalBudget !== 'number' || isNaN(totalBudget)) {
      return res.status(400).json({ message: 'Total budget must be a valid number' });
    }
    if (totalBudget < 0) {
      return res.status(400).json({ message: 'Total budget cannot be negative' });
    }
    // Always set the month here!
    const month = new Date().toISOString().slice(0, 7); // YYYY-MM format

    let budget = await Budget.findOne({ user: req.user._id, month });
    if (budget) {
      budget.totalBudget = totalBudget;
      await budget.save();
    } else {
      // This is the critical line: month is always included!
      budget = await Budget.create({ user: req.user._id, month, totalBudget });
    }
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get budget by month
// @route   GET /api/budgets/:month
// @access  Private
const getBudgetByMonth = async (req, res) => {
  try {
    const budget = await Budget.findOne({ user: req.user._id, month: req.params.month });
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found for this month' });
    }
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get budget history
// @route   GET /api/budgets
// @access  Private
const getBudgetHistory = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id })
      .sort({ month: -1 })
      .limit(12); // Last 12 months
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete budget
// @route   DELETE /api/budgets/:id
// @access  Private
const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    if (budget.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await budget.deleteOne();
    res.json({ message: 'Budget removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCurrentBudget,
  createBudget,
  getBudgetByMonth,
  getBudgetHistory,
  deleteBudget
}; 