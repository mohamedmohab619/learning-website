import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const role = user.user_metadata?.role;

    console.log("✅ USER METADATA ROLE:", role);

    if (role === "student") {
      navigate("/dashboard", { replace: true });
    }

    if (role === "instructor") {
      navigate("/instructor", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-96 space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        {error && <p className="text-red-500">{error}</p>}

        <button className="w-full bg-teal-500 text-white py-2">
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center">
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
