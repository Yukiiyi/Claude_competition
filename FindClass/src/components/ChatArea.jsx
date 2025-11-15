import React, { useState } from 'react';
import './ChatArea.css';

const ChatArea = ({ onAddCourse }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const newMessages = [...messages, { type: 'user', text: message }];
    setMessages(newMessages);

    // Simple course parsing logic (you'll enhance this later)
    const courseAdded = onAddCourse(message);
    
    if (courseAdded) {
      newMessages.push({ 
        type: 'assistant', 
        text: `I've added the course to your schedule!` 
      });
    } else {
      newMessages.push({ 
        type: 'assistant', 
        text: `I'm ready to help you add courses to your schedule. Try saying something like "Add course 15213" or "I want to take Introduction to Computer Systems".` 
      });
    }
    
    setMessages(newMessages);
    setMessage('');
  };

  return (
    <div className="chat-area">
      <div className="chat-content">
        {messages.length === 0 ? (
          <div className="chat-welcome">
            <h2>what can I help you Today</h2>
          </div>
        ) : (
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <form className="chat-input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="send-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10L18 2L10 18L8 11L2 10Z" fill="currentColor"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatArea;

