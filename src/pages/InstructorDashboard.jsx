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

import { supabase } from "../lib/supabaseClient";

export default function InstructorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTabletView, setIsTabletView] = useState(false);

  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsTabletView(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
          .from("instructor_courses")
          .select(`
            course:courses (
              id,
              title,
              description,
              thumbnail_url
            )
          `);


      console.log("✅ RAW SUPABASE DATA:", data);

      if (error) {
        console.error("Supabase error:", error);
        setError("Failed to load instructor courses.");
      } else if (!data || data.length === 0) {
        setError("No instructor courses found.");
        setCourses([]);
      } else {
        const formattedCourses = data.map(item => ({
          id: item.course.id,
          title: item.course.title,
          lessons: `${item.course.lessons_count || 0} lessons`,
          students: Math.floor(Math.random() * 500),
          rating: (Math.random() * 2 + 3).toFixed(1), 
          progress: Math.floor(Math.random() * 100),
          color: "bg-indigo-50",
          icon: null,
        }));
        setCourses(formattedCourses);
      }

      setLoading(false);
    };

    fetchInstructorCourses();
  }, []);

  
  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    return courses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, courses]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E8F5FF]">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#E8F5FF] min-h-screen">
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
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
            {filteredCourses.map(course => (
              <InstructorCourseCard
                key={course.id}
                icon={course.icon}
                title={course.title}
                students={course.students}
                rating={course.rating}
                color={course.color}
              />
            ))}

            {!filteredCourses.length && (
              <div className="col-span-full text-gray-600 text-center py-10">
                No instructor courses yet.
              </div>
            )}
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
