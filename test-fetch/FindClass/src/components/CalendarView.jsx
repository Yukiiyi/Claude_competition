import React from 'react';
import './CalendarView.css';

const CalendarView = ({ schedule, onDelete, onLoad }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const totalUnits = schedule.courses.reduce((sum, course) => sum + course.units, 0);
  const totalHours = schedule.courses.reduce((sum, course) => sum + course.hoursPerWeek, 0);

  return (
    <div className="calendar-view-card">
      <div className="calendar-view-header">
        <div className="schedule-info">
          <h3 className="schedule-name">{schedule.name}</h3>
          <div className="schedule-stats">
            <span className="stat-badge">{totalUnits} units</span>
            <span className="stat-badge">{totalHours.toFixed(1)} hrs/week</span>
            <span className="stat-badge">{schedule.courses.length} courses</span>
          </div>
        </div>
        <div className="schedule-actions">
          <button className="action-btn load-btn" onClick={() => onLoad(schedule)}>
            Load Schedule
          </button>
          <button className="action-btn delete-btn" onClick={() => onDelete(schedule.id)}>
            Delete
          </button>
        </div>
      </div>

      <div className="full-calendar-grid">
        {/* Header Row */}
        <div className="calendar-grid-header">
          <div className="time-header"></div>
          {days.map((day) => (
            <div key={day} className="day-header-cell">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid Body */}
        <div className="calendar-grid-body">
          <div className="time-labels">
            {timeSlots.map((time) => (
              <div key={time} className="time-label">
                {time}
              </div>
            ))}
          </div>

          <div className="calendar-grid-days">
            {days.map((day, dayIndex) => (
              <div key={day} className="calendar-day-column">
                {timeSlots.map((time, timeIndex) => (
                  <div key={`${day}-${time}`} className="calendar-grid-cell"></div>
                ))}
                
                {/* Render course blocks */}
                {schedule.courses.map((course) =>
                  course.schedule
                    .filter((session) => session.day === dayIndex)
                    .map((session, sessionIndex) => {
                      const top = ((session.startTime - 8) / 10) * 100;
                      const height = (session.duration / 10) * 100;
                      
                      return (
                        <div
                          key={`${course.id}-${sessionIndex}`}
                          className="calendar-course-block"
                          style={{
                            top: `${top}%`,
                            height: `${height}%`,
                            backgroundColor: course.color,
                          }}
                        >
                          <div className="calendar-course-code">{course.code}</div>
                          <div className="calendar-course-name">{course.name}</div>
                        </div>
                      );
                    })
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

