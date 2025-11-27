import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';
import { mockAPI, mockUsers } from '../data/mockData';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        // Try to fetch real profile, fallback to mock if fails
        fetchUserProfile();
      } catch (err) {
        console.error('Error parsing saved user:', err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
      setError(null);
      setUseMockData(false);
    } catch (err) {
      console.warn('API unavailable, using mock data');
      setUseMockData(true);
      // Keep existing user from localStorage
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Try real API first
      try {
        const response = await authAPI.login(username, password);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setUseMockData(false);
        return { success: true };
      } catch (apiError) {
        // Fallback to mock data
        console.warn('API unavailable, using mock data');
        const mockResult = mockAPI.login(username, password);
        if (mockResult.success) {
          localStorage.setItem('token', mockResult.data.token);
          localStorage.setItem('user', JSON.stringify(mockResult.data.user));
          setUser(mockResult.data.user);
          setUseMockData(true);
          return { success: true };
        }
        throw apiError;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setUseMockData(false);
      return { success: true };
    } catch (err) {
      // For mock data, create a new student user
      console.warn('API unavailable, using mock data');
      const newUser = {
        ...mockUsers.student,
        username: userData.username,
        email: userData.email,
        _id: `student_${Date.now()}`,
      };
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setUseMockData(true);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
    setUseMockData(false);
  };

  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.updateProfile(userData);
      const updatedUser = { ...user, ...response.data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUseMockData(false);
      return { success: true };
    } catch (err) {
      // Mock update
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUseMockData(true);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isInstructor: user?.role === 'instructor',
    isStudent: user?.role === 'student' || !user?.role,
    useMockData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
