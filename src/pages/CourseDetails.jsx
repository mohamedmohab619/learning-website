import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Clock, Star, User, Tag } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [course, setCourse] = useState(null);
  // const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);

      const { data: courseData, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !courseData) {
        setCourse(null);
        setLoading(false);
        return;
      }

      setCourse(courseData);
      setLoading(false);
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user || !id) {
        setIsEnrolled(false);
        return;
      }

      const { data } = await supabase
        .from("enrollments")
        .select("id")
        .match({ student_id: user.id, course_id: id })
        .limit(1);

      setIsEnrolled(data?.length > 0);
    };

    if (!authLoading) checkEnrollment();
  }, [user, id, authLoading]);

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const numericPrice = Number(course?.price ?? 0);
    if (numericPrice > 0) {
      navigate(`/courses/checkout/${id}`, { state: { course } });
      return;
    }

    setEnrolling(true);

    try {
      const { data: existing } = await supabase
        .from("enrollments")
        .select("id")
        .match({ student_id: user.id, course_id: id })
        .limit(1);

      if (existing?.length) {
        setIsEnrolled(true);
        alert("Already enrolled.");
        return;
      }

      await supabase.from("enrollments").insert([{ student_id: user.id, course_id: id }]);
      setIsEnrolled(true);
      alert("Enrolled successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Enrollment failed. Try again.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-xl font-semibold">Loading course...</div>;
  if (!course) return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-purple-500 to-indigo-600 px-4">
      <div className="bg-white/95 rounded-2xl shadow-2xl px-10 py-8 text-center max-w-lg">
        <p className="text-3xl font-extrabold text-gray-900 mb-2">Course not found</p>
        <p className="text-gray-600 mb-6">This course may have been removed or the link is incorrect.</p>
        <Link to="/courses" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">Back to all courses</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-purple-500 via-indigo-600 to-slate-900 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-8 p-6 md:p-10">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img src={course.image} alt={course.title} className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-indigo-100 text-indigo-700 px-4 py-1 text-sm font-semibold">
                <Tag className="w-4 h-4 mr-1.5" />{course.category}
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-4 py-1 text-sm font-semibold">
                ${course.price}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">{course.title}</h1>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">{course.description}</p>

            <div className="mt-4 flex flex-wrap gap-4">
              <button
                onClick={handleEnroll}
                disabled={isEnrolled || enrolling}
                className={`px-8 py-3 rounded-xl text-lg font-semibold transition ${isEnrolled || enrolling ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
              >
                {enrolling ? "Enrolling..." : isEnrolled ? "Enrolled" : "Enroll Now"}
              </button>

              <button onClick={() => navigate(-1)} className="px-6 py-3 rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-50 transition">Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
