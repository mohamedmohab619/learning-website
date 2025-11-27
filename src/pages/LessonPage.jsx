import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle } from 'lucide-react';
import LessonPlayer from '../components/LessonPlayer';
import Quiz from '../components/Quiz';
import { useCourse } from '../contexts/CourseContext';

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const { fetchCourseById, currentCourse, updateProgress, submitQuiz } = useCourse();
  const [activeTab, setActiveTab] = useState('lesson');
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    fetchCourseById(courseId).then(() => {
      if (currentCourse?.lessons) {
        const foundLesson = currentCourse.lessons.find(
          (l) => (l._id || l.id) === lessonId
        );
        setLesson(foundLesson);
      }
    });
  }, [courseId, lessonId]);

  const handleProgressUpdate = async (currentTime, duration) => {
    if (duration && currentTime / duration > 0.9) {
      await updateProgress(courseId, lessonId, true);
    }
  };

  const handleQuizComplete = async (score, total) => {
    const answers = {}; // This should be passed from Quiz component
    await submitQuiz(courseId, lessonId, answers);
  };

  if (!lesson) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  const currentIndex = currentCourse?.lessons?.findIndex(
    (l) => (l._id || l.id) === lessonId
  ) || 0;
  const previousLesson =
    currentIndex > 0 ? currentCourse.lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < currentCourse.lessons.length - 1
      ? currentCourse.lessons[currentIndex + 1]
      : null;

  return (
    <div className="lesson-page">
      <div className="container">
        <div className="lesson-header">
          <div className="breadcrumb">
            <Link to={`/course/${courseId}`} className="breadcrumb-link">
              <ArrowLeft size={16} />
              Back to Course
            </Link>
          </div>

          <div className="lesson-title-section">
            <div className="lesson-badge">{lesson.level || 'Beginner'}</div>
            <h1 className="lesson-title">{lesson.title}</h1>
            <p className="lesson-description">{lesson.description}</p>

            <div className="lesson-meta">
              <div className="meta-item">
                <Clock size={16} />
                <span>{lesson.duration}</span>
              </div>
              <div className="meta-item">
                <BookOpen size={16} />
                <span>{lesson.type === 'video' ? 'Video Lesson' : 'Interactive Quiz'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lesson-content">
          <div className="main-content">
            {lesson.type === 'video' && (
              <div className="lesson-player-section">
                <LessonPlayer lesson={lesson} onProgressUpdate={handleProgressUpdate} />
              </div>
            )}

            <div className="lesson-tabs">
              <button
                className={`tab-btn ${activeTab === 'lesson' ? 'active' : ''}`}
                onClick={() => setActiveTab('lesson')}
              >
                Lesson Content
              </button>
              {lesson.resources && lesson.resources.length > 0 && (
                <button
                  className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
                  onClick={() => setActiveTab('resources')}
                >
                  Resources
                </button>
              )}
              {lesson.quiz && (
                <button
                  className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
                  onClick={() => setActiveTab('quiz')}
                >
                  Quiz
                </button>
              )}
            </div>

            <div className="tab-content">
              {activeTab === 'lesson' && (
                <div className="lesson-content-section">
                  <div
                    className="lesson-text"
                    dangerouslySetInnerHTML={{ __html: lesson.content || '' }}
                  />
                </div>
              )}

              {activeTab === 'resources' && lesson.resources && (
                <div className="resources-section">
                  <h3>Additional Resources</h3>
                  <div className="resources-list">
                    {lesson.resources.map((resource, index) => (
                      <div key={index} className="resource-item">
                        <div className="resource-icon">
                          {resource.type === 'documentation' && '📚'}
                          {resource.type === 'pdf' && '📄'}
                          {resource.type === 'code' && '💻'}
                        </div>
                        <div className="resource-content">
                          <h4>{resource.title}</h4>
                          <p>External {resource.type}</p>
                        </div>
                        <a
                          href={resource.url}
                          className="resource-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'quiz' && lesson.quiz && (
                <div className="quiz-section">
                  <Quiz questions={lesson.quiz.questions} onComplete={handleQuizComplete} />
                </div>
              )}
            </div>

            <div className="lesson-navigation">
              <div className="nav-section">
                {previousLesson ? (
                  <Link
                    to={`/lesson/${courseId}/${previousLesson._id || previousLesson.id}`}
                    className="nav-btn nav-btn--previous"
                  >
                    <ArrowLeft size={16} />
                    <div className="nav-content">
                      <span className="nav-label">Previous</span>
                      <span className="nav-title">{previousLesson.title}</span>
                    </div>
                  </Link>
                ) : (
                  <div className="nav-btn nav-btn--disabled">
                    <ArrowLeft size={16} />
                    <div className="nav-content">
                      <span className="nav-label">Previous</span>
                      <span className="nav-title">No previous lesson</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="nav-section">
                {nextLesson ? (
                  <Link
                    to={`/lesson/${courseId}/${nextLesson._id || nextLesson.id}`}
                    className="nav-btn nav-btn--next"
                  >
                    <div className="nav-content">
                      <span className="nav-label">Next</span>
                      <span className="nav-title">{nextLesson.title}</span>
                    </div>
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <div className="nav-btn nav-btn--disabled">
                    <div className="nav-content">
                      <span className="nav-label">Next</span>
                      <span className="nav-title">Course Complete!</span>
                    </div>
                    <CheckCircle size={16} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lesson-sidebar">
            <div className="sidebar-section">
              <h3>Course Progress</h3>
              <div className="progress-overview">
                <div className="progress-stats">
                  <span>
                    {currentIndex + 1} of {currentCourse?.lessons?.length || 0} lessons
                  </span>
                  <span>
                    {Math.round(((currentIndex + 1) / (currentCourse?.lessons?.length || 1)) * 100)}%
                    Complete
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${((currentIndex + 1) / (currentCourse?.lessons?.length || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Course Lessons</h3>
              <div className="lessons-list">
                {currentCourse?.lessons?.map((courseLesson, index) => (
                  <Link
                    key={courseLesson._id || courseLesson.id}
                    to={`/lesson/${courseId}/${courseLesson._id || courseLesson.id}`}
                    className={`lesson-item ${
                      (courseLesson._id || courseLesson.id) === lessonId ? 'current' : ''
                    }`}
                  >
                    <div className="lesson-number">
                      {courseLesson.completed ? (
                        <CheckCircle size={16} />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="lesson-info">
                      <span className="lesson-title">{courseLesson.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;

