// Mock data for development and fallback when API is unavailable

export const mockCourses = [
  {
    _id: '1',
    id: '1',
    title: 'Complete React Developer Course',
    description: 'Master React from basics to advanced concepts including hooks, context, and performance optimization.',
    instructor: 'Sarah Johnson',
    instructorId: 'instructor1',
    duration: '12 hours',
    students: 15420,
    rating: 4.8,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
    progress: 0,
    lessonsCount: 24,
    price: 0,
    category: 'Web Development',
    lessons: [
      {
        _id: 'lesson1',
        id: 'lesson1',
        title: 'Introduction to React',
        description: 'Learn the fundamentals of React and why it\'s popular',
        duration: '15 min',
        type: 'video',
        level: 'Beginner',
        order: 1,
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        content: '<h2>What is React?</h2><p>React is a JavaScript library for building user interfaces.</p>',
        completed: false,
      },
      {
        _id: 'lesson2',
        id: 'lesson2',
        title: 'Setting up Development Environment',
        description: 'Set up your development environment for React development',
        duration: '20 min',
        type: 'video',
        level: 'Beginner',
        order: 2,
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        content: '<h2>Setting Up</h2><p>Install Node.js and create your first React app.</p>',
        completed: false,
      },
      {
        _id: 'lesson3',
        id: 'lesson3',
        title: 'JSX and Components',
        description: 'Understanding JSX syntax and creating your first components',
        duration: '25 min',
        type: 'video',
        level: 'Beginner',
        order: 3,
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        content: '<h2>JSX Basics</h2><p>Learn how to write JSX and create components.</p>',
        quiz: {
          questions: [
            {
              question: 'What does JSX stand for?',
              options: ['JavaScript XML', 'JavaScript Extension', 'JavaScript Syntax', 'JavaScript Expression'],
              correctAnswer: 0,
            },
            {
              question: 'Which of the following is correct JSX syntax?',
              options: ["<div className='container'>", "<div class='container'>", "<div className=\"container\">", 'Both A and C'],
              correctAnswer: 3,
            },
          ],
        },
        completed: false,
      },
    ],
  },
  {
    _id: '2',
    id: '2',
    title: 'Advanced JavaScript Patterns',
    description: 'Deep dive into modern JavaScript patterns, async programming, and advanced concepts.',
    instructor: 'Mike Chen',
    instructorId: 'instructor2',
    duration: '8 hours',
    students: 8930,
    rating: 4.9,
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=200&fit=crop',
    progress: 0,
    lessonsCount: 16,
    price: 49.99,
    category: 'JavaScript',
  },
  {
    _id: '3',
    id: '3',
    title: 'React Native Mobile Development',
    description: 'Build cross-platform mobile apps with React Native and modern development practices.',
    instructor: 'Emily Rodriguez',
    instructorId: 'instructor3',
    duration: '15 hours',
    students: 12350,
    rating: 4.7,
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop',
    progress: 0,
    lessonsCount: 28,
    price: 79.99,
    category: 'Mobile Development',
  },
];

export const mockUsers = {
  student: {
    _id: 'student1',
    id: 'student1',
    username: 'student',
    email: 'student@example.com',
    role: 'student',
    enrolledCourses: [],
  },
  instructor: {
    _id: 'instructor1',
    id: 'instructor1',
    username: 'instructor',
    email: 'instructor@example.com',
    role: 'instructor',
    courses: ['1'],
  },
  admin: {
    _id: 'admin1',
    id: 'admin1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
  },
};

export const mockProgress = [
  {
    courseId: '1',
    lessonId: 'lesson1',
    completed: true,
    progress: 100,
  },
  {
    courseId: '1',
    lessonId: 'lesson2',
    completed: true,
    progress: 100,
  },
  {
    courseId: '1',
    lessonId: 'lesson3',
    completed: false,
    progress: 0,
  },
];

// Mock API responses
export const mockAPI = {
  login: (username, password) => {
    // Mock login - for testing
    if (username === 'admin' && password === 'admin123') {
      return {
        success: true,
        data: {
          token: 'mock-admin-token',
          user: mockUsers.admin,
        },
      };
    }
    if (username === 'instructor' && password === 'instructor123') {
      return {
        success: true,
        data: {
          token: 'mock-instructor-token',
          user: mockUsers.instructor,
        },
      };
    }
    if (username === 'student' && password === 'student123') {
      return {
        success: true,
        data: {
          token: 'mock-student-token',
          user: mockUsers.student,
        },
      };
    }
    return {
      success: false,
      error: 'Invalid credentials',
    };
  },
  getCourses: () => ({
    success: true,
    data: mockCourses,
  }),
  getCourseById: (id) => {
    const course = mockCourses.find((c) => c._id === id || c.id === id);
    return {
      success: !!course,
      data: course,
    };
  },
};

