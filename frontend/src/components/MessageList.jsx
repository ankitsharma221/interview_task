import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => (
  <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '10px' }}>
    {messages.map((msg, index) => (
      <Message key={index} sender={msg.sender} text={msg.text} />
    ))}
  </div>
);

export default MessageList;
