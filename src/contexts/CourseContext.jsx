import React, { createContext, useState, useContext, useEffect } from 'react';
import { courseAPI } from '../services/api';
import { mockCourses, mockAPI } from '../data/mockData';

const CourseContext = createContext(null);

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    fetchCourses();
    fetchUserProgress();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getAllCourses();
      setCourses(response.data);
      setError(null);
      setUseMockData(false);
    } catch (err) {
      console.warn('API unavailable, using mock data');
      setCourses(mockCourses);
      setUseMockData(true);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseById = async (id) => {
    try {
      setLoading(true);
      const response = await courseAPI.getCourseById(id);
      setCurrentCourse(response.data);
      setError(null);
      setUseMockData(false);
      return response.data;
    } catch (err) {
      console.warn('API unavailable, using mock data');
      const mockResult = mockAPI.getCourseById(id);
      if (mockResult.success) {
        setCurrentCourse(mockResult.data);
        setUseMockData(true);
        return mockResult.data;
      }
      setError('Failed to fetch course');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    try {
      const response = await courseAPI.getUserProgress();
      const progressMap = {};
      response.data.forEach((item) => {
        progressMap[item.courseId] = item.progress || item.percentage || 0;
      });
      setProgress(progressMap);
      setUseMockData(false);
    } catch (err) {
      console.warn('API unavailable for progress, using empty progress');
      setProgress({});
      setUseMockData(true);
    }
  };

  const updateProgress = async (courseId, lessonId, completed) => {
    try {
      await courseAPI.updateProgress(courseId, lessonId, completed);
      await fetchUserProgress();
      setUseMockData(false);
    } catch (err) {
      console.warn('API unavailable, progress not saved');
      setUseMockData(true);
    }
  };

  const enrollInCourse = async (courseId) => {
    try {
      setLoading(true);
      await courseAPI.enrollInCourse(courseId);
      await fetchCourses();
      setUseMockData(false);
      return { success: true };
    } catch (err) {
      console.warn('API unavailable, using mock enrollment');
      // Mock enrollment
      setUseMockData(true);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = async (courseId, lessonId, answers) => {
    try {
      setLoading(true);
      const response = await courseAPI.submitQuiz(courseId, lessonId, answers);
      await fetchUserProgress();
      setUseMockData(false);
      return { success: true, data: response.data };
    } catch (err) {
      console.warn('API unavailable, using mock quiz submission');
      setUseMockData(true);
      return { success: true, data: { score: 80, total: 100 } };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    courses,
    currentCourse,
    progress,
    loading,
    error,
    fetchCourses,
    fetchCourseById,
    updateProgress,
    enrollInCourse,
    submitQuiz,
    useMockData,
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};
