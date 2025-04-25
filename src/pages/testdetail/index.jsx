import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
const TestDetails = () => {
  // Default test will be 'ecg'
  const [activeTest, setActiveTest] = useState("ecg");

  // Toggle between showing and hiding the test
  const toggleTest = (testId) => {
    setActiveTest(testId === activeTest ? null : testId);
  };

  useEffect(() => {
    // Ensures the first test is shown on load
    setActiveTest("ecg");
  }, []);

  return (

    <>
    
    <header className="bg-gradient-to-r from-blue-600 to-red-700 py-16 text-red shadow-md">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="text-center max-w-3xl mx-auto px-4"
  >
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
      Heart Tests & Diagnoses
    </h1>
    <p className="mt-4 text-lg md:text-xl text-red-800 bg-red-400 p-2 rounded-md">
      Explore various heart tests and learn how they diagnose heart conditions
    </p>
  </motion.div>
</header>
   
    <div className="flex w-full">



      {/* Left Column - List of Tests */}
      <div className="w-1/3 bg-gray-100 p-4">
        <div
          className="cursor-pointer bg-gray-200 p-4 rounded-md mb-4 shadow-md hover:bg-gray-300"
          onClick={() => toggleTest("ecg")}
        >
          <h2 className="text-xl font-semibold">Electrocardiogram (ECG)</h2>
        </div>
        <div
          className="cursor-pointer bg-gray-200 p-4 rounded-md mb-4 shadow-md hover:bg-gray-300"
          onClick={() => toggleTest("echo")}
        >
          <h2 className="text-xl font-semibold">Echocardiogram</h2>
        </div>
        <div
          className="cursor-pointer bg-gray-200 p-4 rounded-md mb-4 shadow-md hover:bg-gray-300"
          onClick={() => toggleTest("stress")}
        >
          <h2 className="text-xl font-semibold">Stress Test</h2>
        </div>
        <div
          className="cursor-pointer bg-gray-200 p-4 rounded-md mb-4 shadow-md hover:bg-gray-300"
          onClick={() => toggleTest("holter")}
        >
          <h2 className="text-xl font-semibold">Holter Monitor</h2>
        </div>
        <div
          className="cursor-pointer bg-gray-200 p-4 rounded-md mb-4 shadow-md hover:bg-gray-300"
          onClick={() => toggleTest("mri")}
        >
          <h2 className="text-xl font-semibold">Cardiac MRI</h2>
        </div>
        <div
          className="cursor-pointer bg-gray-200 p-4 rounded-md mb-4 shadow-md hover:bg-gray-300"
          onClick={() => toggleTest("ct")}
        >
          <h2 className="text-xl font-semibold">Cardiac CT Scan</h2>
        </div>
        <div
          className="cursor-pointer bg-gray-200 p-4 rounded-md mb-4 shadow-md hover:bg-gray-300"
          onClick={() => toggleTest("angiogram")}
        >
          <h2 className="text-xl font-semibold">Coronary Angiogram</h2>
        </div>
        <div
          className="cursor-pointer bg-gray-200 p-4 rounded-md mb-4 shadow-md hover:bg-gray-300"
          onClick={() => toggleTest("blood")}
        >
          <h2 className="text-xl font-semibold">Blood Tests</h2>
        </div>
        <div
          className="cursor-pointer bg-gray-200 p-4 rounded-md mb-4 shadow-md hover:bg-gray-300"
          onClick={() => toggleTest("nuclear")}
        >
          <h2 className="text-xl font-semibold">Nuclear Cardiac Test</h2>
        </div>
        <div
          className="cursor-pointer bg-gray-200 p-4 rounded-md mb-4 shadow-md hover:bg-gray-300"
          onClick={() => toggleTest("pet")}
        >
          <h2 className="text-xl font-semibold">PET Scan</h2>
        </div>
      </div>

      {/* Right Column - Test Details */}
      <div className="w-2/3 p-4">
        {activeTest === "ecg" && (
          <div>
            <h2 className="text-3xl font-semibold mb-4">Electrocardiogram (ECG)</h2>
            <p className="text-lg mb-4">
              An Electrocardiogram (ECG or EKG) is a diagnostic tool used to measure the electrical activity of the heart. It detects irregularities in heart rhythms, heart attacks, and other heart conditions.
            </p>
            <p>
              <strong>How It Works:</strong> Electrodes are attached to your skin to monitor the heart's electrical impulses. These are recorded and displayed as waves on a monitor.
            </p>
            <p><strong>Duration:</strong> Typically 5-10 minutes.</p>
            <p><strong>Preparation:</strong> No special preparation needed, but avoid lotions and oils on your chest.</p>
            <p>
              <strong>References:</strong>
              <a href="https://www.cdc.gov/ncbddd/strokes/about/ecg.html" target="_blank" className="text-blue-500 ml-2">
                Learn More
              </a>
            </p>
          </div>
        )}

        {activeTest === "echo" && (
          <div>
            <h2 className="text-3xl font-semibold mb-4">Echocardiogram</h2>
            <p className="text-lg mb-4">
              An echocardiogram uses ultrasound waves to produce images of the heart. It helps diagnose conditions such as heart valve problems, congenital heart defects, and cardiomyopathy.
            </p>
            <p>
              <strong>How It Works:</strong> A special gel is applied to your chest, and a small ultrasound device called a transducer is moved over the area to capture images of the heart.
            </p>
            <p><strong>Duration:</strong> 30-60 minutes.</p>
            <p><strong>Preparation:</strong> No special preparation is required, but wearing loose clothing is recommended.</p>
            <p>
              <strong>References:</strong>
              <a href="https://www.mayoclinic.org/tests-procedures/echocardiogram/about/pac-20384945" target="_blank" className="text-blue-500 ml-2">
                Learn More
              </a>
            </p>
          </div>
        )}

        {activeTest === "stress" && (
          <div>
            <h2 className="text-3xl font-semibold mb-4">Stress Test</h2>
            <p className="text-lg mb-4">
              A stress test assesses how well your heart works during physical activity. This test can help determine if there are any blockages or other heart issues that affect your heart's performance under stress.
            </p>
            <p>
              <strong>How It Works:</strong> You will be asked to walk or run on a treadmill or ride a stationary bike while your heart rate and ECG are monitored.
            </p>
            <p><strong>Duration:</strong> 30-60 minutes.</p>
            <p><strong>Preparation:</strong> Avoid eating or drinking caffeine for at least three hours before the test. Wear comfortable clothes and shoes.</p>
            <p>
              <strong>References:</strong>
              <a href="https://www.heart.org/en/health-topics/heart-attack/stress-test" target="_blank" className="text-blue-500 ml-2">
                Learn More
              </a>
            </p>
          </div>
        )}

        {activeTest === "holter" && (
          <div>
            <h2 className="text-3xl font-semibold mb-4">Holter Monitor</h2>
            <p className="text-lg mb-4">
              A Holter monitor is a portable device used to continuously record the electrical activity of your heart over 24-48 hours.
            </p>
            <p>
              <strong>How It Works:</strong> Small electrodes are attached to your chest, connected to a device that records your heart’s rhythm while you go about your normal activities.
            </p>
            <p><strong>Duration:</strong> 24-48 hours.</p>
            <p><strong>Preparation:</strong> Wear loose-fitting clothing, and avoid getting the monitor wet.</p>
            <p>
              <strong>References:</strong>
              <a href="https://www.mayoclinic.org/tests-procedures/holter-monitor/about/pac-20385051" target="_blank" className="text-blue-500 ml-2">
                Learn More
              </a>
            </p>
          </div>

          
        )}

        {/* You can similarly add more details for other tests */}
      </div>
    </div>
    </>
  );
};

export default TestDetails;
