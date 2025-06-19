import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useBudgetStore from '../store/useBudgetStore';
import useExpenseStore from '../store/useExpenseStore';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpensePieChart from '../components/Charts/ExpensePieChart';
import ExpenseBarChart from '../components/Charts/ExpenseBarChart';
import BudgetForm from '../components/BudgetForm';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { budget, loading: budgetLoading, error: budgetError, fetchBudgets } = useBudgetStore();
  const { expenses, loading: expensesLoading, error: expensesError, fetchExpenses } = useExpenseStore();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadData = async () => {
      try {
        await Promise.all([
          fetchBudgets(),
          fetchExpenses()
        ]);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsInitialLoad(false);
      }
    };

    loadData();
  }, [user, navigate, fetchBudgets, fetchExpenses]);

  // Show loading state on initial load
  if (isInitialLoad || budgetLoading || expensesLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <p className="text-white opacity-80">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Show error state if either budget or expenses failed to load
  if (budgetError || expensesError) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <p className="text-error">
            Error loading dashboard data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Initialize with safe default values
  const totalBudget = budget?.totalBudget || 0;
  const totalExpenses = expenses?.reduce((acc, expense) => acc + expense.amount, 0) || 0;
  const remainingBudget = totalBudget - totalExpenses;

  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">Welcome back, {user?.name || 'User'}</h1>
        <p className="text-base text-white opacity-90">Track your expenses and stay within budget</p>
      </div>

      {/* Budget Management */}
      <div className="card-modern p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Set Monthly Budget</h2>
        <BudgetForm />
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

      {/* Expense Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-modern p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Add New Expense</h2>
          <ExpenseForm />
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