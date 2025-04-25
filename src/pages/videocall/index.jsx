import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://heartdiseasebackend.onrender.com');

const ChatApp = () => {
  const [currentUser, setCurrentUser] = useState('user1');
  const [receiver, setReceiver] = useState('user2');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.emit('join', currentUser);
  }, [currentUser]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off('receive_message');
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const data = { senderId: currentUser, receiverId: receiver, message };
    socket.emit('send_message', data);
    setMessages((prev) => [...prev, data]);
    setMessage('');
  };

  const switchUser = () => {
    const newUser = currentUser === 'user1' ? 'user2' : 'user1';
    const newReceiver = currentUser;
    setCurrentUser(newUser);
    setReceiver(newReceiver);
    setMessages([]);
    socket.emit('join', newUser);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Chat as: {currentUser}</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          onClick={switchUser}
        >
          Switch to {receiver}
        </button>
      </div>

      <div className="h-80 overflow-y-auto space-y-2 p-4 border rounded-lg bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === currentUser ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                msg.senderId === currentUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-900'
              }`}
            >
              <div className="font-semibold text-xs mb-1">
                {msg.senderId}
              </div>
              <div>{msg.message}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
