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
  'Food': 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-orange-200',
  'Transport': 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200',
  'Rent': 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200',
  'Entertainment': 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 border-pink-200',
  'Shopping': 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200',
  'Healthcare': 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-200',
  'Education': 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-indigo-200',
  'Utilities': 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border-yellow-200',
  'Other': 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border-gray-200'
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
      <div className="card-modern p-12 animate-slide-in-up">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto animate-float">
              <span className="text-3xl">📊</span>
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur opacity-25"></div>
          </div>
          <h3 className="text-2xl font-bold gradient-text mb-3">No transactions yet</h3>
          <p className="text-gray-600 text-lg">Add your first transaction to start tracking your expenses!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-modern overflow-hidden animate-slide-in-up">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex items-center">
          <div className="relative mr-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">📋</span>
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25"></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold gradient-text">Recent Transactions</h3>
            <p className="text-gray-600">Your latest financial activities</p>
          </div>
        </div>
      </div>
      
      {/* Transactions List */}
      <div className="divide-y divide-gray-100">
        {expenses.map((expense, index) => (
          <div 
            key={expense._id} 
            className="p-6 hover:bg-gray-50/50 transition-all duration-300 animate-slide-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {editingId === expense._id ? (
              <div className="space-y-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 animate-scale-in">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="number"
                      value={editForm.amount}
                      onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                      className="input-modern w-full pl-12"
                      placeholder="Amount"
                    />
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">💵</span>
                  </div>
                  <div className="relative">
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                      className="input-modern w-full pl-12 appearance-none cursor-pointer"
                    >
                      {Object.keys(categoryIcons).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {categoryIcons[editForm.category]}
                    </span>
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    className="input-modern w-full pl-12"
                    placeholder="Description"
                  />
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">📝</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="btn-primary px-6 py-3 flex items-center space-x-2"
                  >
                    <span>💾</span>
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn-secondary px-6 py-3 flex items-center space-x-2"
                  >
                    <span>❌</span>
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between group">
                <div className="flex items-center space-x-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 shadow-lg group-hover:scale-110 transition-all duration-300 ${categoryColors[expense.category]}`}>
                    <span className="text-2xl">{categoryIcons[expense.category]}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg mb-1">{expense.description}</div>
                    <div className="text-gray-600 flex items-center space-x-2">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                        {expense.category}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{formatDate(expense.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-bold text-red-600 text-2xl">
                      -{formatAmount(expense.amount)}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                      title="Edit"
                    >
                      <span className="text-xl">✏️</span>
                    </button>
                    <button
                      onClick={() => onDelete(expense._id)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                      title="Delete"
                    >
                      <span className="text-xl">🗑️</span>
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