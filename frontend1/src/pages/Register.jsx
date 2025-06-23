import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const { register, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(form);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Register Card */}
        <div className="card-modern p-8 animate-slide-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-glow">
                <span className="text-white text-3xl">🚀</span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-3xl blur opacity-25"></div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Join Trackify</h1>
            <p className="text-white">Create your account and start tracking your finances</p>
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

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">First Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="firstName" 
                    value={form.firstName} 
                    onChange={handleChange} 
                    required 
                    className="input-modern w-full"
                    placeholder="John"
                  />
                  <span className="input-icon">
                    👤
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">Last Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="lastName" 
                    value={form.lastName} 
                    onChange={handleChange} 
                    required 
                    className="input-modern w-full"
                    placeholder="Doe"
                  />
                  <span className="input-icon">
                    👤
                  </span>
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">Username</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="username" 
                  value={form.username} 
                  onChange={handleChange} 
                  required 
                  className="input-modern w-full"
                  placeholder="johndoe"
                />
                <span className="input-icon">
                  🏷️
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                  className="input-modern w-full"
                  placeholder="john@example.com"
                />
                <span className="input-icon">
                  📧
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  name="password" 
                  value={form.password} 
                  onChange={handleChange} 
                  required 
                  className="input-modern w-full"
                  placeholder="Create a strong password"
                />
                <span className="input-icon">
                  🔒
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-4 text-lg font-semibold relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <div className="spinner w-5 h-5"></div>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>Create Account</span>
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

          {/* Login Link */}
          <div className="text-center">
            <p className="text-white">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-white font-semibold hover:underline transition-all duration-200 hover:scale-105 inline-block"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="text-center text-sm font-semibold text-white mb-4">Why choose Trackify?</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
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
              <div className="space-y-2">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-white text-sm">🎯</span>
                </div>
                <p className="text-xs text-gray-500">Goal Tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 