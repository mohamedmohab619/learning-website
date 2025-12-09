import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, loading, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isAuthenticated = !!user;
  const role = profile?.role;

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate("/login");
  };


  if (loading) return null;

  return (
    <header className="bg-teal-500 dark:bg-teal-700 text-white sticky top-0 z-50 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold hover:opacity-80">
          TOTC
        </Link>

        {/* ---------- DESKTOP NAV ---------- */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>

          {isAuthenticated && (
            <>
              {role === "admin" && <Link to="/admin">Admin</Link>}
              {role === "instructor" && <Link to="/instructor">Instructor</Link>}
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
            </>
          )}
        </nav>

        {/* ---------- DESKTOP ACTIONS ---------- */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2">
                <User size={20} />
                <span className="hidden lg:inline">
                  {profile?.full_name || user.email}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-2 border-2 border-white rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-white text-teal-600 rounded-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* ---------- MOBILE MENU BUTTON ---------- */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ---------- MOBILE MENU ---------- */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/20 px-6 py-4">
          <nav className="flex flex-col gap-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/courses" onClick={() => setIsMenuOpen(false)}>Courses</Link>

            {isAuthenticated ? (
              <>
                {role === "admin" && (
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                    Admin Dashboard
                  </Link>
                )}
                {role === "instructor" && (
                  <Link to="/instructor" onClick={() => setIsMenuOpen(false)}>
                    Instructor Dashboard
                  </Link>
                )}
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white/20 mt-2 py-2 rounded-lg text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
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
