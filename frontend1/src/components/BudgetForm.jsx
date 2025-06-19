import React, { useState } from 'react';
import useBudgetStore from '../store/useBudgetStore';

const BudgetForm = () => {
  const [totalBudget, setTotalBudget] = useState('');
  const { createBudget, loading, error } = useBudgetStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!totalBudget) return;

    try {
      const result = await createBudget({
        totalBudget: parseFloat(totalBudget)
      });

      if (result.success) {
        setTotalBudget('');
      }
    } catch (err) {
      console.error('Error setting budget:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="totalBudget" className="block text-white opacity-90 mb-2">
          Total Budget Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white opacity-80">
            $
          </span>
          <input
            type="number"
            id="totalBudget"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            className="input-modern pl-8"
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      {error && (
        <div className="text-error text-sm mt-2">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center"
      >
        {loading ? 'Setting Budget...' : 'Set Total Budget'}
      </button>
    </form>
  );
};

export default BudgetForm; 