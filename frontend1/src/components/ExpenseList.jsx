import React from 'react';

const ExpenseList = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-white opacity-80">No expenses recorded yet.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-3 text-white opacity-80 font-medium">Date</th>
            <th className="text-left p-3 text-white opacity-80 font-medium">Description</th>
            <th className="text-left p-3 text-white opacity-80 font-medium">Category</th>
            <th className="text-right p-3 text-white opacity-80 font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense._id}
              className="border-b border-border hover:bg-background-alt transition-colors"
            >
              <td className="p-3 text-white">
                {formatDate(expense.date)}
              </td>
              <td className="p-3 text-white">{expense.description}</td>
              <td className="p-3 text-white">{expense.category}</td>
              <td className="p-3 text-right text-white">
                ${expense.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList; 