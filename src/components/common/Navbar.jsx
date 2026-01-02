import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/meetings', label: 'Meetings', icon: '📅' },
    { path: '/attendance', label: 'Attendance', icon: '✅' },
    { path: '/reports', label: 'Reports', icon: '📈' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
