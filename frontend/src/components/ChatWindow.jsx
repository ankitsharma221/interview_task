import React from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';

const ChatWindow = () => {
  return (
    <div style={{ width: '500px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
      <MessageList />
      <UserInput />
    </div>
  );
};

export default ChatWindow;
