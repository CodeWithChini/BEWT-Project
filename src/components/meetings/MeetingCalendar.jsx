import React, { useState } from 'react';
import './MeetingCalendar.css';

const MeetingCalendar = ({ meetings }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getMeetingsForDate = (date) => {
    const dateStr = formatDate(date);
    return meetings.filter(meeting => meeting.date === dateStr);
  };

  const days = getDaysInMonth(currentDate);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar card">
      <div className="calendar-header">
        <h3>Meeting Calendar</h3>
        <div className="calendar-nav">
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          >
            Previous
          </button>
          <span className="current-month">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          >
            Next
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {dayNames.map(day => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          const dayMeetings = getMeetingsForDate(day);
          const isToday = formatDate(day) === formatDate(new Date());

          return (
            <div
              key={index}
              className={`calendar-day ${isToday ? 'today' : ''}`}
            >
              <div className="day-number">{day.getDate()}</div>
              <div className="day-meetings">
                {dayMeetings.slice(0, 2).map((meeting, idx) => (
                  <div
                    key={idx}
                    className={`meeting-dot ${meeting.status}`}
                    title={`${meeting.title} (${meeting.time})`}
                  />
                ))}
                {dayMeetings.length > 2 && (
                  <div className="more-meetings">+{dayMeetings.length - 2}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-dot scheduled"></div>
          <span>Scheduled</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot completed"></div>
          <span>Completed</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot cancelled"></div>
          <span>Cancelled</span>
        </div>
      </div>
    </div>
  );
};

export default MeetingCalendar;
