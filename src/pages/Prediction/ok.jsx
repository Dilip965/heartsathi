import React, { useState } from "react";
import axios from "axios";

// Placeholder components for visualization — Replace with real components
const HealthyHeart = () => <div className="text-green-600 mt-2">✅ Your heart is healthy!</div>;
const EarlyStage = () => <div className="text-yellow-500 mt-2">⚠️ Early signs of heart disease. Please consult a doctor.</div>;
const MiddleStage = () => <div className="text-orange-500 mt-2">⚠️ Moderate risk. Medical attention advised.</div>;
const AdvancedStage = () => <div className="text-orange-600 mt-2">⚠️ High risk. Immediate evaluation needed.</div>;
const SevereStage = () => <div className="text-red-600 mt-2">🚨 Critical condition! Seek emergency care.</div>;

const HeartDiseasePrediction = () => {
  const defaultFormData = {
    Age: 50,
    Gender: 1,
    ChestPainType: 2,
    RestingBP: 130,
    Cholesterol: 240,
    FastingBS: 0,
    RestECG: 1,
    MaxHR: 160,
    ExerciseAngina: 0,
    Oldpeak: 1.2,
    Slope: 1,
    CA: 0,
    Thal: 2,
  };

  const prediction_statements = {
    0: "No heart disease detected. Your heart health appears to be good. Continue maintaining a healthy lifestyle.",
    1: "Mild heart disease detected. Consider consulting a healthcare provider for preventive measures.",
    2: "Moderate heart disease detected. Please schedule an appointment with a cardiologist for further evaluation.",
    3: "Severe heart disease detected. Urgent medical attention required. Please visit a healthcare facility immediately.",
    4: "Critical heart disease detected. Emergency medical attention required. Please seek immediate medical care.",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "Oldpeak" ? parseFloat(value) : parseInt(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await axios.post(
        "https://heartsathi-backend.onrender.com/predict",
        formData
      );
      setPrediction(response.data);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
        🫀 Heart Disease Prediction
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Age", name: "Age", type: "number" },
          {
            label: "Gender",
            name: "Gender",
            type: "select",
            options: { 1: "Male", 0: "Female" },
          },
          {
            label: "Chest Pain Type",
            name: "ChestPainType",
            type: "select",
            options: {
              0: "Typical Angina",
              1: "Atypical Angina",
              2: "Non-Anginal Pain",
              3: "Asymptomatic",
            },
          },
          { label: "Resting BP", name: "RestingBP", type: "number" },
          { label: "Cholesterol", name: "Cholesterol", type: "number" },
          {
            label: "Fasting Blood Sugar",
            name: "FastingBS",
            type: "select",
            options: {
              0: "FBS > 120 mg/dl",
              1: "FBS < 120 mg/dl",
            },
          },
          {
            label: "Resting ECG",
            name: "RestECG",
            type: "select",
            options: {
              0: "Normal",
              1: "ST-T wave abnormality",
              2: "Left ventricular hypertrophy",
            },
          },
          { label: "Max Heart Rate", name: "MaxHR", type: "number" },
          {
            label: "Exercise Induced Angina",
            name: "ExerciseAngina",
            type: "select",
            options: { 0: "No", 1: "Yes" },
          },
          { label: "Oldpeak", name: "Oldpeak", type: "number", step: 0.1 },
          {
            label: "Slope of ST Segment",
            name: "Slope",
            type: "select",
            options: {
              0: "Upsloping",
              1: "Flat",
              2: "Downsloping",
            },
          },
          { label: "Number of Vessels (CA)", name: "CA", type: "number" },
          {
            label: "Thalassemia",
            name: "Thal",
            type: "select",
            options: {
              1: "Fixed Defect",
              2: "Reversible Defect",
              3: "Normal",
            },
          },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                {Object.entries(field.options).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                step={field.step || 1}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}

        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-200"
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>
      </form>

      {prediction && (
        <div className="mt-8 p-4 bg-gray-100 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🩺 Prediction Result</h3>
          <p className="text-gray-700">
            <strong>Status:</strong>{" "}
            {prediction_statements[prediction.prediction] || "Unknown"}
          </p>
          <p className="text-gray-700">
            <strong>Probability:</strong> {prediction.probability}
          </p>

          <div className="mt-4">
            {prediction.prediction === 0 && <HealthyHeart />}
            {prediction.prediction === 1 && prediction.probability <= 0.3 && <EarlyStage />}
            {prediction.prediction === 1 && prediction.probability > 0.3 && prediction.probability <= 0.6 && <MiddleStage />}
            {prediction.prediction === 1 && prediction.probability > 0.6 && prediction.probability <= 0.8 && <AdvancedStage />}
            {prediction.prediction === 1 && prediction.probability > 0.8 && <SevereStage />}
          </div>
        </div>
      )}

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default HeartDiseasePrediction;
