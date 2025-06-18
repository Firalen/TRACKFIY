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
      <div className="text-center mb-12 animate-slide-in-up">
        <div className="relative inline-block mb-6">
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Financial Dashboard
          </h1>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur opacity-20"></div>
        </div>
        <p className="text-white/80 text-lg">Track your expenses and manage your budget with smart insights</p>
      </div>

      {/* Budget Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        <BudgetCard 
          totalBudget={totalBudget} 
          totalSpent={totalSpent} 
          remaining={remaining} 
        />
        <button
          onClick={() => setShowBudgetForm(!showBudgetForm)}
          className="btn-secondary px-8 py-4 text-lg font-semibold relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center space-x-2">
            <span>{showBudgetForm ? '❌' : '💰'}</span>
            <span>{showBudgetForm ? 'Cancel' : 'Set Budget'}</span>
          </span>
        </button>
      </div>

      {/* Budget Form */}
      {showBudgetForm && (
        <div className="card-modern p-8 animate-scale-in">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4">
              <span className="text-white text-2xl">📊</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold gradient-text">Set Monthly Budget</h3>
              <p className="text-gray-600">Define your spending limit for this month</p>
            </div>
          </div>
          <form onSubmit={handleBudgetSubmit} className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="number"
                value={budgetForm.totalBudget}
                onChange={(e) => setBudgetForm({ totalBudget: e.target.value })}
                placeholder="Enter budget amount"
                className="input-modern w-full pl-12 text-lg"
                required
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
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
        <div className="card-modern p-6 border-l-4 border-red-500 animate-scale-in">
          <div className="flex items-center space-x-3">
            <span className="text-red-500 text-2xl">⚠️</span>
            <div>
              {expenseError && <div className="font-semibold text-red-700">Expense Error: {expenseError}</div>}
              {budgetError && <div className="font-semibold text-red-700">Budget Error: {budgetError}</div>}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Form and List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <ExpenseForm onSubmit={handleExpenseSubmit} />
          </div>
          <div className="animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
            <ExpenseList 
              expenses={expenses} 
              onEdit={handleExpenseEdit}
              onDelete={handleExpenseDelete}
            />
          </div>
        </div>
        
        {/* Right Column - Charts */}
        <div className="space-y-8">
          <div className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="card-modern p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📊</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Spending by Category</h3>
                  <p className="text-gray-600 text-sm">Visual breakdown of expenses</p>
                </div>
              </div>
              <ExpensePieChart data={pieData} />
            </div>
          </div>
          
          <div className="animate-slide-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="card-modern p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📈</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Monthly Trends</h3>
                  <p className="text-gray-600 text-sm">Track your spending patterns</p>
                </div>
              </div>
              <ExpenseBarChart data={barData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 