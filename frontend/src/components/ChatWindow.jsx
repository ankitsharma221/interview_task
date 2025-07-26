import React, { useState } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import UserInput from './UserInput';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    setMessages([...messages, { sender: 'user', text }]);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', {
        message: text,
      });

      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: res.data.response },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Error: Failed to get response' },
      ]);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '50px' }}>
      <MessageList messages={messages} />
      <UserInput onSend={sendMessage} />
    </div>
  );
};

export default ChatWindow;
