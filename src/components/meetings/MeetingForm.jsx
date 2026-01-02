import React, { useState, useEffect } from 'react';
import './MeetingForm.css';

const MeetingForm = ({ meeting, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'team',
    date: '',
    time: '',
    duration: '60',
    venue: '',
    organizer: '',
    description: '',
    participants: []
  });

  const [participantEmail, setParticipantEmail] = useState('');

  useEffect(() => {
    if (meeting) {
      setFormData(meeting);
    } else {
      // Set default values for new meeting
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        ...formData,
        date: today,
        time: '09:00',
        organizer: 'John Doe' // In real app, get from auth
      });
    }
  }, [meeting]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddParticipant = () => {
    if (participantEmail && !formData.participants.includes(participantEmail)) {
      setFormData({
        ...formData,
        participants: [...formData.participants, participantEmail]
      });
      setParticipantEmail('');
    }
  };

  const handleRemoveParticipant = (email) => {
    setFormData({
      ...formData,
      participants: formData.participants.filter(p => p !== email)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="meeting-form card">
      <h2>{meeting ? 'Edit Meeting' : 'Schedule New Meeting'}</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <div className="form-group">
            <label>Meeting Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter meeting title"
              required
            />
          </div>

          <div className="form-group">
            <label>Meeting Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="team">Team Meeting</option>
              <option value="client">Client Meeting</option>
              <option value="management">Management Meeting</option>
              <option value="project">Project Review</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Time *</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-2">
          <div className="form-group">
            <label>Duration (minutes)</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            >
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
              <option value="180">3 hours</option>
            </select>
          </div>

          <div className="form-group">
            <label>Venue *</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Enter meeting venue"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Organizer</label>
          <input
            type="text"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            placeholder="Enter organizer name"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter meeting description"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Add Participants</label>
          <div className="participant-input">
            <input
              type="email"
              value={participantEmail}
              onChange={(e) => setParticipantEmail(e.target.value)}
              placeholder="Enter participant email"
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddParticipant}
            >
              Add
            </button>
          </div>

          {formData.participants.length > 0 && (
            <div className="participant-list">
              <h4>Participants ({formData.participants.length})</h4>
              <div className="participant-tags">
                {formData.participants.map((email, index) => (
                  <div key={index} className="participant-tag">
                    {email}
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemoveParticipant(email)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {meeting ? 'Update Meeting' : 'Schedule Meeting'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeetingForm;
