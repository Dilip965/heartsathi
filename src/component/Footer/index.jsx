import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./index.css"; // Assuming you have a CSS file for additional styles
const Footer = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Knowledge", href: "/knowledge" },
    { name: "Treatment", href: "/treatment" },
    { name: "Prediction", href: "/prediction" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-red-50 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

        {/* Column 1: Logo / About */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-red-600">HeartSathi</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Transforming mental wellness through AI-powered prediction and care.
          </p>
          <div className="flex gap-4 mt-4">
            {[FaTwitter, FaFacebook, FaLinkedin, FaInstagram].map((Icon, i) => (
              <Icon key={i} className="text-red-500 hover:text-red-700 cursor-pointer" />
            ))}
          </div>
        </motion.div>

        {/* Column 2: Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="flex items-center text-gray-700 hover:text-red-600"
                >
                  <ChevronRight size={16} className="mr-2" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 3: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-700 text-sm">
            <li className="flex items-center">
              <Phone size={16} className="mr-2 text-red-500" />
              +91 9022504359
            </li>
            <li className="flex items-center">
              <Mail size={16} className="mr-2 text-red-500" />
              heartsathi@gmail.com
            </li>
            <li className="flex items-center">
              <MapPin size={16} className="mr-2 text-red-500" />
              HeartSathi HQ, Pune, India
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="text-center mt-8 text-gray-500 text-sm">
        © 2025 HeartSathi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
