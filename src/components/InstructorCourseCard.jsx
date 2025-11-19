import { Users, Star } from "lucide-react";

export default function InstructorCourseCard({
    icon,
    title,
    students,
    rating,
    color = "bg-indigo-100"
}) {
    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
                    {icon}
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Course</p>
                    <h4 className="font-semibold text-gray-900">{title}</h4>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-600 border border-gray-200 rounded-xl p-3">
                <div className="flex items-center gap-2">
                    <Users size={18} className="text-indigo-500" />
                    <div>
                        <p className="text-xs text-gray-500">Enrolled</p>
                        <p className="font-semibold text-gray-900">
                            {typeof students === "number" ? students.toLocaleString() : students}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Star size={18} className="text-amber-500" />
                    <div>
                        <p className="text-xs text-gray-500">Rating</p>
                        <p className="font-semibold text-gray-900">{rating}/5</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

