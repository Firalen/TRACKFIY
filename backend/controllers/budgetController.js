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
        totalBudget: 0,
        categories: []
      });
    }

    // Get actual expenses for the month
    const startDate = new Date(currentMonth + '-01');
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1));
    
    const expenses = await Expense.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      }
    ]);

    const totalSpent = expenses.reduce((sum, exp) => sum + exp.total, 0);

    res.json({
      budget,
      totalSpent,
      remaining: budget.totalBudget - totalSpent,
      categoryExpenses: expenses
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
    const { month, totalBudget, categories } = req.body;

    // Check if budget already exists for the month
    let budget = await Budget.findOne({ 
      user: req.user._id, 
      month 
    });

    if (budget) {
      // Update existing budget
      budget.totalBudget = totalBudget;
      budget.categories = categories;
      await budget.save();
    } else {
      // Create new budget
      budget = await Budget.create({
        user: req.user._id,
        month,
        totalBudget,
        categories
      });
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
    const budget = await Budget.findOne({ 
      user: req.user._id, 
      month: req.params.month 
    });

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

    // Check if budget belongs to user
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