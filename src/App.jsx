import { useState } from "react";
import Dashboard from "./pages/dashboard.jsx";
import InstructorDashboard from "./pages/instructorDashboard.jsx";

export default function App() {
  const [activeView, setActiveView] = useState("student");

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/90 border border-gray-200 rounded-full shadow-md px-2 py-1 backdrop-blur">
        <button
          onClick={() => setActiveView("student")}
          className={`px-3 py-1 text-sm font-medium rounded-full transition ${
            activeView === "student"
              ? "bg-indigo-600 text-white shadow"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Learner view
        </button>
        <button
          onClick={() => setActiveView("instructor")}
          className={`px-3 py-1 text-sm font-medium rounded-full transition ${
            activeView === "instructor"
              ? "bg-indigo-600 text-white shadow"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Instructor view
        </button>
      </div>

      {activeView === "student" ? <Dashboard /> : <InstructorDashboard />}
    </>
  );
}