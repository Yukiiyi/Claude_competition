import { useState } from 'react';
import './ChatArea.css';

const ChatArea = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    // Add user message
    const userMessage = message;
    setMessages([...messages, { type: 'user', text: userMessage }]);
    setMessage('');
    setIsLoading(true);

    try {
      // Call Flask backend
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (data.success) {
        // Add assistant response
        setMessages(prev => [...prev, {
          type: 'assistant',
          text: data.response
        }]);
      } else {
        setMessages(prev => [...prev, {
          type: 'assistant',
          text: `Sorry, I encountered an error: ${data.error}`
        }]);
      }
    } catch (error) {
      console.error('Error calling backend:', error);
      setMessages(prev => [...prev, {
        type: 'assistant',
        text: 'Sorry, I could not connect to the backend. Please make sure the Flask server is running on http://localhost:5000'
      }]);
    } finally {
      setIsLoading(false);
    }
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
          placeholder={isLoading ? "Thinking..." : "Ask me about CMU courses..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" className="send-button" disabled={isLoading}>
          {isLoading ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10L18 2L10 18L8 11L2 10Z" fill="currentColor"/>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatArea;

