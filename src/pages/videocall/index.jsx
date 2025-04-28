import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your heart health assistant. How can I help you today?", sender: "bot" },
  ]);
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

  // Simulate a bot response based on user input
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="flex-1 p-4 overflow-auto">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-3`}>
                <div
                  className={`max-w-xs p-3 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center p-4 border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about heart disease or prevention..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
