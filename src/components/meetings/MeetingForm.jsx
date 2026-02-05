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
    <div className="meeting-form card fade-in">
      <h2>
        <i className="fas fa-calendar-plus"></i>
        {meeting ? ' Edit Meeting' : ' Schedule New Meeting'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <div className="form-group">
            <label>
              <i className="fas fa-heading"></i> Meeting Title *
            </label>
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
            <label>
              <i className="fas fa-tag"></i> Meeting Type *
            </label>
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
            <label>
              <i className="fas fa-calendar-day"></i> Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-clock"></i> Time *
            </label>
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
            <label>
              <i className="fas fa-hourglass-half"></i> Duration
            </label>
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
            <label>
              <i className="fas fa-map-marker-alt"></i> Venue *
            </label>
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
          <label>
            <i className="fas fa-user-tie"></i> Organizer
          </label>
          <input
            type="text"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            placeholder="Enter organizer name"
          />
        </div>

        <div className="form-group">
          <label>
            <i className="fas fa-file-alt"></i> Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter meeting description, agenda, or objectives"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>
            <i className="fas fa-users"></i> Add Participants
          </label>
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
              <i className="fas fa-plus"></i> Add
            </button>
          </div>

          {formData.participants.length > 0 && (
            <div className="participant-list">
              <h4>
                <i className="fas fa-user-friends"></i>
                Participants ({formData.participants.length})
              </h4>
              <div className="participant-tags">
                {formData.participants.map((email, index) => (
                  <div key={index} className="participant-tag">
                    <i className="fas fa-user-circle"></i> {email}
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemoveParticipant(email)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            <i className="fas fa-times"></i> Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-check"></i>
            {meeting ? ' Update Meeting' : ' Schedule Meeting'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeetingForm;
