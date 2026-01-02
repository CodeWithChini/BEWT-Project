import React, { useState, useEffect } from 'react';
import MeetingForm from '../components/meetings/MeetingForm';
import MeetingList from '../components/meetings/MeetingList';
import MeetingCalendar from '../components/meetings/MeetingCalendar';
import './MeetingsPage.css';

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [editingMeeting, setEditingMeeting] = useState(null);

  useEffect(() => {
    // Dummy data
    const dummyMeetings = [
      {
        id: 1,
        title: 'Weekly Team Sync',
        type: 'Team',
        date: '2024-01-15',
        time: '10:00',
        duration: '60',
        venue: 'Conference Room A',
        organizer: 'Hill Kalola',
        description: 'Weekly team synchronization meeting',
        status: 'completed',
        participants: 12
      },
      {
        id: 2,
        title: 'Client Presentation',
        type: 'Client',
        date: '2024-01-16',
        time: '14:00',
        duration: '90',
        venue: 'Client Meeting Room',
        organizer: 'Yash Patel',
        description: 'Quarterly review presentation',
        status: 'scheduled',
        participants: 8
      },
      {
        id: 3,
        title: 'Project Review',
        type: 'Management',
        date: '2024-01-14',
        time: '11:00',
        duration: '120',
        venue: 'Board Room',
        organizer: 'Rahil',
        description: 'Monthly project review with management',
        status: 'completed',
        participants: 15
      },
    ];
    setMeetings(dummyMeetings);
  }, []);

  const handleAddMeeting = (newMeeting) => {
    const meetingWithId = {
      ...newMeeting,
      id: meetings.length + 1,
      status: 'scheduled'
    };
    setMeetings([...meetings, meetingWithId]);
    setShowForm(false);
    setEditingMeeting(null);
  };

  const handleEditMeeting = (updatedMeeting) => {
    setMeetings(meetings.map(m =>
      m.id === updatedMeeting.id ? updatedMeeting : m
    ));
    setShowForm(false);
    setEditingMeeting(null);
  };

  const handleDeleteMeeting = (id) => {
    if (window.confirm('Are you sure you want to delete this meeting?')) {
      setMeetings(meetings.filter(m => m.id !== id));
    }
  };

  const handleCancelMeeting = (id) => {
    setMeetings(meetings.map(m =>
      m.id === id ? { ...m, status: 'cancelled' } : m
    ));
  };

  return (
    <div className="meetings-page">
      <div className="page-header">
        <h1>Meetings Management</h1>
        <div className="header-actions">
          <div className="view-toggle">
            <button
              className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
            <button
              className={`btn ${viewMode === 'calendar' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('calendar')}
            >
              Calendar View
            </button>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingMeeting(null);
              setShowForm(true);
            }}
          >
            + Schedule Meeting
          </button>
        </div>
      </div>

      {showForm ? (
        <MeetingForm
          meeting={editingMeeting}
          onSubmit={editingMeeting ? handleEditMeeting : handleAddMeeting}
          onCancel={() => {
            setShowForm(false);
            setEditingMeeting(null);
          }}
        />
      ) : (
        <>
          {viewMode === 'list' ? (
            <MeetingList
              meetings={meetings}
              onEdit={(meeting) => {
                setEditingMeeting(meeting);
                setShowForm(true);
              }}
              onDelete={handleDeleteMeeting}
              onCancel={handleCancelMeeting}
            />
          ) : (
            <MeetingCalendar meetings={meetings} />
          )}
        </>
      )}
    </div>
  );
};

export default MeetingsPage;
