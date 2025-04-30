import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        setResponseMessage('Thank you for reaching out. We will get back to you shortly.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResponseMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setResponseMessage('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-blue-50 min-h-screen py-12 px-4">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-green-400 to-blue-100 py-16 text-green-900 shadow-md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl mx-auto px-4"
        >
          <ChatBubbleLeftRightIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            We're Here to Support Your Health
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            Reach out with your concerns, questions, or just to talk — we're listening.
          </p>
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
                <label htmlFor="name" className="block text-lg font-semibold text-gray-700">
                  🧑 Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
                  📧 Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-semibold text-gray-700">
                  💬 Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your message or inquiry"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-4 px-8 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 
                    ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </form>

          {/* Response Message */}
          {responseMessage && (
            <p className="mt-4 text-center text-lg text-green-700">{responseMessage}</p>
          )}

          {/* Support Tagline */}
          <p className="text-sm text-gray-500 text-center mt-2">
            We’ll get back to you within 24 hours. Your health matters to us. ❤️
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactUs;
