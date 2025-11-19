import { BookOpen, ClipboardList, TrendingUp } from "lucide-react";

export default function CourseCard({ icon, title, color, lessons, quizzes, progress }) {
  return (
    <div className={`p-5 rounded-2xl shadow-sm border bg-white hover:shadow-md transition`}>
      {/* Icon */}
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${color}`}>
        {icon}
      </div>

      {/* Title */}
      <h3 className="mt-4 font-semibold text-gray-800 text-lg">{title}</h3>

      {/* Stats row */}
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
