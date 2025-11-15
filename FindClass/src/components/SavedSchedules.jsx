import React, { useState } from 'react';
import CalendarView from './CalendarView';
import './SavedSchedules.css';

const SavedSchedules = ({ savedSchedules, onLoadSchedule, onDeleteSchedule, currentCourses, onSaveCurrentSchedule }) => {
  const [scheduleName, setScheduleName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleSaveSchedule = () => {
    if (!scheduleName.trim()) {
      alert('Please enter a schedule name');
      return;
    }

    onSaveCurrentSchedule(scheduleName);
    setScheduleName('');
    setShowSaveDialog(false);
  };

  return (
    <div className="saved-schedules">
      <div className="saved-schedules-header">
        <div className="header-content">
          <h1 className="page-title">Saved Schedules</h1>
          <p className="page-subtitle">Manage and view your saved course schedules</p>
        </div>
        <button 
          className="save-current-btn"
          onClick={() => setShowSaveDialog(true)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Save Current Schedule
        </button>
      </div>

      {showSaveDialog && (
        <div className="save-dialog-overlay" onClick={() => setShowSaveDialog(false)}>
          <div className="save-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Save Current Schedule</h3>
            <p>Enter a name for your schedule:</p>
            <input
              type="text"
              className="schedule-name-input"
              placeholder="e.g., Fall 2024 Schedule"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveSchedule()}
              autoFocus
            />
            <div className="dialog-actions">
              <button className="cancel-btn" onClick={() => setShowSaveDialog(false)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleSaveSchedule}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="schedules-container">
        {savedSchedules.length === 0 ? (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="12" width="48" height="40" rx="4" stroke="#ccc" strokeWidth="2" fill="none"/>
              <line x1="8" y1="20" x2="56" y2="20" stroke="#ccc" strokeWidth="2"/>
              <line x1="20" y1="12" x2="20" y2="52" stroke="#ccc" strokeWidth="2"/>
              <line x1="32" y1="12" x2="32" y2="52" stroke="#ccc" strokeWidth="2"/>
              <line x1="44" y1="12" x2="44" y2="52" stroke="#ccc" strokeWidth="2"/>
            </svg>
            <h3>No Saved Schedules</h3>
            <p>Create your first schedule and save it here for easy access</p>
          </div>
        ) : (
          savedSchedules.map((schedule) => (
            <CalendarView
              key={schedule.id}
              schedule={schedule}
              onDelete={onDeleteSchedule}
              onLoad={onLoadSchedule}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SavedSchedules;

