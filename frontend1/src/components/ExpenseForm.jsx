import { useState } from 'react';

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
  const [form, setForm] = useState({
    amount: initialData.amount || '',
    category: initialData.category || categories[0],
    description: initialData.description || '',
    date: initialData.date ? initialData.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
    type: initialData.type || 'expense',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    // Reset form after submission
    setForm({
      amount: '',
      category: categories[0],
      description: '',
      date: new Date().toISOString().slice(0, 10),
      type: 'expense',
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
          <span className="text-white text-lg">➕</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Add Transaction</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount and Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input 
                type="number" 
                name="amount" 
                value={form.amount} 
                onChange={handleChange} 
                required 
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="0.00"
                step="0.01"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
            <select 
              name="type" 
              value={form.type} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="expense" className="text-red-600">💸 Expense</option>
              <option value="income" className="text-green-600">💰 Income</option>
            </select>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setForm({...form, category: cat})}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  form.category === cat
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-lg mb-1">{categoryIcons[cat] || '📦'}</div>
                <div className="text-xs font-medium">{cat}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <input 
            type="text" 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="What was this transaction for?"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
          <input 
            type="date" 
            name="date" 
            value={form.date} 
            onChange={handleChange} 
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm; 