import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/20 shadow-2xl">
      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group animate-scale-in">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 animate-pulse-glow">
                <span className="text-white font-bold text-2xl">💰</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">
                Trackify
              </span>
              <span className="text-xs text-white/70 -mt-1">Smart Finance Tracking</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link 
              to="/" 
              className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 group ${
                isActive('/') 
                  ? 'text-white' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {isActive('/') && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-xl blur-sm"></div>
              )}
              <div className="relative flex items-center space-x-2">
                <span className="text-lg">📊</span>
                <span>Dashboard</span>
              </div>
              <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${
                isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></div>
            </Link>
            
            <Link 
              to="/reports" 
              className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 group ${
                isActive('/reports') 
                  ? 'text-white' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {isActive('/reports') && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/80 to-pink-500/80 rounded-xl blur-sm"></div>
              )}
              <div className="relative flex items-center space-x-2">
                <span className="text-lg">📈</span>
                <span>Reports</span>
              </div>
              <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${
                isActive('/reports') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></div>
            </Link>
          </div>

          {/* User Menu */}
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 glass-dark px-4 py-2 rounded-xl">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {user.firstName?.charAt(0) || user.username?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur opacity-25"></div>
                </div>
                <div className="hidden md:block">
                  <div className="text-white font-semibold">
                    {user.firstName || user.username}
                  </div>
                  <div className="text-white/60 text-xs">Welcome back!</div>
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="relative px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold transition-all duration-300 hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <span className="relative flex items-center space-x-2">
                  <span>🚪</span>
                  <span>Logout</span>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 