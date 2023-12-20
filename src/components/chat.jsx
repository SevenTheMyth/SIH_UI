import React, { useState } from 'react';
import {Box} from '@mui/material';
import '../assets/css/chat.css'; 
import InputBar from './inputbar';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = {
      text: inputValue,
      type: 'user',
    };

    // Store user's message and system response in the state
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');

    // Simulate system response (replace with actual system processing)
    setTimeout(() => {
      const systemResponse = {
        text: 'This is a system response.',
        type: 'system',
      };
      setMessages((prevMessages) => [...prevMessages, systemResponse]);
    }, 500);
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'user' ? 'user' : 'system'}`}
          >
            <div className="avatar">{message.type === 'user' ? 'User' : 'System'}</div>
            <div className="message-bubble">{message.text}</div>
          </div>
        ))}
      </div>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '5px'}}>
        <InputBar onSubmit={handleSubmit} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      </Box>     
    </div>
  );
};

export default ChatApp;
