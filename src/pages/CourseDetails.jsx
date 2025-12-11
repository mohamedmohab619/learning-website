import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Clock, Star, User, Tag } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Temporary front-end review system until we implement DB reviews
  const [userReview, setUserReview] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);

      // 1) Fetch main course
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

      // 2) Fetch suggested courses
      if (courseData.suggested?.length > 0) {
        const { data: suggested } = await supabase
          .from("courses")
          .select("id, title, image, category")
          .in("id", courseData.suggested);

        setSuggestedCourses(suggested || []);
      }

      setReviews(courseData.reviews || []); // placeholder until DB reviews exist
      setLoading(false);
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = () => {
    navigate(`/courses/checkout/${id}`);
  };

  const addReview = () => {
    if (!userReview.trim()) return;

    const newReview = {
      user: "You",
      comment: userReview.trim(),
    };

    setReviews([newReview, ...reviews]);
    setUserReview("");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xl font-semibold">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-purple-500 to-indigo-600 px-4">
        <div className="bg-white/95 rounded-2xl shadow-2xl px-10 py-8 text-center max-w-lg">
          <p className="text-3xl font-extrabold text-gray-900 mb-2">
            Course not found
          </p>
          <p className="text-gray-600 mb-6">
            This course may have been removed or the link is incorrect.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Back to all courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-purple-500 via-indigo-600 to-slate-900 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur rounded-2xl shadow-2xl overflow-hidden">

        {/* Top section */}
        <div className="grid lg:grid-cols-12 gap-8 p-6 md:p-10">

          {/* Image */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Course information */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-indigo-100 text-indigo-700 px-4 py-1 text-sm font-semibold">
                <Tag className="w-4 h-4 mr-1.5" />
                {course.category}
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-4 py-1 text-sm font-semibold">
                {course.price}
              </span>
              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-4 py-1 text-sm font-semibold">
                <Star className="w-4 h-4 mr-1.5 fill-amber-400 text-amber-400" />
                {course.rating} / 5
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              {course.title}
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              {course.description}
            </p>

            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
                <User className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Instructor</p>
                  <p className="font-semibold">{course.instructor}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
                <Clock className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Duration</p>
                  <p className="font-semibold">{course.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Rating</p>
                  <p className="font-semibold">
                    {course.rating}{" "}
                    <span className="text-xs text-gray-500">
                      ({reviews.length} reviews)
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-wrap gap-4">
              <button
                onClick={handleEnroll}
                className="px-8 py-3 rounded-xl bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700 transition"
              >
                Enroll Now
              </button>

              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-50 transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section: reviews + suggested courses */}
        <div className="border-t bg-slate-50/60 px-6 md:px-10 pb-10 pt-6">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Reviews */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Student reviews
              </h2>

              {/* Add Review */}
              <div className="mb-5 bg-white rounded-2xl border p-4 shadow-sm">
                <p className="font-medium text-gray-800 mb-2">
                  Share your feedback
                </p>

                <textarea
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  placeholder="Write your review..."
                  className="w-full border rounded-xl p-3 h-24 text-sm focus:ring-indigo-500"
                />

                <div className="mt-3 flex justify-end">
                  <button
                    onClick={addReview}
                    className="px-5 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
                  >
                    Add Review
                  </button>
                </div>
              </div>

              {/* Reviews list */}
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {reviews.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No reviews yet. Be the first to review this course.
                  </p>
                ) : (
                  reviews.map((r, i) => (
                    <div
                      key={i}
                      className="bg-white border p-4 rounded-2xl shadow-sm flex gap-3"
                    >
                      <div className="mt-1 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-semibold text-indigo-700">
                        {r.user?.[0]?.toUpperCase() || "U"}
                      </div>

                      <div>
                        <p className="text-sm font-semibold">{r.user}</p>
                        <p className="text-sm text-gray-700 mt-1">
                          {r.comment}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Suggested Courses */}
            <div className="lg:col-span-1">
              {suggestedCourses.length > 0 && (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    You may also like
                  </h2>

                  <div className="space-y-3">
                    {suggestedCourses.map((sc) => (
                      <Link
                        key={sc.id}
                        to={`/courses/${sc.id}`}
                        className="flex gap-3 bg-white border rounded-2xl shadow-sm hover:shadow-md transition"
                      >
                        <div className="w-24 h-20 overflow-hidden">
                          <img
                            src={sc.image}
                            alt={sc.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="py-2 pr-3 flex-1">
                          <h3 className="text-sm font-semibold line-clamp-2">
                            {sc.title}
                          </h3>
                          <p className="text-xs text-gray-500">{sc.category}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
