import { useState, useMemo, useEffect } from "react";
import Sidebar from "../components/sidebar";
import InstructorCourseCard from "../components/InstructorCourseCard";
import ProfileCard from "../components/ProfileCard";
import CalendarWidget from "../components/CalendarWidget";
import ToDoItem from "../components/ToDoItem";
import Topbar from "../components/Topbar";
import BarChart from "../components/BarChart";
import GaugeChart from "../components/GaugeChart";
import Leaderboard from "../components/Leaderboard";

import {
  BookOpenCheck,
  Presentation,
  Layout,
  Code2,
  PenTool,
  Globe,
  Brush,
  Layers
} from "lucide-react";

const instructorCourses = [
  { id: 1, icon: <BookOpenCheck size={22} className="text-indigo-600" />, title: "UI Systems Masterclass", students: 284, rating: 4.9, color: "bg-indigo-50" },
  { id: 2, icon: <Presentation size={22} className="text-rose-600" />, title: "Storytelling for Creators", students: 198, rating: 4.7, color: "bg-rose-50" },
  { id: 3, icon: <Layout size={22} className="text-emerald-600" />, title: "Responsive Design Patterns", students: 312, rating: 4.8, color: "bg-emerald-50" },
  { id: 4, icon: <Code2 size={22} className="text-blue-600" />, title: "Advanced JavaScript", students: 356, rating: 4.6, color: "bg-blue-50" },
  { id: 5, icon: <PenTool size={22} className="text-orange-600" />, title: "Illustration Lab", students: 142, rating: 4.8, color: "bg-orange-50" },
  { id: 6, icon: <Globe size={22} className="text-purple-600" />, title: "Design Systems for Web", students: 205, rating: 4.7, color: "bg-purple-50" },
  { id: 7, icon: <Brush size={22} className="text-pink-600" />, title: "Digital Painting Studio", students: 174, rating: 4.9, color: "bg-pink-50" },
  { id: 8, icon: <Layers size={22} className="text-teal-600" />, title: "Product Prototype Sprint", students: 221, rating: 4.8, color: "bg-teal-50" }
];

export default function InstructorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTabletView, setIsTabletView] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsTabletView(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) {
      const defaultCount = isTabletView ? 4 : 3;
      return instructorCourses.slice(0, defaultCount);
    }
    return instructorCourses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, isTabletView]);

  return (
    <div className="flex bg-[#E8F5FF] min-h-screen">
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/10 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col lg:flex-row min-w-0">
        <div className="flex-1 p-4 sm:p-6 w-full">
          <Topbar
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            title="Instructor Hub"
            subtitle="Monitor your teaching impact"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-5 mt-6">
            {filteredCourses.map((course) => (
              <InstructorCourseCard
                key={course.id}
                icon={course.icon}
                title={course.title}
                students={course.students}
                rating={course.rating}
                color={course.color}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-xl p-4 shadow">
              <BarChart />
            </div>
            <div className="bg-white rounded-xl p-4 shadow flex justify-center items-center">
              <GaugeChart value={82} />
            </div>
          </div>

          <div className="mt-8">
            <Leaderboard />
          </div>

          <p className="text-gray-500 mt-4">Inspiring students across every cohort.</p>
        </div>

        <div className="w-full lg:w-80 bg-gray-50 p-4 lg:border-l border-t lg:border-t-0">
          <ProfileCard />
          <CalendarWidget />
          <ToDoItem />
        </div>
      </div>
    </div>
  );
}

