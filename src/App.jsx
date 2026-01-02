import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MeetingsPage from './pages/MeetingsPage';
import AttendancePage from './pages/AttendancePage';
import ReportsPage from './pages/ReportsPage';
import ProfilePage from './pages/ProfilePage'; // Add this import
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import './App.css';

function App() {
  const isAuthenticated = true; // For development, set to true

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Header />}
        <div className="main-container">
          {isAuthenticated && <Navbar />}
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/meetings" element={<MeetingsPage />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/profile" element={<ProfilePage />} /> {/* Add this route */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
