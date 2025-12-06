import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '', // this is the EMAIL now
    password: '',
    rememberMe: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { username, password } = formData;

    if (!username || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      // ✅ 1. Login with Supabase
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: username,   // username field is used as EMAIL
          password,
        });

      if (loginError) throw loginError;

      const user = data.user;
      if (!user) throw new Error('Login failed');

      // ✅ 2. Get user role from profiles
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      // ✅ 3. Redirect based on role
      if (profile.role === 'instructor') {
        navigate('/instructor');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            Welcome to our website!
          </h2>
        </div>

        <div className="flex border-2 border-slate-200 rounded-3xl overflow-hidden mb-6">
          <Link
            to="/login"
            className="flex-1 py-3 text-center font-medium text-white bg-teal-500 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="flex-1 py-3 text-center font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            Register
          </Link>
        </div>

        <p className="text-slate-600 mb-6 text-center">
          Join our platform and explore hundreds of online courses that fit your learning goals.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL (username field) */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="username"
              name="username"
              placeholder="Enter your email"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 text-teal-500 border-slate-300 rounded focus:ring-teal-500"
              />
              Remember me
            </label>

            <Link to="/forgot-password" className="text-sm text-teal-500 hover:text-teal-600">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
