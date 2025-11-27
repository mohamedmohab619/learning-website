import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, isAdmin, isInstructor } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-teal-500 dark:bg-teal-700 text-white sticky top-0 z-50 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white hover:opacity-80 transition-opacity">
          TOTC
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white font-medium hover:opacity-80 transition-opacity">Home</Link>
          <Link to="/courses" className="text-white font-medium hover:opacity-80 transition-opacity">Courses</Link>
          {isAuthenticated && (
            <>
              {isAdmin && (
                <Link to="/admin" className="text-white font-medium hover:opacity-80 transition-opacity">Admin</Link>
              )}
              {isInstructor && (
                <Link to="/instructor" className="text-white font-medium hover:opacity-80 transition-opacity">Instructor</Link>
              )}
              <Link to="/dashboard" className="text-white font-medium hover:opacity-80 transition-opacity">Dashboard</Link>
              <Link to="/profile" className="text-white font-medium hover:opacity-80 transition-opacity">Profile</Link>
            </>
          )}
        </nav>

        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2 text-white font-medium">
                <User size={20} />
                <span className="hidden lg:inline">{user?.username || 'User'}</span>
              </Link>
              <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="px-6 py-2 rounded-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-teal-500 transition-all">
                Login
              </Link>
              <Link to="/register" className="px-6 py-2 rounded-lg font-semibold bg-white text-teal-500 hover:bg-gray-50 transition-all">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden bg-transparent border-none text-white cursor-pointer p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="block md:hidden border-t border-white/20 px-6 py-4">
          <nav className="flex flex-col gap-4">
            <Link to="/" className="text-white font-medium py-3 hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/courses" className="text-white font-medium py-3 hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>
              Courses
            </Link>
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-white font-medium py-3 hover:opacity-80 transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                {isInstructor && (
                  <Link
                    to="/instructor"
                    className="text-white font-medium py-3 hover:opacity-80 transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Instructor Dashboard
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="text-white font-medium py-3 hover:opacity-80 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="text-white font-medium py-3 hover:opacity-80 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="text-white font-medium py-3 hover:opacity-80 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 rounded-lg text-left mt-2 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white font-medium py-3 hover:opacity-80 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white font-medium py-3 hover:opacity-80 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

