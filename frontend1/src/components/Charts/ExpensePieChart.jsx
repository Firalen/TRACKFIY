const ExpensePieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.total, 0);
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316', '#EC4899'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center h-48 bg-gray-50 rounded">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-700">${total.toFixed(2)}</div>
          <div className="text-sm text-gray-500">Total Spending</div>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={item.category} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded mr-2"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <span className="text-sm">{item.category}</span>
            </div>
            <div className="text-sm font-semibold">
              ${item.total.toFixed(2)} ({((item.total / total) * 100).toFixed(1)}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensePieChart; 