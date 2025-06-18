const express = require('express');
const router = express.Router();
const {
  getCurrentBudget,
  createBudget,
  getBudgetByMonth,
  getBudgetHistory,
  deleteBudget
} = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

router.route('/')
  .get(getBudgetHistory)
  .post(createBudget);

router.get('/current', getCurrentBudget);
router.get('/:month', getBudgetByMonth);
router.delete('/:id', deleteBudget);

module.exports = router; 