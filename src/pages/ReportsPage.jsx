import React, { useState, useEffect } from 'react';
import './ReportsPage.css';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [selectedReport, setSelectedReport] = useState('summary');
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-01-31'
  });

  useEffect(() => {
    // Dummy analytics data
    setAnalytics({
      totalMeetings: 24,
      totalParticipants: 156,
      averageAttendance: 78,
      completionRate: '85%',
      popularMeetingType: 'Team Meetings',
      peakDay: 'Wednesday'
    });

    // Dummy report data
    const dummyReports = [
      { id: 1, title: 'Monthly Meeting Summary', type: 'summary', generatedOn: '2024-01-15', downloadCount: 12 },
      { id: 2, title: 'Attendance Report Jan 2024', type: 'attendance', generatedOn: '2024-01-10', downloadCount: 8 },
      { id: 3, title: 'Meeting Effectiveness Report', type: 'analysis', generatedOn: '2024-01-05', downloadCount: 5 },
      { id: 4, title: 'Q4 2023 Meeting Review', type: 'summary', generatedOn: '2024-01-02', downloadCount: 15 },
    ];
    setReports(dummyReports);
  }, []);

  const handleDateChange = (e) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    });
  };

  const handleGenerateReport = () => {
    alert(`Report generated for ${dateRange.start} to ${dateRange.end}`);
  };

  return (
    <div className="reports-page">
      <h1 className="page-title">Reports & Analytics</h1>

      {/* Analytics Cards */}
      <div className="grid grid-3">
        {Object.entries(analytics).map(([key, value]) => (
          <div key={key} className="analytics-card">
            <div className="analytics-label">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </div>
            <div className="analytics-value">{value}</div>
          </div>
        ))}
      </div>

      {/* Report Generator */}
      <div className="card report-generator">
        <h3>Generate Report</h3>
        <div className="grid grid-2">
          <div className="form-group">
            <label>Report Type</label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
            >
              <option value="summary">Meeting Summary</option>
              <option value="attendance">Attendance Report</option>
              <option value="detailed">Detailed Report</option>
              <option value="analysis">Analysis Report</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date Range</label>
            <div className="date-range">
              <input
                type="date"
                name="start"
                value={dateRange.start}
                onChange={handleDateChange}
              />
              <span>to</span>
              <input
                type="date"
                name="end"
                value={dateRange.end}
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Format</label>
          <div className="format-options">
            <label className="format-option">
              <input type="radio" name="format" value="pdf" defaultChecked />
              <span>PDF</span>
            </label>
            <label className="format-option">
              <input type="radio" name="format" value="excel" />
              <span>Excel</span>
            </label>
            <label className="format-option">
              <input type="radio" name="format" value="csv" />
              <span>CSV</span>
            </label>
          </div>
        </div>

        <div className="report-actions">
          <button className="btn btn-primary" onClick={handleGenerateReport}>
            Generate Report
          </button>
          <button className="btn btn-secondary">
            Preview Report
          </button>
        </div>
      </div>

      {/* Previous Reports */}
      <div className="card">
        <h3>Previous Reports</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Report Title</th>
              <th>Type</th>
              <th>Generated On</th>
              <th>Downloads</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td>{report.title}</td>
                <td>
                  <span className="report-type">{report.type}</span>
                </td>
                <td>{report.generatedOn}</td>
                <td>{report.downloadCount}</td>
                <td>
                  <div className="report-actions">
                    <button className="btn btn-primary btn-sm">Download</button>
                    <button className="btn btn-secondary btn-sm">View</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart Placeholder */}
      <div className="card">
        <h3>Meeting Trends</h3>
        <div className="chart-placeholder">
          <p>📈 Meeting statistics chart will be displayed here</p>
          <div className="chart-bars">
            <div className="chart-bar" style={{ height: '80%' }}><span>Jan</span></div>
            <div className="chart-bar" style={{ height: '60%' }}><span>Feb</span></div>
            <div className="chart-bar" style={{ height: '90%' }}><span>Mar</span></div>
            <div className="chart-bar" style={{ height: '70%' }}><span>Apr</span></div>
            <div className="chart-bar" style={{ height: '85%' }}><span>May</span></div>
            <div className="chart-bar" style={{ height: '75%' }}><span>Jun</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
