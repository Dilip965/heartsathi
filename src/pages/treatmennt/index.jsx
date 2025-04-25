import { motion } from "framer-motion";
import { useState } from "react";

const treatments = [
  {
    title: "Lifestyle Changes",
    description: "Adjusting diet, increasing physical activity, and managing stress.",
    details: "These changes include reducing salt and saturated fats, increasing fiber, avoiding tobacco, and engaging in regular aerobic exercise like walking or cycling for at least 30 minutes a day.",
    image: "https://img.icons8.com/ios/100/heart-health.png",
  },
  {
    title: "Medications",
    description: "Prescribed to manage symptoms and prevent complications.",
    details: "Common medications include beta-blockers, ACE inhibitors, statins, and blood thinners. They help reduce strain on the heart and prevent clots.",
    image: "https://img.icons8.com/ios/100/pill.png",
  },
  {
    title: "Angioplasty",
    description: "Opens blocked heart arteries using a tiny balloon.",
    details: "Often includes placing a stent (a small mesh tube) to keep the artery open. It's a minimally invasive procedure done under local anesthesia.",
    image: "https://img.icons8.com/ios/100/surgery.png",
  },
  {
    title: "Bypass Surgery",
    description: "Creates a new route for blood to reach the heart.",
    details: "A vein or artery from another part of the body is used to reroute blood around the blockage. Recovery can take several weeks.",
    image: "https://my.clevelandclinic.org/-/scassets/images/org/health/articles/21502-open-heart-surgery",
  },
  {
    title: "Implantable Devices",
    description: "Pacemakers and defibrillators support irregular heart rhythms.",
    details: "Pacemakers send electrical pulses to prompt the heart to beat regularly. Defibrillators deliver shocks when dangerous rhythms are detected.",
    image: "https://ars.els-cdn.com/content/image/1-s2.0-S153204641500074X-gr2.jpg",
  },
  {
    title: "Implantable Devices",
    description: "Pacemakers and defibrillators support irregular heart rhythms.",
    details: "Pacemakers send electrical pulses to prompt the heart to beat regularly. Defibrillators deliver shocks when dangerous rhythms are detected.",
    image: "https://ars.els-cdn.com/content/image/1-s2.0-S153204641500074X-gr2.jpg",
  },
];

const TreatmentCard = ({ treatment }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center text-center"
    >
      <img src={treatment.image} alt={treatment.title} className="w-20 h-20 mb-4" />
      <h2 className="text-xl font-semibold text-red-700">{treatment.title}</h2>
      <p className="mt-2 text-gray-600">{treatment.description}</p>
      {expanded && <p className="mt-2 text-sm text-gray-500">{treatment.details}</p>}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-full hover:bg-indigo-700 transition"
      >
        {expanded ? "Show Less" : "Learn More"}
      </button>
    </motion.div>
  );
};

const Treatment = () => {
  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-red-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-red-700">Heart Disease Treatments</h1>
        <p className="text-gray-600 mt-2 text-lg max-w-2xl mx-auto">
          Discover the most effective treatments available for managing and preventing heart-related conditions.
        </p>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {treatments.map((t, i) => (
          <TreatmentCard key={i} treatment={t} />
        ))}
      </div>
    </div>
  );
};

export default Treatment;
