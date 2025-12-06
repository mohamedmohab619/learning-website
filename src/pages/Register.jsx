import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    role: 'student',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    const { username, email, phone, password, role } = formData;

    if (!username || !email || !password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      // ✅ 1. Create Auth User
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      const user = data.user;
      if (!user) throw new Error('User creation failed');

      // ✅ 2. Insert Profile Data
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          full_name: username,
          phone,
          role,
        });

      if (profileError) throw profileError;

      // ✅ 3. Redirect Based on Role
      if (role === 'instructor') {
        navigate('/instructor');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
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

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Gender (Not saved yet – safe for now) */}
          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="gender" value="male" onChange={handleChange} />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" onChange={handleChange} />
                Female
              </label>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2">Account Type</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="role" value="student" checked={formData.role === 'student'} onChange={handleChange} />
                Student
              </label>
              <label>
                <input type="radio" name="role" value="instructor" checked={formData.role === 'instructor'} onChange={handleChange} />
                Instructor
              </label>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-500 text-white rounded-lg font-semibold"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;
