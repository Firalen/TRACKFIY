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
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Reports & Analytics</h2>
        
        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Month</label>
            <input
              type="month"
              name="month"
              value={filters.month}
              onChange={handleFilterChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full border rounded px-3 py-2"
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
          </div>
          <div className="flex items-end">
            <button
              onClick={exportToCSV}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded">
            <h3 className="font-semibold text-blue-800">Total Expenses</h3>
            <p className="text-2xl font-bold text-blue-600">{formatAmount(totalExpenses)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <h3 className="font-semibold text-green-800">Number of Transactions</h3>
            <p className="text-2xl font-bold text-green-600">{expenses.length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded">
            <h3 className="font-semibold text-purple-800">Average per Transaction</h3>
            <p className="text-2xl font-bold text-purple-600">
              {expenses.length > 0 ? formatAmount(totalExpenses / expenses.length) : '$0.00'}
            </p>
          </div>
        </div>

        {/* Category Breakdown */}
        {stats?.categoryStats && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Spending by Category</h3>
            <div className="space-y-2">
              {stats.categoryStats.map((item) => (
                <div key={item._id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                  <span className="font-medium">{item._id}</span>
                  <span className="font-semibold">{formatAmount(item.total)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expenses List */}
        <div>
          <h3 className="font-semibold mb-3">Transaction Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{expense.category}</td>
                    <td className="border border-gray-300 px-4 py-2">{expense.description}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-semibold text-red-600">
                      -{formatAmount(expense.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 