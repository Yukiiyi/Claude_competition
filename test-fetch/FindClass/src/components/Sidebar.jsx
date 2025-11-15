import React from 'react';
import './Sidebar.css';

const Sidebar = ({ currentView, onViewChange }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Icon: Cmu Courses</h2>
      </div>

      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${currentView === 'chats' ? 'active' : ''}`}
          onClick={() => onViewChange('chats')}
        >
          <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20Z" fill="currentColor"/>
            <path d="M12 6C11.448 6 11 6.448 11 7V12.414L14.293 15.707C14.683 16.097 15.317 16.097 15.707 15.707C16.097 15.317 16.097 14.683 15.707 14.293L13 11.586V7C13 6.448 12.552 6 12 6Z" fill="currentColor"/>
          </svg>
          <span className="nav-label">Chats</span>
        </button>

        <button 
          className={`nav-item ${currentView === 'saved' ? 'active' : ''}`}
          onClick={() => onViewChange('saved')}
        >
          <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span className="nav-label">Saved</span>
        </button>

        <button 
          className={`nav-item ${currentView === 'create' ? 'active' : ''}`}
          onClick={() => onViewChange('create')}
        >
          <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="nav-label">Create</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar"></div>
          <div className="user-info">
            <div className="user-name">Yuqi Zou</div>
            <div className="user-handle">@yuqi-zou</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

