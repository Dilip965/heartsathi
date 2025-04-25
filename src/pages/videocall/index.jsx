// frontend/Chat.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// The two users' IDs for demo purposes
const USER_ID_1 = 'user1';
const USER_ID_2 = 'user2';

const socket = io('http://localhost:5000'); // Backend server URL

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(USER_ID_1);

  useEffect(() => {
    // Join the room for the current user
    socket.emit('join', currentUser);

    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('receive_message');
    };
  }, [currentUser]);

  // Send message function
  const sendMessage = () => {
    if (message.trim()) {
      const receiverId = currentUser === USER_ID_1 ? USER_ID_2 : USER_ID_1;
      const messageData = { senderId: currentUser, receiverId, message };
      socket.emit('send_message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat between User 1 and User 2</h1>
      <div>
        <h3>{currentUser === USER_ID_1 ? 'User 1' : 'User 2'}'s Chat</h3>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.senderId}: </strong>{msg.message}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
