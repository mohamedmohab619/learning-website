import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CourseProvider } from "./contexts/CourseContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import Catalog from "./pages/Catalog";
import CatalogCheckout from "./pages/CatalogCheckout";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* ✅ Router must wrap AuthProvider (important) */}
        <AuthProvider>
          <CourseProvider>
            <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
              <Header />

              <main className="flex-1">
                <Routes>
                  {/* ---------- PUBLIC ROUTES ---------- */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/catalog/checkout/:id" element={<CatalogCheckout />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:id" element={<CourseDetails />} />
                  <Route path="/courses/checkout/:id" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* ---------- STUDENT DASHBOARD ---------- */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute role="student">
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* ---------- INSTRUCTOR DASHBOARD ---------- */}
                  <Route
                    path="/instructor"
                    element={
                      <ProtectedRoute role="instructor">
                        <InstructorDashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* ---------- ADMIN DASHBOARD ---------- */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute role="admin">
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* ---------- OTHER PROTECTED ROUTES ---------- */}
                  <Route
                    path="/course/:id"
                    element={
                      <ProtectedRoute>
                        <CoursePage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/lesson/:courseId/:lessonId"
                    element={
                      <ProtectedRoute>
                        <LessonPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />

                  {/* ---------- CATCH ALL ---------- */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </CourseProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
