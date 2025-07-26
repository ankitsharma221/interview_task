import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import Message from './Message';

const MessageList = () => {
  const { messages } = useContext(ChatContext);

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}>
      {messages.map((msg, index) => (
        <Message key={index} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
};

export default MessageList;
