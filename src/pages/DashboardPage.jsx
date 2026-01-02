import React, { useState, useEffect } from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalMeetings: 0,
    upcomingMeetings: 0,
    completedMeetings: 0,
    pendingActions: 0
  });

  const [recentMeetings, setRecentMeetings] = useState([]);
  const [pendingFollowups, setPendingFollowups] = useState([]);

  useEffect(() => {
    // Dummy data - will be replaced with API call
    setStats({
      totalMeetings: 24,
      upcomingMeetings: 5,
      completedMeetings: 18,
      pendingActions: 7
    });

    setRecentMeetings([
      { id: 1, title: 'Weekly Team Sync', date: '2024-01-15', time: '10:00 AM', type: 'Team', status: 'completed' },
      { id: 2, title: 'Client Presentation', date: '2024-01-16', time: '2:00 PM', type: 'Client', status: 'scheduled' },
      { id: 3, title: 'Project Review', date: '2024-01-14', time: '11:00 AM', type: 'Management', status: 'completed' },
      { id: 4, title: 'Sprint Planning', date: '2024-01-17', time: '9:00 AM', type: 'Team', status: 'scheduled' },
    ]);

    setPendingFollowups([
      { id: 1, task: 'Prepare project report', assignedTo: 'John Doe', dueDate: '2024-01-18', priority: 'high' },
      { id: 2, task: 'Send meeting minutes', assignedTo: 'Jane Smith', dueDate: '2024-01-19', priority: 'medium' },
      { id: 3, task: 'Schedule follow-up meeting', assignedTo: 'Bob Johnson', dueDate: '2024-01-20', priority: 'low' },
    ]);
  }, []);

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-4">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.totalMeetings}</h3>
            <p>Total Meetings</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{stats.upcomingMeetings}</h3>
            <p>Upcoming</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.completedMeetings}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <h3>{stats.pendingActions}</h3>
            <p>Pending Actions</p>
          </div>
        </div>
      </div>

      {/* Recent Meetings */}
      <div className="card">
        <div className="card-header">
          <h3>Recent Meetings</h3>
          <button className="btn btn-primary">View All</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date & Time</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentMeetings.map(meeting => (
              <tr key={meeting.id}>
                <td>{meeting.title}</td>
                <td>{meeting.date} at {meeting.time}</td>
                <td>{meeting.type}</td>
                <td>
                  <span className={`status-badge status-${meeting.status}`}>
                    {meeting.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-primary btn-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pending Follow-ups */}
      <div className="card">
        <div className="card-header">
          <h3>Pending Follow-ups</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Assigned To</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingFollowups.map(item => (
              <tr key={item.id}>
                <td>{item.task}</td>
                <td>{item.assignedTo}</td>
                <td>{item.dueDate}</td>
                <td>
                  <span className={`priority-badge priority-${item.priority}`}>
                    {item.priority}
                  </span>
                </td>
                <td>
                  <button className="btn btn-success btn-sm">Mark Complete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
