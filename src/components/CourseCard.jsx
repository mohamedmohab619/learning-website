import { Link } from "react-router-dom";
import { BookOpen, ClipboardList, TrendingUp } from "lucide-react";

export default function CourseCard(props) {
  const { course } = props;

  if (course) {
    const id = course.id || course._id;
    const image = course.image || course.thumbnail;
    const category = course.category || course.level || "Course";

    return (
      <Link
        to={`/course/${id}`}
        className="block bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      >
        {image && (
          <div className="h-44 w-full overflow-hidden">
            <img
              src={image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
            {category}
          </p>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
            {course.title}
          </h3>
          {course.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {course.description}
            </p>
          )}
        </div>
      </Link>
    );
  }

  const { icon, title, color, lessons, quizzes, progress } = props;

  return (
    <div className="p-5 rounded-2xl shadow-sm border bg-white hover:shadow-md transition">
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${color}`}>
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-gray-800 text-lg">{title}</h3>

      <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-600 mt-4 p-3 border border-gray-200 rounded-lg">
        <span className="flex items-center gap-1.5 sm:gap-2">
          <BookOpen size={16} className="text-blue-500 flex-shrink-0" />
          <span className="whitespace-nowrap">{lessons}</span>
        </span>
        <span className="flex items-center gap-1.5 sm:gap-2">
          <ClipboardList size={16} className="text-purple-500 flex-shrink-0" />
          <span className="whitespace-nowrap">{quizzes}</span>
        </span>
        <span className="flex items-center gap-1.5 sm:gap-2">
          <TrendingUp size={16} className="text-green-500 flex-shrink-0" />
          <span className="whitespace-nowrap">{progress}%</span>
        </span>
      </div>
    </div>
  );
}
