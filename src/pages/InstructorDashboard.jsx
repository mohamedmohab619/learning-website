import { useState, useEffect, useMemo } from "react";
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
import { useAuth } from "../contexts/AuthContext";

export default function InstructorDashboard() {
  const { user } = useAuth(); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsSidebarOpen(width >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      if (!user) return; 
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .eq("instructor_id", user.id) // only courses by this instructor
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (!data || data.length === 0) {
          setCourses([]);
          setError("No courses found.");
        } else {
          const formattedCourses = data.map(course => ({
            id: course.id,
            title: course.title,
            lessons: `${course.duration || 0} lessons`, // optional
            students: Math.floor(Math.random() * 500), // placeholder
            rating: course.rating?.toFixed(1) || "0.0",
            color: "bg-indigo-50",
            thumbnail_url: course.thumbnail_url,
          }));
          setCourses(formattedCourses);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorCourses();
  }, [user]);

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    return courses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, courses]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E8F5FF]">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#E8F5FF] min-h-screen">
      <div className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
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
                title={course.title}
                students={course.students}
                rating={course.rating}
                color={course.color}
                thumbnail_url={course.thumbnail_url}
              />
            ))}

            {!filteredCourses.length && (
              <div className="col-span-full text-gray-600 text-center py-10">
                {error || "No courses found."}
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
            {/* <Leaderboard /> */}
          </div>

          <p className="text-gray-500 mt-4">Inspiring students across every cohort.</p>
        </div>

        <div className="w-full lg:w-80 bg-gray-50 p-4 lg:border-l border-t lg:border-t-0">
          <ProfileCard />
          <div className="my-4">
            <a
              href="/instructor/create-course"
              className="block w-full text-center px-4 py-3 bg-teal-500 text-white rounded-xl font-semibold shadow hover:bg-teal-600 transition-colors"
            >
              + Create New Course
            </a>
          </div>
          <CalendarWidget />
          <ToDoItem />
        </div>
      </div>
    </div>
  );
}
