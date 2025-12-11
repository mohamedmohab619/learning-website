import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ remove profile from here
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  // ✅ role comes from auth metadata
  const role = user?.user_metadata?.role;

  const dashboardPath =
    role === "student"
      ? "/dashboard"
      : role === "instructor"
      ? "/instructor"
      : role === "admin"
      ? "/admin"
      : "/";

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

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

              {/* ✅ role-aware dashboard link */}
              <Link to={dashboardPath}>Dashboard</Link>

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
                  {user.email}
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

                {/* ✅ role-aware dashboard link */}
                <Link
                  to={dashboardPath}
                  onClick={() => setIsMenuOpen(false)}
                >
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
