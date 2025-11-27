import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourse } from '../contexts/CourseContext';
import { Clock, Users, Star, BookOpen, CheckCircle } from 'lucide-react';
import ProgressTracker from '../components/ProgressTracker';

const CoursePage = () => {
  const { id } = useParams();
  const { fetchCourseById, enrollInCourse, currentCourse, loading } = useCourse();
  const [activeTab, setActiveTab] = useState('curriculum');
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchCourseById(id);
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    const result = await enrollInCourse(id);
    if (result.success) {
      alert('Successfully enrolled in course!');
    } else {
      alert(result.error || 'Enrollment failed');
    }
    setEnrolling(false);
  };

  if (loading || !currentCourse) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="course-page">
      <div className="container">
        <div className="course-hero">
          <div className="course-thumbnail-large">
            <img src={currentCourse.thumbnail} alt={currentCourse.title} />
          </div>
          <div className="course-info">
            <div className="course-badge">{currentCourse.level}</div>
            <h1 className="course-title">{currentCourse.title}</h1>
            <p className="course-description">{currentCourse.description}</p>
            <div className="course-meta">
              <div className="meta-item">
                <Clock size={16} />
                <span>{currentCourse.duration}</span>
              </div>
              <div className="meta-item">
                <Users size={16} />
                <span>{currentCourse.students} students</span>
              </div>
              <div className="meta-item">
                <Star size={16} fill="#fbbf24" color="#fbbf24" />
                <span>{currentCourse.rating}</span>
              </div>
            </div>
            <div className="course-actions">
              <button
                className="btn btn-primary btn-large"
                onClick={handleEnroll}
                disabled={enrolling}
              >
                {enrolling ? 'Enrolling...' : 'Enroll Now'}
              </button>
            </div>
          </div>
        </div>

        <div className="course-content">
          <div className="content-tabs">
            <button
              className={`tab-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum
            </button>
            <button
              className={`tab-btn ${activeTab === 'instructor' ? 'active' : ''}`}
              onClick={() => setActiveTab('instructor')}
            >
              Instructor
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'curriculum' && (
              <div className="curriculum-section">
                <h3>Course Lessons</h3>
                <div className="lessons-list">
                  {currentCourse.lessons?.map((lesson, index) => (
                    <Link
                      key={lesson._id || lesson.id}
                      to={`/lesson/${id}/${lesson._id || lesson.id}`}
                      className="lesson-item"
                    >
                      <div className="lesson-number">{index + 1}</div>
                      <div className="lesson-content">
                        <h4 className="lesson-title">{lesson.title}</h4>
                        <p className="lesson-description">{lesson.description}</p>
                        <div className="lesson-meta">
                          <span className="lesson-duration">
                            <Clock size={14} />
                            {lesson.duration}
                          </span>
                          <span className="lesson-type">{lesson.type}</span>
                        </div>
                      </div>
                      <CheckCircle size={20} className="lesson-check" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'instructor' && (
              <div className="instructor-section">
                <div className="instructor-card">
                  <div className="instructor-avatar">
                    <BookOpen size={40} />
                  </div>
                  <div className="instructor-info">
                    <h3>{currentCourse.instructor}</h3>
                    <p className="instructor-bio">
                      Experienced instructor with years of teaching experience in web development.
                    </p>
                    <div className="instructor-stats">
                      <div className="stat">
                        <span className="stat-value">10+</span>
                        <span className="stat-label">Courses</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">50K+</span>
                        <span className="stat-label">Students</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">4.9</span>
                        <span className="stat-label">Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;

