import React, { useState } from 'react';

const defaultCategories = [
  'Food', 'Transport', 'Rent', 'Entertainment', 'Shopping', 'Healthcare', 'Education', 'Utilities', 'Other'
];

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

const ExpenseForm = ({ onSubmit, initialData = {}, categories = defaultCategories }) => {
  const [amount, setAmount] = useState(initialData.amount || '');
  const [category, setCategory] = useState(initialData.category || categories[0]);
  const [description, setDescription] = useState(initialData.description || '');
  const [date, setDate] = useState(initialData.date ? initialData.date.slice(0, 10) : new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!amount || !category || !description || !date) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      const result = await onSubmit({
        amount: parseFloat(amount),
        category,
        description,
        date
      });
      if (result && result.success) {
        setAmount('');
        setCategory(categories[0]);
        setDescription('');
        setDate(new Date().toISOString().slice(0, 10));
      } else if (result && result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to add expense.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-modern p-8 animate-slide-in-up">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="relative mr-4">
          <div className="w-14 h-14 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">➕</span>
          </div>
          <div className="absolute -inset-2 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-25"></div>
        </div>
        <div>
          <h3 className="text-2xl text-red-600 font-bold text-white">Add Transaction</h3>
          <p className="text-white">Record your income or expense</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount and Type */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">💵</span>
              <input 
                type="number" 
                name="amount" 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                required 
                className="input-modern w-full pl-12 text-lg"
                placeholder="0.00"
                step="0.01"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Type</label>
            <div className="relative">
              <select 
                name="type" 
                value={category} 
                onChange={e => setCategory(e.target.value)} 
                className="input-modern w-full pl-12 text-lg appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="text-red-600">💸 {cat}</option>
                ))}
              </select>
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                {categoryIcons[category] || '📦'}
              </span>
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">Category</label>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 group hover:scale-105 ${
                  category === cat
                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {categoryIcons[cat] || '📦'}
                </div>
                <div className="text-xs font-semibold text-gray-700">{cat}</div>
                {category === cat && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white">Description</label>
          <div className="relative">
            <input 
              type="text" 
              name="description" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="input-modern w-full pl-12 text-lg"
              placeholder="What was this transaction for?"
              required
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
              📝
            </span>
          </div>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Date</label>
          <div className="relative">
            <input 
              type="date" 
              name="date" 
              value={date} 
              onChange={e => setDate(e.target.value)} 
              className="input-modern w-full pl-12 text-lg"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
              📅
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary w-full py-4 text-lg font-semibold relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center justify-center space-x-2">
            <span>✨</span>
            <span>{loading ? 'Adding...' : 'Add Transaction'}</span>
          </span>
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm; 