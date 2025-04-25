import React, { useState } from 'react';

const Chat = () => {
  const initialMessages = [
    { text: "Hi! I'm your heart health assistant. How can I help you today?", sender: "bot" },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSendMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, { text: newMessage, sender: "user" }]);
    setInput('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(newMessage);
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: "bot" }]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes('symptoms')) {
      return "Common symptoms of heart disease include chest pain, shortness of breath, and fatigue. If you're experiencing these, it's important to see a doctor.";
    }
    if (lowerCaseMessage.includes('prevention')) {
      return "To prevent heart disease, focus on a healthy diet, regular exercise, and managing stress.";
    }
    if (lowerCaseMessage.includes('risk factors')) {
      return "Risk factors for heart disease include high blood pressure, high cholesterol, smoking, and a family history of heart disease.";
    }
    if (lowerCaseMessage.includes('treatment')) {
      return "Treatment options for heart disease may include medications, lifestyle changes, and in some cases, surgical procedures. Consult with a healthcare provider for personalized advice.";
    }
    if (lowerCaseMessage.includes('diet')) {
      return "A heart-healthy diet includes fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit intake of saturated fats, sodium, and added sugars.";
    }
    if (lowerCaseMessage.includes('exercise')) {
      return "Regular physical activity, such as walking, jogging, or swimming, can improve heart health. Aim for at least 150 minutes of moderate-intensity exercise per week.";
    }
    return "I'm here to help with heart health! Ask me anything about symptoms, prevention, risk factors, treatment, diet, or exercise.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleSendMessage(input);
    }
  };

  const handleReset = () => {
    setMessages(initialMessages);
    setInput('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col space-y-4 overflow-auto h-96 p-4 border-b border-gray-200">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs p-3 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center p-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about heart disease or prevention..."
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          >
            Send
          </button>
        </form>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Reset Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
