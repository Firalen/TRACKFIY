import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="card-modern p-8 animate-slide-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-glow">
                <span className="text-white text-3xl">💰</span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-25"></div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-white">Sign in to your Trackify account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl animate-scale-in">
              <div className="flex items-center space-x-2">
                <span className="text-red-500 text-lg">⚠️</span>
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                Email Address
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => { setEmail(e.target.value); clearError(); }} 
                  required 
                  className="input-modern w-full"
                  placeholder="Enter your email"
                />
                <span className="input-icon">
                  📧
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                Password
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => { setPassword(e.target.value); clearError(); }} 
                  required 
                  className="input-modern w-full"
                  placeholder="Enter your password"
                />
                <span className="input-icon">
                  🔒
                </span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-4 text-lg font-semibold relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <div className="spinner w-5 h-5"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    <span>Sign In</span>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-white">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-white font-semibold hover:underline transition-all duration-200 hover:scale-105 inline-block"
              >
                Create one now
              </Link>
            </p>
          </div>

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-white text-sm">📊</span>
                </div>
                <p className="text-xs text-white">Smart Analytics</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-white text-sm">🔒</span>
                </div>
                <p className="text-xs text-white">Secure Data</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-white text-sm">⚡</span>
                </div>
                <p className="text-xs text-white">Real-time Sync</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 