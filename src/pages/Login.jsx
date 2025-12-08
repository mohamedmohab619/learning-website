import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { profile } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword(formData);
      if (error) throw error;

      // ✅ Redirect after profile loads
      setTimeout(() => {
        if (profile?.role === "instructor") {
          navigate("/instructor-dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 300);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 w-full max-w-md rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="bg-red-100 p-3 mb-4 text-red-700">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <button
            disabled={loading}
            className="w-full bg-teal-500 py-3 text-white rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          No account?{" "}
          <Link to="/register" className="text-teal-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
