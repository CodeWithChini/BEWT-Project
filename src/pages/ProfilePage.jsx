import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: 'Hill Kalola',
    email: 'hillk@gmail.com',
    role: 'Meeting Organizer',
    department: 'Project Management',
    employeeId: 'EMP-00123',
    phone: '+91 9328909065',
    joinDate: '2025-01-15',
    location: 'india Office',
    bio: 'Senior Project Manager with 5+ years of experience in managing cross-functional teams and client meetings.'
  });

  const [meetingStats, setMeetingStats] = useState({
    totalMeetingsAttended: 45,
    meetingsOrganized: 12,
    attendanceRate: '92%',
    upcomingMeetings: 3,
    actionItemsAssigned: 8,
    completedActions: 32
  });

  const [recentMeetings, setRecentMeetings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...userData });

  useEffect(() => {
    // Dummy data for recent meetings attended
    const dummyMeetings = [
      { id: 1, title: 'Weekly Team Sync', date: '2024-01-15', role: 'Organizer', status: 'attended' },
      { id: 2, title: 'Client Presentation', date: '2024-01-16', role: 'Presenter', status: 'attended' },
      { id: 3, title: 'Project Review', date: '2024-01-14', role: 'Participant', status: 'attended' },
      { id: 4, title: 'Sprint Planning', date: '2024-01-17', role: 'Facilitator', status: 'scheduled' },
      { id: 5, title: 'Budget Meeting', date: '2024-01-13', role: 'Participant', status: 'attended' },
    ];
    setRecentMeetings(dummyMeetings);
  }, []);

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUserData(editForm);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditForm(userData);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <h1 className="page-title">My Profile</h1>

      <div className="grid grid-3">
        {/* Profile Card */}
        <div className="card profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {userData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="profile-info">
              <h2>{userData.name}</h2>
              <p className="profile-role">{userData.role}</p>
              <p className="profile-email">{userData.email}</p>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={editForm.department}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={handleEditChange}
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">Employee ID</span>
                  <span className="detail-value">{userData.employeeId}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Department</span>
                  <span className="detail-value">{userData.department}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{userData.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{userData.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Joined On</span>
                  <span className="detail-value">{userData.joinDate}</span>
                </div>
              </div>

              <div className="profile-bio">
                <h4>About</h4>
                <p>{userData.bio}</p>
              </div>

              <div className="profile-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
                <button className="btn btn-secondary">
                  Change Password
                </button>
              </div>
            </>
          )}
        </div>

        {/* Meeting Statistics */}
        <div className="card meeting-stats-card">
          <h3>Meeting Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h4>{meetingStats.totalMeetingsAttended}</h4>
                <p>Meetings Attended</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <h4>{meetingStats.meetingsOrganized}</h4>
                <p>Meetings Organized</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h4>{meetingStats.attendanceRate}</h4>
                <p>Attendance Rate</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <h4>{meetingStats.upcomingMeetings}</h4>
                <p>Upcoming Meetings</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">📝</div>
              <div className="stat-content">
                <h4>{meetingStats.actionItemsAssigned}</h4>
                <p>Active Action Items</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">✔️</div>
              <div className="stat-content">
                <h4>{meetingStats.completedActions}</h4>
                <p>Completed Actions</p>
              </div>
            </div>
          </div>

          <div className="performance-chart">
            <h4>Monthly Attendance Trend</h4>
            <div className="chart-bars">
              <div className="chart-bar" style={{ height: '80%' }}><span>Jan</span></div>
              <div className="chart-bar" style={{ height: '85%' }}><span>Feb</span></div>
              <div className="chart-bar" style={{ height: '90%' }}><span>Mar</span></div>
              <div className="chart-bar" style={{ height: '78%' }}><span>Apr</span></div>
              <div className="chart-bar" style={{ height: '92%' }}><span>May</span></div>
              <div className="chart-bar" style={{ height: '88%' }}><span>Jun</span></div>
            </div>
          </div>
        </div>

        {/* Recent Meetings */}
        <div className="card recent-meetings-card">
          <div className="card-header">
            <h3>Recent Meetings</h3>
            <button className="btn btn-secondary btn-sm">View All</button>
          </div>

          <div className="meetings-list">
            {recentMeetings.map(meeting => (
              <div key={meeting.id} className="meeting-item">
                <div className="meeting-info">
                  <h4>{meeting.title}</h4>
                  <p className="meeting-date">{meeting.date}</p>
                  <div className="meeting-meta">
                    <span className="meeting-role">{meeting.role}</span>
                    <span className={`status-badge status-${meeting.status}`}>
                      {meeting.status}
                    </span>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm">Details</button>
              </div>
            ))}
          </div>

          <div className="quick-stats">
            <h4>Meeting Distribution</h4>
            <div className="distribution-chart">
              <div className="distribution-item">
                <div className="distribution-label">
                  <span className="dot organizer"></span>
                  <span>Organizer</span>
                </div>
                <span className="distribution-value">25%</span>
              </div>
              <div className="distribution-item">
                <div className="distribution-label">
                  <span className="dot participant"></span>
                  <span>Participant</span>
                </div>
                <span className="distribution-value">60%</span>
              </div>
              <div className="distribution-item">
                <div className="distribution-label">
                  <span className="dot presenter"></span>
                  <span>Presenter</span>
                </div>
                <span className="distribution-value">15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
