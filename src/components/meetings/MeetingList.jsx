import React from 'react';
import './MeetingList.css';

const MeetingList = ({ meetings, onEdit, onDelete, onCancel }) => {
  const handleStatusChange = (id, newStatus) => {
    if (newStatus === 'cancelled') {
      onCancel(id);
    }
  };

  return (
    <div className="meeting-list card">
      <div className="card-header">
        <h3>All Meetings</h3>
        <div className="filters">
          <select className="filter-select">
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="text"
            placeholder="Search meetings..."
            className="search-input"
          />
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Date & Time</th>
            <th>Venue</th>
            <th>Organizer</th>
            <th>Participants</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map(meeting => (
            <tr key={meeting.id}>
              <td>{meeting.title}</td>
              <td>{meeting.type}</td>
              <td>{meeting.date} at {meeting.time}</td>
              <td>{meeting.venue}</td>
              <td>{meeting.organizer}</td>
              <td>{meeting.participants || 0}</td>
              <td>
                <span className={`status-badge status-${meeting.status}`}>
                  {meeting.status}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onEdit(meeting)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(meeting.id)}
                  >
                    Delete
                  </button>
                  {meeting.status === 'scheduled' && (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleStatusChange(meeting.id, 'cancelled')}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingList;
