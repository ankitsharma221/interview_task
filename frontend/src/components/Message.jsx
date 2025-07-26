import React from 'react';

const Message = ({ sender, text }) => {
  const isUser = sender === 'user';
  const messageStyle = {
    textAlign: isUser ? 'right' : 'left',
    backgroundColor: isUser ? '#dcf8c6' : '#eee',
    borderRadius: '10px',
    padding: '10px',
    margin: '5px 0',
    maxWidth: '80%',
    alignSelf: isUser ? 'flex-end' : 'flex-start',
  };

  return <div style={messageStyle}>{text}</div>;
};

export default Message;
