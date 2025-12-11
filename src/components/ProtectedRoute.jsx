import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  console.log("🛡 PROTECTED ROUTE CHECK");
  console.log("User:", user);
  console.log("Required role:", role);
  console.log("Loading:", loading);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role) {
    const userRole = user.user_metadata?.role;

    if (userRole !== role) {
      console.warn("⛔ Role mismatch");
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
