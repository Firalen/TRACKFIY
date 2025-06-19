const BudgetCard = ({ totalBudget, totalSpent, remaining }) => {
  const progressPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const isOverBudget = remaining < 0;
  
  return (
    <div className="card-modern p-8 relative overflow-hidden group animate-scale-in">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full translate-y-12 -translate-x-12 animate-float" style={{ animationDelay: '1s' }}></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl text-white font-bold gradient-text mb-1">Monthly Budget</h2>
            <p className=" text-white text-xl text-sm">Track your spending progress</p>
          </div>
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 animate-pulse-glow">
              <span className="text-white text-2xl">💰</span>
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
          </div>
        </div>
        
        {/* Budget Amount */}
        <div className="mb-8">
          <div className="text-4xl font-bold gradient-text mb-2">
            ${totalBudget.toLocaleString()}
          </div>
          <div className="text-gray-600 font-medium">Total Budget</div>
        </div>
        
        {/* Progress Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-sm mb-3">
            <span className="text-gray-600 font-medium">Spent</span>
            <span className="font-bold text-gray-800">${totalSpent.toLocaleString()}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-700 ease-out relative ${
                  isOverBudget 
                    ? 'bg-gradient-to-r from-red-500 via-pink-500 to-red-600' 
                    : 'bg-gradient-to-r from-green-500 via-blue-500 to-purple-500'
                }`}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              >
                {/* Progress Bar Glow Effect */}
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Progress Percentage */}
            <div className="absolute -top-8 right-0 bg-white px-2 py-1 rounded-lg shadow-lg text-xs font-bold text-gray-700">
              {progressPercentage.toFixed(1)}%
            </div>
          </div>
        </div>
        
        {/* Remaining/Over Budget Status */}
        <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
          isOverBudget 
            ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 shadow-lg' 
            : 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-lg'
        }`}>
          <div className="text-center">
            <div className={`text-lg font-bold mb-1 ${
              isOverBudget ? 'text-red-600' : 'text-green-600'
            }`}>
              {isOverBudget ? '⚠️ Over Budget' : '✅ Remaining'}
            </div>
            <div className={`text-3xl font-bold ${
              isOverBudget ? 'text-red-700' : 'text-green-700'
            }`}>
              ${Math.abs(remaining).toLocaleString()}
            </div>
            <div className={`text-sm mt-1 ${
              isOverBudget ? 'text-red-600' : 'text-green-600'
            }`}>
              {isOverBudget ? 'You\'ve exceeded your budget' : 'Available to spend'}
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/50 rounded-xl">
            <div className="text-lg font-bold text-gray-800">${totalSpent.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Total Spent</div>
          </div>
          <div className="text-center p-3 bg-white/50 rounded-xl">
            <div className="text-lg font-bold text-gray-800">{totalBudget > 0 ? progressPercentage.toFixed(1) : 0}%</div>
            <div className="text-xs text-gray-600">Used</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard; 