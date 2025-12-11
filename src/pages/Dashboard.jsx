// /src/pages/Dashboard.jsx
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
import { BookOpen } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTabletView, setIsTabletView] = useState(false);

  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  // Detect tablet view
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
    const fetchCourses = async () => {
      setLoading(true);

      if (!user) {
        if (authLoading) {
          setLoading(true);
          return;
        } else {
          setCourses([]);
          setLoading(false);
          return;
        }
      }

      try {
        const { data, error } = await supabase
          .from("enrollments")
          .select(`
            id,
            course_id,
            course:courses ( id, title, thumbnail_url, category )
          `)
          .eq("student_id", user.id);

        if (error) {
          console.error("Supabase error fetching enrollments:", error);
          setCourses([]);
          setLoading(false);
          return;
        }

        if (!data || data.length === 0) {
          setCourses([]);
          setLoading(false);
          return;
        }

        const formattedCourses = data
          .filter(item => item.course)
          .map((item) => ({
            id: item.course.id,
            title: item.course.title,
            thumbnail: item.course.thumbnail_url || "",
            category: item.course.category || ""
          }));

        setCourses(formattedCourses);

        const fakeProgress = {};
        formattedCourses.forEach((c) => {
          fakeProgress[c.id] = Math.floor(Math.random() * 100);
        });
        setProgress(fakeProgress);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching student courses:", err);
        setCourses([]);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user, authLoading]);

  const getIconAndColor = () => ({
    icon: <BookOpen size={22} className="text-indigo-600" />,
    color: "bg-indigo-100",
  });

  const dashboardCourses = useMemo(() => {
    const filtered = courses.filter((c) =>
      (c.title || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const defaultCount = isTabletView ? 4 : 3;
    const slice = searchQuery.trim() ? filtered : filtered.slice(0, defaultCount);

    return slice.map((course) => {
      const { icon, color } = getIconAndColor(course);

      return {
        id: course.id,
        icon,
        title: course.title,
        lessons: "20 lessons",
        quizzes: `${progress[course.id] || 0}% complete`,
        progress: progress[course.id] || 0,
        color,
      };
    });
  }, [courses, progress, searchQuery, isTabletView]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E2F0FF]">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-xl font-bold mb-2">You are not logged in</h2>
          <p className="text-sm text-gray-600 mb-4">Please log in to see your enrolled courses.</p>
          <a href="/login" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg">Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#E2F0FF] min-h-screen">
      <div className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {isSidebarOpen && <div className="fixed inset-0 backdrop-blur-sm bg-white/10 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col lg:flex-row min-w-0">
        <div className="flex-1 p-4 sm:p-6 w-full">
          <Topbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} searchQuery={searchQuery} onSearchChange={setSearchQuery} />

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-5 mt-6">
            {dashboardCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}

            {!dashboardCourses.length && (
              <div className="col-span-full text-gray-600 text-center py-10">No enrolled courses yet.</div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-xl p-4 shadow"><BarChart /></div>
            <div className="bg-white rounded-xl p-4 shadow flex justify-center items-center"><GaugeChart value={78} /></div>
          </div>

          {/* <div className="mt-8"><Leaderboard /></div> */}
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
