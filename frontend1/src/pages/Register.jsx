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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block mb-1">First Name</label>
          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block mb-1">Last Name</label>
          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required className="input input-bordered w-full" />
        </div>
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      </form>
      <div className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </div>
    </div>
  );
};

export default Register; 