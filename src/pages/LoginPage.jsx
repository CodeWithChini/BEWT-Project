import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'staff'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // In real app, this would connect to backend
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your MOM Management account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="organizer">Meeting Organizer</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary login-btn">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>Demo Credentials:</p>
          <p>Email: admin@example.com | Password: admin123</p>
          <p>Role-based access available</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
