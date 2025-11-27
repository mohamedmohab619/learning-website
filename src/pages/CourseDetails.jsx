import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Clock, Star, User, Tag } from "lucide-react";
import courses from "../data/courseData";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === id);

  const [userReview, setUserReview] = useState("");
  const [reviews, setReviews] = useState(course ? course.reviews : []);

  if (!course) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-purple-500 to-indigo-600 px-4">
        <div className="bg-white/95 rounded-2xl shadow-2xl px-10 py-8 text-center max-w-lg">
          <p className="text-3xl font-extrabold text-gray-900 mb-2">
            Course not found
          </p>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find this course. It may have been removed or the link is incorrect.
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

  const suggestedCourses = courses.filter((c) =>
    course.suggested.includes(c.id)
  );

  const handleEnroll = () => {
    navigate(`/courses/checkout/${course.id}`);
  };

  const addReview = () => {
    if (userReview.trim() === "") return;

    const newReview = {
      user: "You",
      comment: userReview.trim(),
    };

    setReviews([newReview, ...reviews]);
    setUserReview("");
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-purple-500 via-indigo-600 to-slate-900 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur rounded-2xl shadow-2xl overflow-hidden">
        {/* Top hero section */}
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

          {/* Main info */}
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
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 border border-slate-100">
                <User className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Instructor</p>
                  <p className="font-semibold text-gray-900">{course.instructor}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 border border-slate-100">
                <Clock className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
                  <p className="font-semibold text-gray-900">{course.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 border border-slate-100">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Rating</p>
                  <p className="font-semibold text-gray-900">
                    {course.rating} <span className="text-xs text-gray-500">({reviews.length} reviews)</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              <button
                onClick={handleEnroll}
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-indigo-600 text-white text-base md:text-lg font-semibold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition"
              >
                Enroll Now
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-200 text-gray-800 font-medium hover:bg-gray-50 transition"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Bottom content: reviews + suggested */}
        <div className="border-t border-slate-100 bg-slate-50/60 px-6 md:px-10 pb-10 pt-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Reviews */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Student reviews</h2>

              {/* Add Review */}
              <div className="mb-5 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <p className="font-medium text-gray-800 mb-2">Share your feedback</p>
                <textarea
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  placeholder="Write your review here..."
                  className="w-full border border-slate-200 rounded-xl p-3 h-24 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={addReview}
                    className="px-5 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition"
                  >
                    Add Review
                  </button>
                </div>
              </div>

              {/* Existing Reviews */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {reviews.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No reviews yet. Be the first to review this course.
                  </p>
                ) : (
                  reviews.map((rev, i) => (
                    <div
                      key={i}
                      className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-start gap-3"
                    >
                      <div className="mt-1 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-semibold text-indigo-700">
                        {rev.user?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{rev.user}</p>
                        <p className="text-sm text-gray-700 mt-1">{rev.comment}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Suggested courses */}
            <div className="lg:col-span-1">
              {suggestedCourses.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">You may also like</h2>
                  <div className="space-y-3">
                    {suggestedCourses.map((sc) => (
                      <Link
                        key={sc.id}
                        to={`/courses/${sc.id}`}
                        className="flex gap-3 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                      >
                        <div className="w-24 h-20 flex-shrink-0 overflow-hidden">
                          <img
                            src={sc.image}
                            alt={sc.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="py-2 pr-3 flex-1">
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                            {sc.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">{sc.category}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
