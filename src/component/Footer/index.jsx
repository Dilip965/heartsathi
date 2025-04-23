import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, MessageCircle, Globe, Star,
  Shield, Clock, Brain, Activity, ExternalLink, ChevronRight,
  } from 'lucide-react';
// import { } from 'lucide-react';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const links = [
    { name: 'Home', href: '/' },
    { name: 'DashBoard', href: '/dashboard' },
    { name: 'Virtual-Care', href: '/virtual-care' },
    { name: 'About Us', href: '/about' }
  ];

  return (
    <motion.footer 
      className="bg-gradient-to-b from-purple-100/50 to-white pt-16 pb-8 px-4 sm:px-6 lg:px-8" 
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Company Info */}
          <motion.div 
            className="space-y-4" 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Brain className="text-violet-600" size={28} />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-700 to-violet-500 bg-clip-text text-transparent">MindGuard AI</h3>
            </motion.div>
            <p className="text-gray-600 leading-relaxed text-lg">
              Transforming mental wellness through AI-driven technology and personalized care.
            </p>
            <div className="flex space-x-5 pt-2">
              {[FaTwitter, FaFacebook, FaLinkedin, FaInstagram].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className="p-2 bg-violet-100 rounded-xl hover:bg-violet-200"
                >
                  <Icon className="text-violet-600" size={20} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-4"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2"> 
              <ExternalLink size={22} className="text-violet-600" />
              Quick Links
            </h3>
            <ul className="space-y-4">
              {links.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.a 
                    href={link.href}
                    className="text-gray-600 hover:text-violet-700 flex items-center gap-2 group text-lg"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight size={18} className="text-violet-400 group-hover:translate-x-1 transition-transform duration-200" />
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-4"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2"> 
              <Shield size={22} className="text-violet-600" />
              Our Services
            </h3>
            <ul className="space-y-4"> 
              {['Wearable Sensor Data', 'Social Media Data', 'Speech Pattern Data'].map((service, index) => (
                <motion.li 
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.a 
                    href="/services"
                    className="text-gray-600 hover:text-violet-700 flex items-center gap-2 group text-lg"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight size={18} className="text-violet-400 group-hover:translate-x-1 transition-transform duration-200" />
                    {service}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="pt-4"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2"> 
              <Mail size={22} className="text-violet-600" />
              Contact Us
            </h3>
            <div className="space-y-4"> 
              {[
                { Icon: Phone, text: '+91 9284675626' },
                { Icon: Mail, text: 'mindguardaimental@gmail.com' },
                { Icon: Clock, text: '24/7 Support Available' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3 group"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="p-2.5 bg-violet-100 rounded-xl group-hover:bg-violet-200 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                  >
                    <item.Icon size={20} className="text-violet-600" />
                  </motion.div>
                  <span className="text-gray-600 text-lg">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-violet-200" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div 
              className="text-gray-600 text-base flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Shield size={18} className="text-violet-600" />
              © 2025 MindGuard AI. All rights reserved.
            </motion.div>
            <div className="flex flex-wrap justify-center gap-8">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((policy, index) => (
                <motion.a 
                  key={policy}
                  href="#" 
                  className="text-gray-600 hover:text-violet-700 text-base flex items-center gap-2 hover:underline decoration-violet-400 underline-offset-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {policy}
                  <ExternalLink size={14} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;