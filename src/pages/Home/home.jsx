import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/photo/branding2.png'; // Your hero image
import img1 from '../../assets/photo/one1.jpeg'; // Placeholder for another image

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-red-700 text-white">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-24">
        
        {/* Left Column (Text Section) */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6 animate__animated animate__fadeIn animate__delay-0.5s">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Discover Your Heart's Future with <span className="text-yellow-500">AI</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl mx-auto md:mx-0">
            HeartSathi offers real-time heart health analysis powered by intelligent AI. Get tailored predictions, expert recommendations, and prevention tips designed for you.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start animate__animated animate__fadeIn animate__delay-1s">
            <Link to="/prediction">
              <button className="px-8 py-4 bg-yellow-500 text-gray-900 rounded-3xl hover:bg-yellow-600 transition-all duration-300 shadow-lg">
                Start Prediction
              </button>
            </Link>
            <Link to="/about">
              <button className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-3xl hover:bg-yellow-100 transition-all duration-300 shadow-md">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column (Text-based Punchline with Stylish Design) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-10 md:mb-0 animate__animated animate__fadeIn animate__delay-1.5s">
          <div className="bg-white bg-opacity-25 p-12 rounded-3xl shadow-2xl text-center max-w-lg">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Your Heart's Health, Now in Your Hands.
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              With HeartSathi, you get personalized insights, future predictions, and expert-backed recommendations that help you prevent heart risks before they occur.
            </p>
            <p className="text-md text-gray-400 italic">
              Scan. Predict. Prevent.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-12 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why HeartSathi?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-red-600">AI-Powered Prediction</h3>
            <p className="text-gray-600">Our system uses machine learning to analyze your data and predict heart disease risks accurately.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-red-600">Test Recommendations</h3>
            <p className="text-gray-600">We suggest relevant medical tests based on your health profile and symptoms.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-red-600">Free & Accessible</h3>
            <p className="text-gray-600">HeartSathi is completely free, fast, and easy to use from any device.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-red-600 py-10 text-center text-white px-6 md:px-16">
        <h2 className="text-3xl font-bold mb-4">Your Heart Deserves Care</h2>
        <p className="text-lg mb-6">Start your health journey today with our AI-powered prediction tool.</p>
        <Link to="/prediction">
          <button className="px-8 py-3 bg-white text-red-600 font-semibold rounded-xl hover:bg-gray-100 transition-all">
            Predict Now
          </button>
        </Link>
      </section>
    </div>
  );
}

export default Home;
