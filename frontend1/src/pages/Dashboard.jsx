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
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading your financial data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Financial Dashboard
        </h1>
        <p className="text-gray-600">Track your expenses and manage your budget</p>
      </div>

      {/* Budget Section */}
      <div className="flex justify-between items-center">
        <BudgetCard 
          totalBudget={totalBudget} 
          totalSpent={totalSpent} 
          remaining={remaining} 
        />
        <button
          onClick={() => setShowBudgetForm(!showBudgetForm)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {showBudgetForm ? 'Cancel' : 'Set Budget'}
        </button>
      </div>

      {/* Budget Form */}
      {showBudgetForm && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Set Monthly Budget</h3>
          <form onSubmit={handleBudgetSubmit} className="flex gap-4">
            <input
              type="number"
              value={budgetForm.totalBudget}
              onChange={(e) => setBudgetForm({ totalBudget: e.target.value })}
              placeholder="Enter budget amount"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Save Budget
            </button>
          </form>
        </div>
      )}

      {/* Error Messages */}
      {(expenseError || budgetError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          {expenseError && <div className="font-semibold">Expense Error: {expenseError}</div>}
          {budgetError && <div className="font-semibold">Budget Error: {budgetError}</div>}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Form and List */}
        <div className="lg:col-span-2 space-y-8">
          <ExpenseForm onSubmit={handleExpenseSubmit} />
          <ExpenseList 
            expenses={expenses} 
            onEdit={handleExpenseEdit}
            onDelete={handleExpenseDelete}
          />
        </div>
        
        {/* Right Column - Charts */}
        <div className="space-y-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm">📊</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Spending by Category</h3>
            </div>
            <ExpensePieChart data={pieData} />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm">📈</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Monthly Trends</h3>
            </div>
            <ExpenseBarChart data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 