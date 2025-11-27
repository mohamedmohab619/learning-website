import React, { useState } from "react";
import CatalogCourseCard from "../components/CatalogCourseCard";
import courses from "../data/courseData";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter === "" || course.category === categoryFilter)
  );

  const categories = [...new Set(courses.map((c) => c.category))];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>

      <input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-3 mb-6 flex-wrap">
        <button
          onClick={() => setCategoryFilter("")}
          className={`px-4 py-2 rounded-lg ${
            categoryFilter === "" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded-lg ${
              categoryFilter === cat ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <CatalogCourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            img={course.image}
            category={course.category}
          />
        ))}
      </div>
    </div>
  );
}
