const ExpenseBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.total));

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = (item.total / maxValue) * 100;
          return (
            <div key={item.month} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.month}</span>
                <span className="font-semibold">${item.total.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseBarChart; 