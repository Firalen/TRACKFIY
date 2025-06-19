import React, { useState } from 'react';
import useBudgetStore from '../store/useBudgetStore';

const BudgetForm = () => {
  const [totalBudget, setTotalBudget] = useState('');
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM format
  const { createBudget, loading, error } = useBudgetStore();
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    if (!totalBudget || isNaN(totalBudget) || Number(totalBudget) < 0) {
      setLocalError('Please enter a valid budget amount.');
      return;
    }
    try {
      const result = await createBudget({ 
        totalBudget: Number(totalBudget),
        month: month
      });
      if (result && result.success) {
        setTotalBudget('');
      } else if (result && result.error) {
        setLocalError(result.error);
      }
    } catch (err) {
      setLocalError('Failed to set budget.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="month" className="block text-white opacity-90 mb-2">
          Budget Month
        </label>
        <input
          type="month"
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="input-modern w-full"
          required
        />
      </div>
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
      {(localError || error) && (
        <div className="text-error text-sm mt-2">
          {localError || error}
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