// src/ChatApp.jsx
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://heartdiseasebackend.onrender.com/');

const ChatApp = () => {
  const [currentUser, setCurrentUser] = useState('user1'); // user1 or user2
  const [receiver, setReceiver] = useState('user2');       // opposite of current user
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Join room on mount
  useEffect(() => {
    socket.emit('join', currentUser);
  }, [currentUser]);

  // Listen for messages
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Cleanup
    return () => {
      socket.off('receive_message');
    };
  }, []);

  // Send message
  const sendMessage = () => {
    if (!message.trim()) return;

    const data = {
      senderId: currentUser,
      receiverId: receiver,
      message,
    };

    socket.emit('send_message', data);
    setMessages((prev) => [...prev, data]); // also show own message
    setMessage('');
  };

  // Switch user
  const switchUser = () => {
    const newUser = currentUser === 'user1' ? 'user2' : 'user1';
    const newReceiver = currentUser;
    setCurrentUser(newUser);
    setReceiver(newReceiver);
    setMessages([]);
    socket.emit('join', newUser);
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded shadow-lg bg-white">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Chat as: {currentUser}</h2>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={switchUser}
        >
          Switch to {receiver}
        </button>
      </div>

      <div className="h-64 overflow-y-auto border p-4 mb-4 rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.senderId === currentUser
                ? 'text-right text-blue-600'
                : 'text-left text-green-600'
            }`}
          >
            <strong>{msg.senderId}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          className="flex-1 border p-2 rounded-l"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-r"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
