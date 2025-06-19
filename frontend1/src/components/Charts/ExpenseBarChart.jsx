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
            <div key={item.month} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-800">{item.month}</span>
                <span className="font-semibold text-gray-800">${item.total.toFixed(2)}</span>
              </div>
              <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden group">
                <div
                  className="absolute top-0 left-0 h-full rounded-lg transition-all duration-300 group-hover:opacity-90"
                  style={{ 
                    width: `${percentage}%`,
                    background: 'linear-gradient(to right, #6b8cce, #8b7aa5)'
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