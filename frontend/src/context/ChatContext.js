import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.response }]);
    } catch (err) {
      console.error('API Error:', err);
      setMessages(prev => [...prev, { sender: 'ai', text: 'Something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{ messages, input, setInput, sendMessage, loading }}
    >
      {children}
    </ChatContext.Provider>
  );
};
