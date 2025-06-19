import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useBudgetStore from '../store/useBudgetStore';
import useExpenseStore from '../store/useExpenseStore';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { ExpensePieChart } from '../components/Charts/ExpensePieChart';
import ExpenseBarChart from '../components/Charts/ExpenseBarChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { budgets, fetchBudgets } = useBudgetStore();
  const { expenses, fetchExpenses } = useExpenseStore();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBudgets();
    fetchExpenses();
  }, [user, navigate, fetchBudgets, fetchExpenses]);

  const totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const remainingBudget = totalBudget - totalExpenses;

  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">Welcome back, {user?.name}</h1>
        <p className="text-base text-white opacity-90">Track your expenses and stay within budget</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stats-card">
          <h3 className="stats-card-title text-white opacity-90">Total Budget</h3>
          <p className="stats-card-value text-white">${totalBudget.toFixed(2)}</p>
        </div>
        <div className="stats-card">
          <h3 className="stats-card-title text-white opacity-90">Total Expenses</h3>
          <p className="stats-card-value text-white">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="stats-card">
          <h3 className="stats-card-title text-white opacity-90">Remaining Budget</h3>
          <p className={`stats-card-value ${remainingBudget < 0 ? 'text-error' : 'text-success'}`}>
            ${remainingBudget.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="card-modern p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Expense Distribution</h2>
          <ExpensePieChart expenses={expenses} />
        </div>
        <div className="card-modern p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Monthly Breakdown</h2>
          <ExpenseBarChart expenses={expenses} />
        </div>
      </div>

      {/* Expense Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-modern p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Add New Expense</h2>
          <ExpenseForm budgets={budgets} />
        </div>
        <div className="card-modern p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Recent Expenses</h2>
          <ExpenseList expenses={expenses.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 