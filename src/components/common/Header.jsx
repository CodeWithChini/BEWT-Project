import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>MOM Management</h1>
          <p className="tagline">Alone we can do so little; together we can do so much.</p>
        </div>
        <div className="user-info">
          <div className="user-details">
            <span className="user-name">Hill Kalola</span>
            <span className="user-role">Meeting Organizer</span>
          </div>
          <Link to="/profile" className="user-avatar">
            HK
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
