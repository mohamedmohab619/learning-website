import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import courses from "../data/courseData";

export default function CatalogCourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === id);

  const [userReview, setUserReview] = useState("");
  const [reviews, setReviews] = useState(course ? course.reviews : []);

  if (!course) {
    return (
      <div className="p-10 text-center text-2xl font-bold">
        🚧 Course details coming soon...
      </div>
    );
  }

  const suggestedCourses = courses.filter((c) =>
    course.suggested.includes(c.id)
  );

  const handleEnroll = () => {
    navigate(`/catalog/checkout/${course.id}`);
  };

  const addReview = () => {
    if (userReview.trim() === "") return;

    const newReview = {
      user: "You",
      comment: userReview,
    };

    setReviews([newReview, ...reviews]);
    setUserReview("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
      {/* Course Image */}
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-72 object-cover rounded-lg shadow-sm"
      />

      {/* Title */}
      <h1 className="text-4xl font-extrabold mt-5 tracking-tight">
        {course.title}
      </h1>

      {/* Description */}
      <p className="mt-4 text-gray-700 leading-relaxed text-lg">
        {course.description}
      </p>

      {/* Course Details */}
      <div className="mt-6 bg-gray-50 p-5 rounded-lg border space-y-2 text-lg shadow-sm">
        <p><strong>Instructor:</strong> {course.instructor}</p>
        <p><strong>Duration:</strong> {course.duration}</p>
        <p><strong>Price:</strong> {course.price}</p>
        <p><strong>Category:</strong> {course.category}</p>
        <p><strong>Rating:</strong> ⭐ {course.rating}</p>
      </div>

      {/* Enroll Button */}
      <button
        onClick={handleEnroll}
        className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md"
      >
        Enroll Now
      </button>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">Reviews</h2>

        {/* Add Review */}
        <div className="mb-5">
          <textarea
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            placeholder="Write your review here..."
            className="w-full border rounded-lg p-3 h-28 shadow-sm"
          />
          <button
            onClick={addReview}
            className="mt-3 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add Review
          </button>
        </div>

        {/* Existing Reviews */}
        <ul className="space-y-3">
          {reviews.map((rev, i) => (
            <li key={i} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <strong>{rev.user}:</strong> {rev.comment}
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested Courses */}
      {suggestedCourses.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Suggested Courses</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {suggestedCourses.map((sc) => (
              <Link
                key={sc.id}
                to={`/catalog/course/${sc.id}`}
                className="border p-4 rounded-lg hover:shadow-xl transition block bg-white"
              >
                <img
                  src={sc.image}
                  alt={sc.title}
                  className="w-full h-32 object-cover rounded"
                />
                <h3 className="text-xl font-semibold mt-3">{sc.title}</h3>
                <p className="text-gray-500">{sc.category}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


