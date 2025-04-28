import { motion } from 'framer-motion';

const ContactUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 -red-100 py-16 text-red-500 shadow-md">
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
          <form action="#" method="POST">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
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
        </motion.div>
      </section>

     {/* Contact Information Section */}
{/* Contact Information Section */}
<section className="mt-16 bg-red-600 py-12 px-6 rounded-lg shadow-lg text-yello">
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-3xl font-bold">Other Ways to Reach Us</h2>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="flex items-center justify-center space-x-4">
        <span className="text-4xl">📞</span>
        <p className="text-lg font-semibold">Phone: <span className="text-black-400">9022504359</span></p>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <span className="text-4xl">📧</span>
        <p className="text-lg font-semibold">Email: <span className="text-black-400">heartsathi@gmail.com</span></p>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <span className="text-4xl">🏠</span>
        <p className="text-lg font-semibold">Address: <span className="text-blue-400">Heart Sathi, Solapur</span></p>
      </div>
    </div>
  </div>
</section>


    </div>
  );
};

export default ContactUs;
