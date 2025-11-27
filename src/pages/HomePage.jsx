import React, { useState, useMemo } from 'react';
import { useCourse } from '../contexts/CourseContext';
import CourseCard from '../components/CourseCard';
import { Search, Filter, BookOpen, Users, Award } from 'lucide-react';

const HomePage = () => {
  const { courses, loading } = useCourse();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel =
        selectedLevel === 'all' ||
        course.level?.toLowerCase() === selectedLevel.toLowerCase();
      return matchesSearch && matchesLevel;
    });
  }, [courses, searchTerm, selectedLevel]);

  const stats = [
    { icon: BookOpen, label: 'Courses', value: `${courses.length}+` },
    { icon: Users, label: 'Students', value: '50K+' },
    { icon: Award, label: 'Certificates', value: '25K+' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
              Master React Development with
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Interactive Learning</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Learn React, JavaScript, and modern web development through hands-on projects,
              interactive lessons, and expert guidance.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-8 py-4 rounded-lg font-semibold text-lg bg-white text-indigo-600 hover:bg-gray-50 transition-all transform hover:-translate-y-0.5">Start Learning</button>
              <button className="px-8 py-4 rounded-lg font-semibold text-lg bg-white/20 text-white border-2 border-white hover:bg-white hover:text-indigo-600 transition-all transform hover:-translate-y-0.5">Browse Courses</button>
            </div>
          </div>
        </section>

        <section className="py-15">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center transition-transform hover:-translate-y-1">
                <stat.icon size={32} className="text-yellow-400 mb-4 mx-auto" />
                <div className="flex flex-col gap-2">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/80 text-base font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-15">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore Our Courses</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover comprehensive React courses designed for all skill levels
            </p>
          </div>

          <div className="flex gap-6 max-w-4xl mx-auto flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-4 pl-12 pr-4 border-none rounded-xl bg-white/90 text-base outline-none transition-all focus:bg-white focus:ring-3 focus:ring-indigo-500/20"
              />
            </div>

            <div className="relative min-w-[200px]">
              <Filter size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 z-10" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full py-4 pl-12 pr-4 border-none rounded-xl bg-white/90 text-base outline-none cursor-pointer transition-all focus:bg-white focus:ring-3 focus:ring-indigo-500/20 appearance-none"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </section>

        <section className="py-15 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id || course.id} course={course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-20 text-white/80">
              <h3 className="text-2xl mb-2">No courses found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;

