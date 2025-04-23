
import React, { useState,useEffect } from 'react';
import { motion,useAnimation } from 'framer-motion';
import { 
  Brain, 
  BarChart, 
  Shield, 
  Users, 
  Activity, 
  Database,
  Award,
  ScrollText,
  CheckCircle,
  Clock,
  Code,
  Heart,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const AboutSection = ({ title, content, icon: Icon }) => (
  <motion.div 
    className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
    variants={fadeInUp}
    whileHover={{ scale: 1.05 }}
  >
    <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4">
      <Icon className="w-8 h-8 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{content}</p>
  </motion.div>
);

const TechCard = ({ title, description, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className={`bg-white rounded-xl p-8 transition-all duration-500 ${
        isHovered ? 'shadow-2xl scale-105' : 'shadow-md'
      } cursor-pointer border-2 border-transparent hover:border-blue-100`}
      variants={fadeInUp}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg transition-colors duration-300 ${
          isHovered ? 'bg-blue-100' : 'bg-purple-100'
        }`}>
          <Icon className={`w-6 h-6 transition-colors duration-300 ${
            isHovered ? 'text-blue-600' : 'text-purple-600'
          }`} />
        </div>
        <h4 className="font-semibold text-xl">{title}</h4>
      </div>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const TeamMember = ({ name, role, photoUrl }) => (
  <motion.div
    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    variants={fadeInUp}
    whileHover={{ scale: 1.05 }}
  >
    <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
      <img 
        src={photoUrl} 
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
    <h4 className="text-xl font-semibold text-center mb-2">{name}</h4>
    <p className="text-gray-600 text-center">{role}</p>
  </motion.div>
);

const ContactInfo = ({ icon: Icon, title, content }) => (
  <motion.div 
    className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    variants={fadeInUp}
    whileHover={{ scale: 1.05 }}
  >
    <div className="p-3 bg-blue-100 rounded-full">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-600">{content}</p>
    </div>
  </motion.div>
);

const AboutUs = () => {
  const stats = [
    { value: 95, label: "Prediction Accuracy", icon: CheckCircle },
    { value: 100, label: "Features Analyzed", icon: Database },
    { value: 24, label: "Monitoring (Hours)", icon: Clock },
    { value: 100, label: "Security", icon: Shield }
  ];
const CountUp = ({ end }) => {
  const controls = useAnimation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    controls.start({
      value: end,
      transition: { duration: 2, ease: 'easeOut' }
    });
  }, [end, controls]);

  return (
    <motion.span
      animate={controls}
      initial={{ value: 0 }}
      onUpdate={(latest) => setValue(Math.floor(latest.value))}
    >
      {value}
    </motion.span>
  );
};
  const techStack = [
    {
      icon: Brain,
      title: "Random Forest Classifier",
      description: "Advanced machine learning model using ensemble methods for highly accurate Heart health predictions."
    },
    {
      icon: Code,
      title: "Python & Flask Backend",
      description: "Robust API infrastructure with comprehensive error handling and real-time processing capabilities."
    },
    {
      icon: Activity,
      title: "Real-time Analysis",
      description: "Instant Heart health assessments with advanced data preprocessing and standardization."
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade security with CORS protection and encrypted data transmission."
    }
  ];

  const teamMembers = [
    { 
      name: "Pranita Tathe", 
      role: "ML Engineer",
      photoUrl: "/suhas.jpg",
    },
    { 
      name: "Sonali Patil", 
      role: "FullStack Developer",
      photoUrl: "/me.jpg"  
    },
    { 
      name: "Shivani Patil", 
      role: "Integration Developer",
      photoUrl: "/vivek.jpg"
    },
    { 
      name: "Dilip Nandiwale", 
      role: "UI & UX Designer",
      photoUrl: "/rohann.jpg"  
    },
    { 
      name: "Gunjan Shivshara", 
      role: "Frontend Developer",
      photoUrl: "/sohamm.jpg"  
    }
  ];

  return (
    <div className="min-h-screen bg-[rgb(244,237,255)]">
      <motion.div 
        className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          variants={fadeInUp}
        >
          <motion.div 
            className="inline-block p-2 px-4 bg-blue-100 rounded-full text-red-300 font-medium mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          Heart Health Prediction System That Designed for you
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            We Help You to Protect Your Real 
            <span className="text-red-600"> Sathi</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Using advanced machine learning and data analytics to revolutionize Heart health assessment 
            and support with our AI-powered prediction system.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
                  variants={staggerContainer}
                >
                  {stats.map((stat, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex flex-col items-center">
                        <stat.icon className="w-8 h-8 text-blue-600 mb-4" />
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          <CountUp end={stat.value} />
                          {stat.label === "Prediction Accuracy" && "%"}
                          {stat.label === "Features Analyzed" && "%"}
                          {stat.label === "Security" && "%"}
                        </div>
                        <div className="text-gray-600 text-center">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

        {/* Main Features */}
        <motion.div className="mb-20" variants={staggerContainer}>
          <motion.h2 
            className="text-3xl font-bold text-center mb-4"
            variants={fadeInUp}
          >
            Our Core Features
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Leveraging cutting-edge technology to provide comprehensive Heart health analysis and support.
          </motion.p>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            <AboutSection 
              icon={Brain}
              title="AI Analysis"
              content="State-of-the-art machine learning algorithms for accurate Heart health predictions."
            />
            <AboutSection 
              icon={BarChart}
              title="Data Insights"
              content="Advanced analytics providing deep understanding of Heart health patterns."
            />
            <AboutSection 
              icon={Heart}
              title="Personalized Care"
              content="Tailored recommendations based on individual Heart health profiles."
            />
            <AboutSection 
              icon={ScrollText}
              title="Detailed Reports"
              content="Comprehensive assessments with actionable insights and recommendations."
            />
          </motion.div>
        </motion.div>

        {/* Technical Stack */}
        <motion.div className="mb-20" variants={staggerContainer}>
          <motion.h2 
            className="text-3xl font-bold text-center mb-4"
            variants={fadeInUp}
          >
            Technology Stack
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Built with cutting-edge technologies to ensure reliability, security, and accuracy.
          </motion.p>
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
          >
            {techStack.map((tech, index) => (
              <TechCard key={index} {...tech} />
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div className="mb-20" variants={staggerContainer}>
            <motion.h2
              className="text-3xl font-bold text-center mb-4"
              variants={fadeInUp}
            >
              Our Team
            </motion.h2>
            <motion.p
              className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Expert professionals dedicated to advancing Heart health technology.
            </motion.p>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-5 gap-8"
              variants={staggerContainer}
            >
              {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </motion.div>
          </motion.div>


        {/* Contact Section */}
        <motion.div className="mb-20" variants={staggerContainer}>
          <motion.h2 
            className="text-3xl font-bold text-center mb-4"
            variants={fadeInUp}
          >
            Get in Touch
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Have questions about our Heart health prediction system? We're here to help.
          </motion.p>
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            <ContactInfo 
              icon={Mail}
              title="Email Us"
              content="mayurdhamgunde@gmail.com"
            />
            <ContactInfo 
              icon={Phone}
              title="Call Us"
              content="+91 9284675626"
            />
            <ContactInfo 
              icon={MapPin}
              title="Visit Us"
              content="Innovation Drive, Tech City Solapur, Maharashtra, India"
            />
          </motion.div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 rounded-2xl p-12 text-center shadow-lg"
          variants={fadeInUp}
        >
          <motion.h2 
            className="text-3xl font-bold mb-6"
            variants={fadeInUp}
          >
            Our Mission
          </motion.h2>
          <motion.p 
            className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed"
            variants={fadeInUp}
          >
         <h1>Make Heart Health Simple with HeartSathi</h1>

          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;

