import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function CatalogCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [course, setCourse] = useState(location.state?.course || null);
  const [loading, setLoading] = useState(!course);

  useEffect(() => {
    if (course) return;

    const fetchCourse = async () => {
      const { data, error } = await supabase.from("courses").select("*").eq("id", id).single();
      if (!error) setCourse(data);
      setLoading(false);
    };

    fetchCourse();
  }, [id, course]);

  const handlePay = async () => {
    if (!course) return;

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      alert("You must be logged in.");
      return;
    }

    const { data: existing } = await supabase
      .from("enrollments")
      .select("*")
      .eq("student_id", user.id)
      .eq("course_id", id)
      .maybeSingle();

    if (existing) {
      alert("Already enrolled!");
      navigate("/dashboard");
      return;
    }

    const { error } = await supabase.from("enrollments").insert({ student_id: user.id, course_id: id });
    if (error) {
      console.error(error);
      alert("Enrollment failed.");
      return;
    }

    alert("Payment successful! You are now enrolled.");
    navigate("/dashboard");
  };

  if (loading) return <div className="p-10 text-center text-xl">Loading checkout...</div>;
  if (!course) return <div className="text-center p-10 text-xl text-red-600">Course not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="mb-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">{course.title}</h2>
        <p className="text-gray-600 mt-1">${course.price}</p>
      </div>

      <button
        onClick={handlePay}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        Confirm & Enroll
      </button>
    </div>
  );
}
