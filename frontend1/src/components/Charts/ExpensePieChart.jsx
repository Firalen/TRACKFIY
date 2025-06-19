const ExpensePieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.total, 0);
  const colors = [
    '#6b8cce', // soft blue
    '#7cc2e7', // soft cyan
    '#8b7aa5', // soft purple
    '#e4b5e9', // soft pink
    '#86d4db', // soft teal
    '#b5c9e4', // light blue
    '#c4b5e4', // light purple
    '#e4d5b5', // soft beige
    '#b5e4d5'  // soft mint
  ];

  // Calculate pie segments
  let currentAngle = 0;
  const segments = data.map((item, index) => {
    const percentage = (item.total / total) * 100;
    const angle = (percentage / 100) * 360;
    const segment = {
      start: currentAngle,
      end: currentAngle + angle,
      color: colors[index % colors.length],
      percentage,
      ...item
    };
    currentAngle += angle;
    return segment;
  });

  return (
    <div className="space-y-6">
      {/* Pie Chart */}
      <div className="relative w-48 h-48 mx-auto">
        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
          {segments.map((segment, index) => {
            const startX = 50 + 40 * Math.cos((segment.start * Math.PI) / 180);
            const startY = 50 + 40 * Math.sin((segment.start * Math.PI) / 180);
            const endX = 50 + 40 * Math.cos((segment.end * Math.PI) / 180);
            const endY = 50 + 40 * Math.sin((segment.end * Math.PI) / 180);
            const largeArc = segment.end - segment.start > 180 ? 1 : 0;

            return (
              <path
                key={segment.category}
                d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArc} 1 ${endX} ${endY} Z`}
                fill={segment.color}
                className="transition-all duration-300 hover:opacity-80"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">${total.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2 bg-white p-4 rounded-lg shadow-sm">
        {segments.map((segment) => (
          <div key={segment.category} className="flex items-center justify-between py-1">
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded mr-2"
                style={{ backgroundColor: segment.color }}
              ></div>
              <span className="text-sm text-gray-800">{segment.category}</span>
            </div>
            <div className="text-sm font-medium text-gray-800">
              ${segment.total.toFixed(2)} ({segment.percentage.toFixed(1)}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensePieChart; 