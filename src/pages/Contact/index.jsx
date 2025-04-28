import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://node-backedn-2gqn.onrender.com/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResponseMessage('Message sent successfully!');
      } else {
        setResponseMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setResponseMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-red-100 py-16 text-red-500 shadow-md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl mx-auto px-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact Us</h1>
          <p className="mt-4 text-lg md:text-xl">We’d love to hear from you. Reach out with any questions!</p>
        </motion.div>
      </header>

      {/* Contact Form Section */}
      <section className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-semibold text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message or inquiry"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>

          {/* Response Message */}
          {responseMessage && <p className="mt-4 text-center text-lg">{responseMessage}</p>}
        </motion.div>
      </section>
    </div>
  );
};

export default ContactUs;
