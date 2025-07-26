import React from 'react';

const Message = ({ sender, text }) => {
  const isUser = sender === 'user';

  return (
    <div style={{ textAlign: isUser ? 'right' : 'left', margin: '10px 0' }}>
      <div
        style={{
          display: 'inline-block',
          background: isUser ? '#007bff' : '#e5e5ea',
          color: isUser ? 'white' : 'black',
          padding: '10px 15px',
          borderRadius: '20px',
          maxWidth: '70%',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
