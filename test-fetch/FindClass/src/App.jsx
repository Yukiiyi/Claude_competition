import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import Timetable from './components/Timetable';
import SavedSchedules from './components/SavedSchedules';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('chats');
  const [courses, setCourses] = useState([
    // Sample course data to demonstrate the timetable
    {
      id: 1,
      code: '33120 A',
      name: 'SCI & SCIENCE FICTN',
      units: 9,
      hoursPerWeek: 3,
      color: '#9B59B6',
      schedule: [
        { day: 0, startTime: 11, duration: 1 }, // Monday 11 AM
        { day: 2, startTime: 11, duration: 1 }, // Wednesday 11 AM
        { day: 4, startTime: 11, duration: 1 }, // Friday 11 AM
      ]
    },
    {
      id: 2,
      code: '73155 A',
      name: 'MKTS MDLS AND MATH',
      units: 12,
      hoursPerWeek: 2,
      color: '#4A00B0',
      schedule: [
        { day: 0, startTime: 12, duration: 2 }, // Monday 12 PM - 2 PM
        { day: 2, startTime: 12, duration: 2 }, // Wednesday 12 PM - 2 PM
      ]
    },
    {
      id: 3,
      code: '15213 I',
      name: 'INTR CMPUTER SYSTEMS',
      units: 12,
      hoursPerWeek: 2.5,
      color: '#3498DB',
      schedule: [
        { day: 1, startTime: 12, duration: 2 }, // Tuesday 12 PM - 2 PM
        { day: 3, startTime: 12, duration: 2 }, // Thursday 12 PM - 2 PM
      ]
    },
    {
      id: 4,
      code: '15213 H',
      name: 'INTR CMPUTER SYSTEMS',
      units: 0,
      hoursPerWeek: 1,
      color: '#8B7EC8',
      schedule: [
        { day: 4, startTime: 13, duration: 1 }, // Friday 1 PM - 2 PM
      ]
    },
    {
      id: 5,
      code: '95422 B',
      name: 'MNG DIGITAL TRNSFM',
      units: 12,
      hoursPerWeek: 2,
      color: '#5F7C8A',
      schedule: [
        { day: 0, startTime: 14, duration: 2 }, // Monday 2 PM - 4 PM
        { day: 2, startTime: 14, duration: 2 }, // Wednesday 2 PM - 4 PM
      ]
    },
    {
      id: 6,
      code: '67443 2',
      name: 'MOBILE APP DEV',
      units: 12,
      hoursPerWeek: 2,
      color: '#C0652A',
      schedule: [
        { day: 1, startTime: 14, duration: 2 }, // Tuesday 2 PM - 4 PM
        { day: 3, startTime: 14, duration: 2 }, // Thursday 2 PM - 4 PM
      ]
    },
  ]);

  const [savedSchedules, setSavedSchedules] = useState([
    // Sample saved schedule for demonstration
    {
      id: 1,
      name: 'Fall 2024 Schedule',
      createdAt: new Date('2024-09-01'),
      courses: [
        {
          id: 1,
          code: '33120 A',
          name: 'SCI & SCIENCE FICTN',
          units: 9,
          hoursPerWeek: 3,
          color: '#9B59B6',
          schedule: [
            { day: 0, startTime: 11, duration: 1 },
            { day: 2, startTime: 11, duration: 1 },
            { day: 4, startTime: 11, duration: 1 },
          ]
        },
        {
          id: 2,
          code: '73155 A',
          name: 'MKTS MDLS AND MATH',
          units: 12,
          hoursPerWeek: 2,
          color: '#4A00B0',
          schedule: [
            { day: 0, startTime: 12, duration: 2 },
            { day: 2, startTime: 12, duration: 2 },
          ]
        },
        {
          id: 3,
          code: '15213 I',
          name: 'INTR CMPUTER SYSTEMS',
          units: 12,
          hoursPerWeek: 2.5,
          color: '#3498DB',
          schedule: [
            { day: 1, startTime: 12, duration: 2 },
            { day: 3, startTime: 12, duration: 2 },
          ]
        },
      ]
    },
  ]);


  const handleRemoveCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const handleSaveCurrentSchedule = (name) => {
    const newSchedule = {
      id: Date.now(),
      name,
      createdAt: new Date(),
      courses: [...courses],
    };
    setSavedSchedules([...savedSchedules, newSchedule]);
  };

  const handleLoadSchedule = (schedule) => {
    setCourses([...schedule.courses]);
    setCurrentView('chats');
  };

  const handleDeleteSchedule = (scheduleId) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      setSavedSchedules(savedSchedules.filter(s => s.id !== scheduleId));
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="app">
      <Sidebar currentView={currentView} onViewChange={handleViewChange} />
      
      <div className="main-content">
        {currentView === 'chats' && (
          <>
            <div className="top-bar">
              <button className="action-button invite-button">Invite</button>
              <button className="action-button create-button">Create new</button>
            </div>

            <div className="content-area">
              <div className="chat-section">
                <ChatArea />
              </div>

              <div className="timetable-section">
                <Timetable 
                  courses={courses} 
                  onRemoveCourse={handleRemoveCourse}
                  onSaveSchedule={handleSaveCurrentSchedule}
                />
              </div>
            </div>
          </>
        )}

        {currentView === 'saved' && (
          <SavedSchedules
            savedSchedules={savedSchedules}
            onLoadSchedule={handleLoadSchedule}
            onDeleteSchedule={handleDeleteSchedule}
            currentCourses={courses}
            onSaveCurrentSchedule={handleSaveCurrentSchedule}
          />
        )}

        {currentView === 'create' && (
          <div className="create-view">
            <div className="coming-soon">
              <h2>Create New Schedule</h2>
              <p>This feature is coming soon!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
