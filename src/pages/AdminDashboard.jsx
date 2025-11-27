import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCourse } from '../contexts/CourseContext';
import { Users, BookOpen, GraduationCap, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { courses } = useCourse();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: Users, label: 'Total Users', value: '1,234', color: 'blue' },
    { icon: BookOpen, label: 'Total Courses', value: courses.length.toString(), color: 'green' },
    { icon: GraduationCap, label: 'Active Students', value: '856', color: 'purple' },
    { icon: TrendingUp, label: 'Completion Rate', value: '78%', color: 'orange' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Welcome, {user?.username}</p>
        </div>

        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`admin-tab ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            Courses
          </button>
          <button
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`admin-tab ${activeTab === 'instructors' ? 'active' : ''}`}
            onClick={() => setActiveTab('instructors')}
          >
            Instructors
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="admin-content">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className={`stat-card stat-${stat.color}`}>
                  <div className="stat-icon">
                    <stat.icon size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="admin-sections">
              <div className="admin-section">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">📚</div>
                    <div className="activity-content">
                      <p><strong>New course created:</strong> React Advanced Patterns</p>
                      <span className="activity-time">2 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">👤</div>
                    <div className="activity-content">
                      <p><strong>New user registered:</strong> john.doe@example.com</p>
                      <span className="activity-time">5 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">✅</div>
                    <div className="activity-content">
                      <p><strong>Course completed:</strong> Complete React Developer Course</p>
                      <span className="activity-time">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-section">
                <h2>Quick Actions</h2>
                <div className="quick-actions">
                  <button className="action-btn">
                    <Plus size={20} />
                    Create Course
                  </button>
                  <button className="action-btn">
                    <Users size={20} />
                    Add User
                  </button>
                  <button className="action-btn">
                    <GraduationCap size={20} />
                    Assign Instructor
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="admin-content">
            <div className="section-header">
              <h2>Manage Courses</h2>
              <button className="btn btn-primary">
                <Plus size={16} />
                Add New Course
              </button>
            </div>
            <div className="courses-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Instructor</th>
                    <th>Students</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id || course.id}>
                      <td>{course.title}</td>
                      <td>{course.instructor}</td>
                      <td>{course.students || 0}</td>
                      <td>{course.rating || 0}</td>
                      <td>
                        <span className="status-badge status-active">Active</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="icon-btn" title="Edit">
                            <Edit size={16} />
                          </button>
                          <button className="icon-btn icon-btn-danger" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-content">
            <div className="section-header">
              <h2>Manage Users</h2>
              <button className="btn btn-primary">
                <Plus size={16} />
                Add New User
              </button>
            </div>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>john_doe</td>
                    <td>john@example.com</td>
                    <td><span className="role-badge role-student">Student</span></td>
                    <td>2024-01-15</td>
                    <td><span className="status-badge status-active">Active</span></td>
                    <td>
                      <div className="action-buttons">
                        <button className="icon-btn" title="Edit">
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'instructors' && (
          <div className="admin-content">
            <div className="section-header">
              <h2>Manage Instructors</h2>
              <button className="btn btn-primary">
                <Plus size={16} />
                Add Instructor
              </button>
            </div>
            <div className="instructors-grid">
              <div className="instructor-card">
                <div className="instructor-avatar">SJ</div>
                <h3>Sarah Johnson</h3>
                <p>sarah@example.com</p>
                <div className="instructor-stats">
                  <div className="stat">
                    <span className="stat-value">5</span>
                    <span className="stat-label">Courses</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">1.2K</span>
                    <span className="stat-label">Students</span>
                  </div>
                </div>
                <button className="btn btn-secondary">View Details</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

