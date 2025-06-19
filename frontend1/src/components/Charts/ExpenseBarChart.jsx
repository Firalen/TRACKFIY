import React from 'react';

const ExpenseBarChart = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-white opacity-80">No data available</p>
      </div>
    );
  }

  // Process expenses data to get monthly totals
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthKey = date.toLocaleString('default', { month: 'short' });
    
    if (!acc[monthKey]) {
      acc[monthKey] = 0;
    }
    acc[monthKey] += expense.amount;
    return acc;
  }, {});

  const data = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total
  }));

  const maxValue = Math.max(...data.map(item => item.total));

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {data.map((item) => {
          const percentage = (item.total / maxValue) * 100;
          return (
            <div key={item.month} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-white">{item.month}</span>
                <span className="font-semibold text-white">${item.total.toFixed(2)}</span>
              </div>
              <div className="relative h-10 bg-background rounded-lg overflow-hidden group">
                <div
                  className="absolute top-0 left-0 h-full rounded-lg transition-all duration-300 group-hover:opacity-90"
                  style={{ 
                    width: `${percentage}%`,
                    background: 'var(--primary)'
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-white px-2">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseBarChart; 