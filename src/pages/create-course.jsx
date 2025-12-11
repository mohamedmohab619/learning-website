"use client";

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabaseClient";

export default function CreateCoursePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    thumbnail_url: "",
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please login first to create a course.</p>
      </div>
    );
  }

  const handlePublish = async () => {
    console.log("Publish clicked");

    if (!course.title || !course.category) {
      alert("Title and category are required");
      return;
    }

    setLoading(true);

    try {
      console.log("Inserting course into database...");
      const { data, error } = await supabase
        .from("courses")
        .insert([
          {
            title: course.title,
            description: course.description,
            category: course.category,
            price: course.price,
            thumbnail_url: course.thumbnail_url,
            instructor_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        alert("Error saving course: " + error.message);
        return;
      }

      console.log("Course inserted:", data);
      alert("Course published successfully!");
      window.location.href = "/courses";
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create New Course</h1>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Course Title"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            required
          />

          <textarea
            placeholder="Course Description"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={course.category}
            onChange={(e) => setCourse({ ...course, category: e.target.value })}
            required
          />
          <label htmlFor="course-price" className="mb-1 font-semibold text-gray-700"> Price </label>
          <input
            type="number"
            placeholder="Price"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={course.price}
            onChange={(e) => setCourse({ ...course, price: parseFloat(e.target.value) })}
          />

          <input
            type="text"
            placeholder="Thumbnail URL (optional)"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={course.thumbnail_url}
            onChange={(e) => setCourse({ ...course, thumbnail_url: e.target.value })}
          />

          <button
            type="button"
            onClick={handlePublish}
            disabled={loading}
            className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600 disabled:opacity-50 transition-colors"
          >
            {loading ? "Publishing..." : "Publish Course"}
          </button>
        </form>
      </div>
    </div>
  );
}
