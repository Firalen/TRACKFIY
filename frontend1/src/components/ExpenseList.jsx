import { useState } from 'react';

const categoryIcons = {
  'Food': '🍕',
  'Transport': '🚗',
  'Rent': '🏠',
  'Entertainment': '🎬',
  'Shopping': '🛍️',
  'Healthcare': '🏥',
  'Education': '📚',
  'Utilities': '⚡',
  'Other': '📦'
};

const categoryColors = {
  'Food': 'bg-orange-100 text-orange-700 border-orange-200',
  'Transport': 'bg-blue-100 text-blue-700 border-blue-200',
  'Rent': 'bg-purple-100 text-purple-700 border-purple-200',
  'Entertainment': 'bg-pink-100 text-pink-700 border-pink-200',
  'Shopping': 'bg-green-100 text-green-700 border-green-200',
  'Healthcare': 'bg-red-100 text-red-700 border-red-200',
  'Education': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Utilities': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Other': 'bg-gray-100 text-gray-700 border-gray-200'
};

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (expense) => {
    setEditingId(expense._id);
    setEditForm({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date.slice(0, 10)
    });
  };

  const handleSave = async () => {
    const result = await onEdit(editingId, editForm);
    if (result.success) {
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No transactions yet</h3>
          <p className="text-gray-500">Add your first transaction to start tracking your expenses!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm">📋</span>
          </div>
          <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {expenses.map((expense) => (
          <div key={expense._id} className="p-4 hover:bg-gray-50/50 transition-colors duration-200">
            {editingId === expense._id ? (
              <div className="space-y-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Amount"
                  />
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(categoryIcons).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${categoryColors[expense.category]}`}>
                    <span className="text-lg">{categoryIcons[expense.category]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{expense.description}</div>
                    <div className="text-sm text-gray-500">
                      {expense.category} • {formatDate(expense.date)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-bold text-red-600 text-lg">
                      -{formatAmount(expense.amount)}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(expense._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList; 