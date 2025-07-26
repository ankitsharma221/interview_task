import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

const UserInput = () => {
  const { input, setInput, sendMessage, loading } = useContext(ChatContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
        placeholder="Type your message..."
        style={{ flex: 1, padding: '10px' }}
      />
      <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default UserInput;
