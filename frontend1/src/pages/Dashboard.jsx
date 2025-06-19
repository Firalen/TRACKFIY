import { useEffect, useState } from 'react';
import BudgetCard from '../components/BudgetCard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpensePieChart from '../components/Charts/ExpensePieChart';
import ExpenseBarChart from '../components/Charts/ExpenseBarChart';
import useExpenseStore from '../store/useExpenseStore';
import useBudgetStore from '../store/useBudgetStore';

const Dashboard = () => {
  const { 
    expenses, 
    stats, 
    loading: expenseLoading, 
    error: expenseError,
    fetchExpenses, 
    createExpense, 
    updateExpense, 
    deleteExpense, 
    fetchStats 
  } = useExpenseStore();

  const { 
    currentBudget, 
    loading: budgetLoading, 
    error: budgetError,
    fetchCurrentBudget, 
    createBudget 
  } = useBudgetStore();

  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [budgetForm, setBudgetForm] = useState({ totalBudget: 0 });

  useEffect(() => {
    fetchExpenses();
    fetchCurrentBudget();
    fetchStats();
  }, [fetchExpenses, fetchCurrentBudget, fetchStats]);

  const handleExpenseSubmit = async (expenseData) => {
    const result = await createExpense(expenseData);
    if (result.success) {
      fetchStats(); // Refresh stats after adding expense
    }
  };

  const handleExpenseEdit = async (id, expenseData) => {
    const result = await updateExpense(id, expenseData);
    if (result.success) {
      fetchStats(); // Refresh stats after updating expense
    }
    return result;
  };

  const handleExpenseDelete = async (id) => {
    const result = await deleteExpense(id);
    if (result.success) {
      fetchStats(); // Refresh stats after deleting expense
    }
  };

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    const currentMonth = new Date().toISOString().slice(0, 7);
    const result = await createBudget({
      month: currentMonth,
      totalBudget: parseFloat(budgetForm.totalBudget),
      categories: []
    });
    if (result.success) {
      setShowBudgetForm(false);
      setBudgetForm({ totalBudget: 0 });
    }
  };

  // Prepare chart data
  const pieData = stats?.categoryStats?.map(item => ({
    category: item._id,
    total: item.total
  })) || [];

  const barData = [
    { month: 'Jan', total: 800 },
    { month: 'Feb', total: 1200 },
    { month: 'Mar', total: 950 },
  ];

  // Calculate budget data
  const totalBudget = currentBudget?.budget?.totalBudget || 0;
  const totalSpent = currentBudget?.totalSpent || 0;
  const remaining = totalBudget - totalSpent;

  if (expenseLoading || budgetLoading) {
    return (
      <div className="flex justify-center items-center h-64 animate-fade-in">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div className="text-xl text-white font-semibold mb-2">Loading your financial data...</div>
          <div className="text-white/70">Please wait while we fetch your latest information</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-dark mb-4">
          Financial Dashboard
        </h1>
        <p className="text-text-medium text-lg">Track your expenses and manage your budget with smart insights</p>
      </div>

      {/* Budget Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <BudgetCard 
          totalBudget={totalBudget} 
          totalSpent={totalSpent} 
          remaining={remaining} 
        />
        <button
          onClick={() => setShowBudgetForm(!showBudgetForm)}
          className="btn-secondary px-8 py-4 text-lg font-semibold"
        >
          <span className="flex items-center space-x-2">
            <span>{showBudgetForm ? '❌' : '💰'}</span>
            <span>{showBudgetForm ? 'Cancel' : 'Set Budget'}</span>
          </span>
        </button>
      </div>

      {/* Budget Form */}
      {showBudgetForm && (
        <div className="card-modern p-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-dark">Set Monthly Budget</h3>
              <p className="text-text-medium">Define your spending limit for this month</p>
            </div>
          </div>
          <form onSubmit={handleBudgetSubmit} className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="number"
                value={budgetForm.totalBudget}
                onChange={(e) => setBudgetForm({ totalBudget: e.target.value })}
                placeholder="Enter budget amount"
                className="input-modern"
                required
              />
              <span className="input-icon">
                💵
              </span>
            </div>
            <button
              type="submit"
              className="btn-primary px-8 py-4 text-lg font-semibold"
            >
              <span className="flex items-center space-x-2">
                <span>💾</span>
                <span>Save Budget</span>
              </span>
            </button>
          </form>
        </div>
      )}

      {/* Error Messages */}
      {(expenseError || budgetError) && (
        <div className="card-modern p-6 border-l-4 border-error bg-white">
          <div className="flex items-center space-x-3">
            <span className="text-error text-2xl">⚠️</span>
            <div>
              {expenseError && <div className="font-semibold text-error">Expense Error: {expenseError}</div>}
              {budgetError && <div className="font-semibold text-error">Budget Error: {budgetError}</div>}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Form and List */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <ExpenseForm onSubmit={handleExpenseSubmit} />
          </div>
          <div>
            <ExpenseList 
              expenses={expenses} 
              onEdit={handleExpenseEdit}
              onDelete={handleExpenseDelete}
            />
          </div>
        </div>
        
        {/* Right Column - Charts */}
        <div className="space-y-8">
          <div className="card-modern p-6">
            <h3 className="text-xl font-bold text-text-dark mb-4">Expense Distribution</h3>
            <ExpensePieChart data={pieData} />
          </div>
          
          <div className="card-modern p-6">
            <h3 className="text-xl font-bold text-text-dark mb-4">Monthly Trend</h3>
            <ExpenseBarChart data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 