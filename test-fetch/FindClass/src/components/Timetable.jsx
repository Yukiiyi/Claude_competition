import React, { useState } from 'react';
import CourseBlock from './CourseBlock';
import './Timetable.css';

const Timetable = ({ courses, onRemoveCourse, onSaveSchedule }) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [scheduleName, setScheduleName] = useState('');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
  ];

  // Calculate total workload
  const totalUnits = courses.reduce((sum, course) => sum + course.units, 0);
  const totalHours = courses.reduce((sum, course) => sum + course.hoursPerWeek, 0);

  const handleSaveSchedule = () => {
    if (!scheduleName.trim()) {
      alert('Please enter a schedule name');
      return;
    }
    if (courses.length === 0) {
      alert('Please add some courses before saving');
      return;
    }

    onSaveSchedule(scheduleName);
    setScheduleName('');
    setShowSaveDialog(false);
    alert('Schedule saved successfully!');
  };

  return (
    <div className="timetable">
      {showSaveDialog && (
        <div className="save-dialog-overlay" onClick={() => setShowSaveDialog(false)}>
          <div className="save-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Save Schedule</h3>
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

      <div className="timetable-header">
        <div className="timetable-title">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H13V13H3V3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M5 1V4M11 1V4M3 6H13" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span>My Schedule</span>
        </div>
        <div className="header-actions">
          <button 
            className="save-calendar-btn"
            onClick={() => setShowSaveDialog(true)}
            disabled={courses.length === 0}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 14H13V6L10 3H3V14Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M5 3V6H9V3M3 7H13" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Save Calendar
          </button>
          <div className="units-carried">
            Units Carried: <span className="units-number">{totalUnits}</span>
          </div>
        </div>
      </div>

      <div className="course-tags">
        {courses.map((course) => (
          <div key={course.id} className="course-tag" style={{ backgroundColor: course.color + '30', borderColor: course.color }}>
            <span>{course.code}</span>
            <button 
              className="remove-course"
              onClick={() => onRemoveCourse(course.id)}
              aria-label={`Remove ${course.code}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="workload-summary">
        <span>Total Workload: {totalUnits} units, {totalHours.toFixed(2)} hrs/week</span>
        <button className="show-dropdown">Show ▼</button>
      </div>

      <div className="calendar-container">
        <div className="calendar-grid">
          {/* Header Row */}
          <div className="calendar-header">
            <div className="time-column-header"></div>
            {days.map((day) => (
              <div key={day} className="day-header">
                {day}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="calendar-body">
            <div className="time-column">
              {timeSlots.map((time) => (
                <div key={time} className="time-slot">
                  {time}
                </div>
              ))}
            </div>

            {/* Day Columns */}
            <div className="days-grid">
              {days.map((day, dayIndex) => (
                <div key={day} className="day-column">
                  {timeSlots.map((time, timeIndex) => (
                    <div key={`${day}-${time}`} className="calendar-cell"></div>
                  ))}
                  
                  {/* Render course blocks for this day */}
                  {courses.map((course) => 
                    course.schedule
                      .filter((session) => session.day === dayIndex)
                      .map((session, sessionIndex) => (
                        <CourseBlock
                          key={`${course.id}-${sessionIndex}`}
                          course={course}
                          session={session}
                        />
                      ))
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;

