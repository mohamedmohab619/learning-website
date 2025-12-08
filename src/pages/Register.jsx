import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.full_name,
            role: formData.role,
          },
        },
      });

      if (error) throw error;

      setSuccess(
        "Registration successful. Please check your email to confirm."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 w-full max-w-md rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="bg-red-100 p-3 mb-4 text-red-700">{error}</p>}
        {success && (
          <p className="bg-green-100 p-3 mb-4 text-green-700">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="full_name"
            placeholder="Full name"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

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
            minLength={6}
            required
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={formData.role === "student"}
                onChange={handleChange}
              />{" "}
              Student
            </label>

            <label>
              <input
                type="radio"
                name="role"
                value="instructor"
                checked={formData.role === "instructor"}
                onChange={handleChange}
              />{" "}
              Instructor
            </label>
          </div>

          <button
            disabled={loading}
            className="w-full bg-teal-500 py-3 text-white rounded"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
