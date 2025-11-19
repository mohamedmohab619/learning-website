import { useState, useMemo, useEffect } from "react";
import Sidebar from "../components/sidebar";
import CourseCard from "../components/CourseCard";
import ProfileCard from "../components/ProfileCard";
import CalendarWidget from "../components/CalendarWidget";
import ToDoItem from "../components/ToDoItem";
import Topbar from "../components/Topbar";
import BarChart from "../components/BarChart";
import GaugeChart from "../components/GaugeChart";
import Leaderboard from "../components/Leaderboard";

import { BookOpen, PenSquare, Palette, Code, Database, Camera, Music, Gamepad2, Paintbrush } from "lucide-react";

// All available courses
const allCourses = [
  { id: 1, icon: <BookOpen size={22} className="text-indigo-600" />, title: "Basic: HTML and CSS", lessons: "24", quizzes: "12", progress: "90", color: "bg-indigo-100" },
  { id: 2, icon: <PenSquare size={22} className="text-orange-600" />, title: "Branding Design", lessons: "24", quizzes: "8", progress: "85", color: "bg-orange-100" },
  { id: 3, icon: <Palette size={22} className="text-green-600" />, title: "Motion Design", lessons: "24", quizzes: "15", progress: "78", color: "bg-green-100" },
  { id: 4, icon: <Code size={22} className="text-blue-600" />, title: "JavaScript Fundamentals", lessons: "30", quizzes: "18", progress: "65", color: "bg-blue-100" },
  { id: 5, icon: <Database size={22} className="text-purple-600" />, title: "Database Management", lessons: "20", quizzes: "10", progress: "72", color: "bg-purple-100" },
  { id: 6, icon: <Camera size={22} className="text-red-600" />, title: "Photography Basics", lessons: "18", quizzes: "9", progress: "88", color: "bg-red-100" },
  { id: 7, icon: <Music size={22} className="text-pink-600" />, title: "Music Production", lessons: "28", quizzes: "14", progress: "55", color: "bg-pink-100" },
  { id: 8, icon: <Gamepad2 size={22} className="text-yellow-600" />, title: "Game Development", lessons: "32", quizzes: "16", progress: "60", color: "bg-yellow-100" },
  { id: 9, icon: <Paintbrush size={22} className="text-teal-600" />, title: "Digital Art", lessons: "22", quizzes: "11", progress: "80", color: "bg-teal-100" },
];

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTabletView, setIsTabletView] = useState(false);

  // Detect if we're in tablet view (md breakpoint: 768px to lg breakpoint: 1024px)
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      // Tablet view: between 768px (md) and 1023px (before lg)
      setIsTabletView(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Filter courses based on search query
  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) {
      // Show 4 courses on tablet, 3 on desktop/mobile
      const defaultCount = isTabletView ? 4 : 3;
      return allCourses.slice(0, defaultCount);
    }
    // Filter courses that match the search query
    return allCourses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, isTabletView]);

  return (
    <div className="flex bg-[#E2F0FF] min-h-screen">
      {/* Sidebar - Hidden on mobile, shown via toggle */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Blur overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-sm bg-white/10 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row min-w-0">
        {/* Main content */}
        <div className="flex-1 p-4 sm:p-6 w-full">
          <Topbar 
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-5 mt-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                icon={course.icon}
                title={course.title}
                lessons={course.lessons}
                quizzes={course.quizzes}
                progress={course.progress}
                color={course.color}
              />
            ))}
          </div>

          {/* 📊 Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-xl p-4 shadow">
              <BarChart />
            </div>
            <div className="bg-white rounded-xl p-4 shadow flex justify-center items-center">
              <GaugeChart value={78} />
            </div>
          </div>

          {/* 🏆 Leaderboard under the charts */}
          <div className="mt-8">
            <Leaderboard />
          </div>

          <p className="text-gray-500 mt-4">Let's learn something new today!</p>
        </div>

        {/* Right sidebar - Stacks below on mobile, side on desktop */}
        <div className="w-full lg:w-80 bg-gray-50 p-4 lg:border-l border-t lg:border-t-0">
          <ProfileCard />
          <CalendarWidget />

          {/* To-Do List */}
          <ToDoItem />
        </div>
      </div>
    </div>
  );
}
