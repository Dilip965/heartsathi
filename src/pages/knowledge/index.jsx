import React, { useState } from "react";
import { motion } from "framer-motion";

const Knowledge = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-red-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-red-700 py-16 text-red shadow-md">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-3xl mx-auto px-4"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Heart Health Knowledge
        </h1>
        <p className="mt-4 text-lg md:text-xl text-black-800 bg-red-400">
          Learn about heart disease, prevention, and healthy living
        </p>
      </motion.div>
    </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-8 gap-8">
        {/* Sidebar */}
        <aside className="md:w-1/4 space-y-2">
          {[
            ["#heart", "Basic of Heart"],
            ["#introduction", "Introduction"],
            ["#causes", "Causes & Risks"],
            ["#symptoms", "Symptoms"],
            ["#prevention", "Prevention"],
            ["#treatment", "Diagnosis & Treatment"],
            ["#trusted-resources", "Trusted Resources"],
            ["#faq", "FAQs"]
          ].map(([href, label]) => (
            <a key={href} href={href} className="block px-4 py-2 bg-white shadow hover:bg-blue-100 rounded">
              {label}
            </a>
          ))}
        </aside>

        {/* Content */}
        <main className="md:w-3/4 space-y-12">
          {/* Heart Section */}
          <section id="heart">
            <img
              className="w-full rounded mb-4"
              src="https://my.clevelandclinic.org/-/scassets/images/org/health/articles/21704-heart-overview-outside"
              alt="Heart Illustration"
            />
            <h2 className="text-2xl font-semibold mb-2">Understanding the Human Heart</h2>
            <p>The human heart is a muscular organ responsible for pumping blood throughout the body. It supplies oxygen and nutrients while removing waste products.</p>
            <h3 className="mt-4 font-bold">1. Structure of the Heart</h3>
            <ul className="list-disc pl-6">
              <li><strong>Right Atrium:</strong> Receives oxygen-poor blood from the body.</li>
              <li><strong>Right Ventricle:</strong> Pumps blood to the lungs for oxygenation.</li>
              <li><strong>Left Atrium:</strong> Receives oxygen-rich blood from the lungs.</li>
              <li><strong>Left Ventricle:</strong> Pumps oxygenated blood to the rest of the body.</li>
            </ul>
            <p className="mt-2"><strong>The left ventricle</strong> is the strongest chamber because it pumps blood to the entire body.</p>

            <h3 className="mt-4 font-bold">2. How the Heart Works</h3>
            <ol className="list-decimal pl-6">
              <li>Deoxygenated blood enters the right atrium from the veins.</li>
              <li>It moves to the right ventricle and is pumped to the lungs.</li>
              <li>Oxygenated blood returns to the left atrium.</li>
              <li>The left ventricle pumps it through the <strong>aorta</strong> to supply the body.</li>
            </ol>

            <h3 className="mt-4 font-bold">3. The Heart’s Electrical System</h3>
            <p>The heart has an internal pacemaker called the <strong>sinoatrial (SA) node</strong>, which controls heartbeats by sending electrical signals.</p>

            <h3 className="mt-4 font-bold">4. Importance of Heart Health</h3>
            <ul className="list-disc pl-6">
              <li>A strong heart ensures proper oxygen supply to organs.</li>
              <li>Reduces the risk of strokes, heart attacks, and high blood pressure.</li>
              <li>Improves overall energy levels and brain function.</li>
            </ul>
          </section>

          {/* Other Sections */}
          <section id="introduction">
            <h2 className="text-2xl font-semibold mb-2">Introduction to Heart Disease</h2>
            <p>Heart disease refers to various conditions that affect the heart. It is a leading cause of death globally, but many cases can be prevented through lifestyle changes.</p>
          </section>

          <section id="causes">
            <h2 className="text-2xl font-semibold mb-2">Causes & Risk Factors</h2>
            <img className="rounded mb-4" src="https://media.istockphoto.com/id/1364371014/photo/risk-management-and-mitigation-to-reduce-exposure-for-financial-investment-projects.jpg?s=612x612&w=0&k=20&c=h_zHS6VCBJ7lvsp9NaPoaQxDOGo6tYOW826e3fipzRQ=" alt="Risk" />
            <ul className="list-disc pl-6">
              <li>Unhealthy diet (high in fats & cholesterol)</li>
              <li>Smoking and excessive alcohol consumption</li>
              <li>Lack of physical activity</li>
              <li>High blood pressure, diabetes, and high cholesterol</li>
              <li>Genetic factors & family history</li>
            </ul>
          </section>

          <section id="symptoms">
            <h2 className="text-2xl font-semibold mb-2">Symptoms & Warning Signs</h2>
            <ul className="list-disc pl-6">
              <li>Chest pain or discomfort</li>
              <li>Shortness of breath</li>
              <li>Dizziness or fatigue</li>
              <li>Irregular heartbeat</li>
              <li>Swelling in legs or abdomen</li>
            </ul>
          </section>

          <section id="prevention">
            <h2 className="text-2xl font-semibold mb-2">Prevention & Healthy Living</h2>
            <ul className="list-disc pl-6">
              <li>Eat a balanced diet with fruits, vegetables, and whole grains</li>
              <li>Exercise regularly (at least 30 minutes a day)</li>
              <li>Avoid smoking and limit alcohol consumption</li>
              <li>Manage stress through relaxation techniques</li>
              <li>Regular health check-ups to monitor blood pressure & cholesterol</li>
            </ul>
          </section>

          <section id="treatment">
            <h2 className="text-2xl font-semibold mb-2">Diagnosis & Treatment</h2>
            <ul className="list-disc pl-6">
              <li>Medications to control blood pressure and cholesterol</li>
              <li>Lifestyle changes like improved diet and exercise</li>
              <li>Medical procedures like angioplasty or bypass surgery in severe cases</li>
            </ul>
          </section>

          <section id="trusted-resources">
            <h2 className="text-2xl font-semibold mb-2">📚 Trusted Resources for Heart Knowledge</h2>
            <ul className="list-disc pl-6">
              <li><a className="text-blue-600 hover:underline" href="https://www.who.int/health-topics/cardiovascular-diseases" target="_blank" rel="noreferrer">🌍 WHO - Cardiovascular Diseases</a></li>
              <li><a className="text-blue-600 hover:underline" href="https://www.heart.org/en" target="_blank" rel="noreferrer">❤️ American Heart Association (AHA)</a></li>
              <li><a className="text-blue-600 hover:underline" href="https://www.cdc.gov/heartdisease/" target="_blank" rel="noreferrer">🏥 CDC - Heart Disease</a></li>
              <li><a className="text-blue-600 hover:underline" href="https://www.nhlbi.nih.gov/health-topics/heart-disease" target="_blank" rel="noreferrer">🧬 National Heart, Lung, and Blood Institute</a></li>
              <li><a className="text-blue-600 hover:underline" href="https://www.mayoclinic.org/diseases-conditions/heart-disease" target="_blank" rel="noreferrer">🏥 Mayo Clinic</a></li>
              <li><a className="text-blue-600 hover:underline" href="https://www.nhs.uk/conditions/coronary-heart-disease/" target="_blank" rel="noreferrer">🇬🇧 NHS - Coronary Heart Disease</a></li>
            </ul>
          </section>

          {/* FAQ Section */}
          <section id="faq">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions (FAQs)</h2>
            {[
              {
                id: 1,
                question: "What are the early signs of heart disease?",
                answer: "Early signs include chest pain, shortness of breath, and irregular heartbeat.",
              },
              {
                id: 2,
                question: "How can I reduce my risk of heart disease?",
                answer: "A healthy diet, regular exercise, and quitting smoking significantly reduce heart disease risk.",
              },
            ].map((faq) => (
              <div key={faq.id} className="border rounded mb-2">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 font-medium"
                >
                  {faq.question}
                </button>
                {openFAQ === faq.id && (
                  <div className="px-4 py-2 bg-white">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2025 Heart Disease Prediction. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Knowledge;
