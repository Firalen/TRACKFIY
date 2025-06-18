const BudgetCard = ({ totalBudget, totalSpent, remaining }) => {
  const progressPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const isOverBudget = remaining < 0;
  
  return (
    <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Monthly Budget</h2>
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">💰</span>
          </div>
        </div>
        
        {/* Budget Amount */}
        <div className="mb-6">
          <div className="text-3xl font-bold text-gray-800 mb-1">
            ${totalBudget.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Budget</div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Spent</span>
            <span className="font-semibold text-gray-800">${totalSpent.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isOverBudget 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                  : 'bg-gradient-to-r from-green-500 to-blue-500'
              }`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Remaining */}
        <div className={`text-center p-3 rounded-xl ${
          isOverBudget 
            ? 'bg-red-50 border border-red-200' 
            : 'bg-green-50 border border-green-200'
        }`}>
          <div className={`text-lg font-bold ${
            isOverBudget ? 'text-red-600' : 'text-green-600'
          }`}>
            {isOverBudget ? 'Over Budget' : 'Remaining'}
          </div>
          <div className={`text-2xl font-bold ${
            isOverBudget ? 'text-red-700' : 'text-green-700'
          }`}>
            ${Math.abs(remaining).toLocaleString()}
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full translate-y-12 -translate-x-12"></div>
    </div>
  );
};

export default BudgetCard; 