import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/photo/branding1.png'; // Replace with your actual image path

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-12">
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 leading-tight">
            Predict Your Heart Health with <span className="text-gray-900">AI</span>
          </h1>
          <p className="text-lg text-gray-600">
            HeartSathi helps you understand your heart risk levels using intelligent, AI-powered analysis. Get insights, test recommendations, and prevention tips in minutes.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link to="/prediction">
              <button className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all">
                Start Prediction
              </button>
            </Link>
            <Link to="/about">
              <button className="px-6 py-3 border-2 border-red-600 text-red-600 rounded-xl hover:bg-red-100 transition-all">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-10 md:mb-0">
          <img
            src={heroImage}
            alt="Heart health illustration"
            className="max-w-sm md:max-w-md lg:max-w-lg rounded-xl shadow-lg"
          />
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
{/* 
      Call to Action
      <section className="bg-red-600 py-10 text-center text-white px-6 md:px-16">
        <h2 className="text-3xl font-bold mb-4">Your Heart Deserves Care</h2>
        <p className="text-lg mb-6">Start your health journey today with our AI-powered prediction tool.</p>
        <Link to="/prediction">
          <button className="px-8 py-3 bg-white text-red-600 font-semibold rounded-xl hover:bg-gray-100 transition-all">
            Predict Now
          </button>
        </Link>
      </section> */}
    </div>
  );
}

export default Home;
