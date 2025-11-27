import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    role: 'student', // Default to student
  });
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    const result = await register(formData);
    if (result.success) {
      // Navigate based on user role
      if (formData.role === 'instructor') {
        navigate('/instructor');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50 dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-md transition-colors">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-gray-200 transition-colors">
            Welcome to our website!
          </h2>
        </div>

        <div className="flex border-2 border-slate-200 dark:border-gray-600 rounded-3xl overflow-hidden mb-6 transition-colors">
          <Link 
            to="/login" 
            className="flex-1 py-3 text-center font-medium text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-gray-200 transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="flex-1 py-3 text-center font-medium text-white bg-teal-500 hover:bg-teal-600 transition-colors"
          >
            Register
          </Link>
        </div>

        <p className="text-slate-600 dark:text-gray-400 mb-6 text-center transition-colors">
          Join our platform and explore hundreds of online courses that fit your learning goals.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-200 rounded-lg text-sm transition-colors">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2 transition-colors">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2 transition-colors">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2 transition-colors">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Your number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2 transition-colors">
              Gender
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-slate-600 dark:text-gray-400 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  className="w-4 h-4 text-teal-500 focus:ring-teal-500"
                />
                Male
              </label>
              <label className="flex items-center gap-2 text-slate-600 dark:text-gray-400 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  className="w-4 h-4 text-teal-500 focus:ring-teal-500"
                />
                Female
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2 transition-colors">
              Account Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-slate-600 dark:text-gray-400 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={formData.role === 'student'}
                  onChange={handleChange}
                  className="w-4 h-4 text-teal-500 focus:ring-teal-500"
                />
                Student
              </label>
              <label className="flex items-center gap-2 text-slate-600 dark:text-gray-400 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="role"
                  value="instructor"
                  checked={formData.role === 'instructor'}
                  onChange={handleChange}
                  className="w-4 h-4 text-teal-500 focus:ring-teal-500"
                />
                Instructor
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2 transition-colors">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="w-full py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
