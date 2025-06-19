import { useState, useEffect } from 'react';
import useExpenseStore from '../store/useExpenseStore';

const Reports = () => {
  const [filters, setFilters] = useState({
    month: new Date().toISOString().slice(0, 7),
    category: ''
  });
  
  const { expenses, stats, fetchExpenses, fetchStats } = useExpenseStore();

  useEffect(() => {
    fetchExpenses(filters);
    fetchStats(filters.month);
  }, [filters, fetchExpenses, fetchStats]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Category', 'Description', 'Amount', 'Type'];
    const csvData = expenses.map(expense => [
      new Date(expense.date).toLocaleDateString(),
      expense.category,
      expense.description,
      expense.amount,
      expense.type
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-${filters.month}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-dark mb-4">Reports & Analytics</h1>
        <p className="text-text-medium text-lg">Comprehensive insights into your financial patterns</p>
      </div>

      {/* Filters Section */}
      <div className="card-modern p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mr-4">
            <span className="text-xl">🔍</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-text-dark">Filter Options</h3>
            <p className="text-text-medium">Customize your report view</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-text-medium">Month</label>
            <div className="relative">
              <input
                type="month"
                name="month"
                value={filters.month}
                onChange={handleFilterChange}
                className="input-modern"
              />
              <span className="input-icon">
                📅
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-text-medium">Category</label>
            <div className="relative">
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="input-modern appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Rent">Rent</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Utilities">Utilities</option>
                <option value="Other">Other</option>
              </select>
              <span className="input-icon">
                🏷️
              </span>
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-light">▼</span>
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={exportToCSV}
              className="btn-primary w-full py-4 flex items-center justify-center space-x-2"
            >
              <span>📊</span>
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card-modern p-6 text-center">
          <div className="w-16 h-16 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💰</span>
          </div>
          <h3 className="font-bold text-text-dark text-lg mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-text-dark">{formatAmount(totalExpenses)}</p>
        </div>
        
        <div className="card-modern p-6 text-center">
          <div className="w-16 h-16 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="font-bold text-text-dark text-lg mb-2">Transactions</h3>
          <p className="text-3xl font-bold text-text-dark">{expenses.length}</p>
        </div>
        
        <div className="card-modern p-6 text-center">
          <div className="w-16 h-16 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📈</span>
          </div>
          <h3 className="font-bold text-text-dark text-lg mb-2">Average per Transaction</h3>
          <p className="text-3xl font-bold text-text-dark">
            {expenses.length > 0 ? formatAmount(totalExpenses / expenses.length) : '$0.00'}
          </p>
        </div>
      </div>

      {/* Category Breakdown */}
      {stats?.categoryStats && (
        <div className="card-modern p-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mr-4">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-dark">Spending by Category</h3>
              <p className="text-text-medium">Breakdown of your expenses</p>
            </div>
          </div>
          
          <div className="grid gap-4">
            {stats.categoryStats.map((item, index) => (
              <div 
                key={item._id} 
                className="flex justify-between items-center p-4 bg-background rounded-lg border border-border hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-lg">📦</span>
                  </div>
                  <span className="font-semibold text-text-dark text-lg">{item._id}</span>
                </div>
                <span className="font-bold text-2xl text-text-dark">{formatAmount(item.total)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expenses List */}
      <div className="card-modern p-8 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center mb-6">
          <div className="relative mr-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">📋</span>
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-25"></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold gradient-text">Transaction Details</h3>
            <p className="text-gray-600">Complete list of your transactions</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-blue-50">
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Category</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Description</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expenses.map((expense, index) => (
                <tr 
                  key={expense._id} 
                  className="hover:bg-gray-50/50 transition-all duration-300 animate-slide-in-up"
                  style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                >
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{expense.description}</td>
                  <td className="px-6 py-4 text-right font-bold text-red-600 text-lg">
                    -{formatAmount(expense.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports; 