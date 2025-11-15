import React from 'react';
import './CourseBlock.css';

const CourseBlock = ({ course, session }) => {
  const { startTime, duration } = session;
  
  // Calculate position (60px per hour starting from 8 AM)
  const top = (startTime - 8) * 60;
  const height = duration * 60;

  return (
    <div
      className="course-block"
      style={{
        top: `${top}px`,
        height: `${height}px`,
        backgroundColor: course.color,
      }}
    >
      <div className="course-code">{course.code}</div>
      <div className="course-name">{course.name}</div>
    </div>
  );
};

export default CourseBlock;

