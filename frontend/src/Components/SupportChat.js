import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SupportChat = ({ driverId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch chat history on mount
  useEffect(() => {
    axios.get(`/api/support-chat/${driverId}/messages`)
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching messages:', error));
  }, [driverId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      driverId,
      text: input.trim(),
      timestamp: new Date().toISOString(),
      sender: 'driver'
    };

    // Optimistically add message to UI
    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Send message to backend
    axios.post(`/api/support-chat/${driverId}/send`, newMessage)
      .catch(error => {
        console.error('Error sending message:', error);
        // Optionally, remove failed message or mark it as failed
      });
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messagesContainer}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.sender === 'driver' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'driver' ? '#4da6ff' : '#e1e1e1',
              color: msg.sender === 'driver' ? 'white' : 'black',
            }}
          >
            {msg.text}
            <div style={styles.timestamp}>{new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    border: '1px solid #4da6ff',
    borderRadius: '8px',
    width: '350px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1e1e2f',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },
  messagesContainer: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  message: {
    maxWidth: '70%',
    padding: '8px 12px',
    borderRadius: '15px',
    wordWrap: 'break-word',
    fontSize: '14px',
  },
  timestamp: {
    fontSize: '10px',
    marginTop: '4px',
    textAlign: 'right',
    opacity: 0.6,
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #4da6ff',
  },
  input: {
    flex: 1,
    borderRadius: '20px',
    border: 'none',
    padding: '8px 15px',
    fontSize: '14px',
    outline: 'none',
  },
  sendButton: {
    marginLeft: '8px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#4da6ff',
    color: 'white',
    padding: '8px 15px',
    cursor: 'pointer',
  },
};

export default SupportChat;
