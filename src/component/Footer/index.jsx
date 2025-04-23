// components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 to-indigo-600 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

       
        <div>
          <h2 className="text-3xl font-bold mb-4 text-red-500">HeartSathi</h2>
          <p className="text-sm text-gray-300">Your trusted companion for predicting and protecting your heart health. Harness the power of technology to stay ahead of heart disease, live longer, and live stronger with HeartSathi.</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><NavLink to="/" className="hover:text-yellow-400 transition-colors">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-yellow-400 transition-colors">About</NavLink></li>
            <li><NavLink to="/prediction" className="hover:text-yellow-400 transition-colors">Prediction</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-yellow-400 transition-colors">Contact</NavLink></li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p className="text-sm text-gray-300">Email: support@heartsathi.online</p>
          <p className="text-sm text-gray-300">Phone: +91 98765 43210</p>
          <p className="text-sm text-gray-300">Pune, India</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-6 text-gray-300">
            <a href="#" className="hover:text-yellow-400 transition-colors"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-400 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-400 transition-colors"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      <div className="text-center text-gray-400 text-sm mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} HeartSathi. All rights reserved. Empowering heart health through technology.
      </div>
    </footer>
  );
}

export default Footer;
