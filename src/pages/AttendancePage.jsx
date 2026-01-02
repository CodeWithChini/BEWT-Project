import React, { useState, useEffect } from 'react';
import './AttendancePage.css';

const AttendancePage = () => {
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // Dummy data
    const dummyMeetings = [
      { id: 1, title: 'Weekly Team Sync', date: '2024-01-15', participants: 12 },
      { id: 2, title: 'Client Presentation', date: '2024-01-16', participants: 8 },
      { id: 3, title: 'Project Review', date: '2024-01-14', participants: 15 },
    ];
    setMeetings(dummyMeetings);
  }, []);

  useEffect(() => {
    if (selectedMeeting) {
      // Dummy attendance data
      const dummyAttendance = [
        { id: 1, name: 'Hill Kalola', email: 'hillk@gmail.com', status: 'present', joinedAt: '09:55 AM' },
        { id: 2, name: 'Yash Patel', email: 'yashpatel01@yahoo.com', status: 'absent', joinedAt: '-' },
        { id: 3, name: 'Rahil', email: 'rahil@gmail.com', status: 'present', joinedAt: '10:00 AM' },
        { id: 4, name: 'Ansh Bhalodiya', email: 'anshb78@gmail.com', status: 'late', joinedAt: '10:15 AM' },
      ];
      setAttendance(dummyAttendance);
    }
  }, [selectedMeeting]);

  const handleStatusChange = (id, status) => {
    setAttendance(attendance.map(a =>
      a.id === id ? { ...a, status } : a
    ));
  };

  const getAttendanceStats = () => {
    const total = attendance.length;
    const present = attendance.filter(a => a.status === 'present' || a.status === 'late').length;
    const absent = attendance.filter(a => a.status === 'absent').length;
    return { total, present, absent };
  };

  const stats = getAttendanceStats();

  return (
    <div className="attendance-page">
      <h1 className="page-title">Attendance Management</h1>

      <div className="grid grid-2">
        {/* Meetings List */}
        <div className="card">
          <h3>Select Meeting</h3>
          <div className="meetings-select">
            {meetings.map(meeting => (
              <div
                key={meeting.id}
                className={`meeting-item ${selectedMeeting?.id === meeting.id ? 'selected' : ''}`}
                onClick={() => setSelectedMeeting(meeting)}
              >
                <div className="meeting-title">{meeting.title}</div>
                <div className="meeting-date">{meeting.date}</div>
                <div className="meeting-participants">{meeting.participants} participants</div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Details */}
        {selectedMeeting ? (
          <div className="card">
            <div className="card-header">
              <h3>Attendance for: {selectedMeeting.title}</h3>
              <div className="attendance-stats">
                <div className="stat">
                  <span className="stat-value">{stats.present}</span>
                  <span className="stat-label">Present</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{stats.absent}</span>
                  <span className="stat-label">Absent</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{stats.total}</span>
                  <span className="stat-label">Total</span>
                </div>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Joined At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map(person => (
                  <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>{person.email}</td>
                    <td>
                      <span className={`status-badge status-${person.status}`}>
                        {person.status}
                      </span>
                    </td>
                    <td>{person.joinedAt}</td>
                    <td>
                      <div className="status-actions">
                        <button
                          className={`btn btn-sm ${person.status === 'present' ? 'btn-success' : 'btn-secondary'}`}
                          onClick={() => handleStatusChange(person.id, 'present')}
                        >
                          Present
                        </button>
                        <button
                          className={`btn btn-sm ${person.status === 'absent' ? 'btn-danger' : 'btn-secondary'}`}
                          onClick={() => handleStatusChange(person.id, 'absent')}
                        >
                          Absent
                        </button>
                        <button
                          className={`btn btn-sm ${person.status === 'late' ? 'btn-warning' : 'btn-secondary'}`}
                          onClick={() => handleStatusChange(person.id, 'late')}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="attendance-actions">
              <button className="btn btn-primary">Save Attendance</button>
              <button className="btn btn-secondary">Export to Excel</button>
              <button className="btn btn-secondary">Print Report</button>
            </div>
          </div>
        ) : (
          <div className="card empty-state">
            <h3>Select a meeting to view attendance</h3>
            <p>Choose a meeting from the list to mark and view attendance.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
