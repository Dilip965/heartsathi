import React, { useState } from "react";
import axios from "axios";

const HeartPredictionForm = () => {
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    ChestPainType: "",
    RestingBP: "",
    Cholesterol: "",
    FastingBS: "",
    RestECG: "",
    MaxHR: "",
    ExerciseAngina: "",
    Oldpeak: "",
    Slope: "",
    CA: "",
    Thal: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://heartsathi-backend.onrender.com/predict", formData);
      setResult(response.data);
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Heart Disease Prediction
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Age</label>
            <input
              type="number"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Enter age"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="Gender"
                  value="M"
                  onChange={handleChange}
                  required
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="Gender"
                  value="F"
                  onChange={handleChange}
                  required
                />
                Female
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Chest Pain Type</label>
            <select
              name="ChestPainType"
              value={formData.ChestPainType}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Chest Pain Type</option>
              <option value="TA">Typical Angina</option>
              <option value="ATA">Atypical Angina</option>
              <option value="NAP">Non-Anginal Pain</option>
              <option value="ASY">Asymptomatic</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Resting BP</label>
              <input
                type="number"
                name="RestingBP"
                value={formData.RestingBP}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                placeholder="Enter Resting BP"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Cholesterol</label>
              <input
                type="number"
                name="Cholesterol"
                value={formData.Cholesterol}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                placeholder="Enter Cholesterol"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Fasting BS (1/0)</label>
              <input
                type="number"
                name="FastingBS"
                value={formData.FastingBS}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                placeholder="Enter Fasting BS"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Rest ECG</label>
              <select
                name="RestECG"
                value={formData.RestECG}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Rest ECG</option>
                <option value="0">Normal</option>
                <option value="1">ST-T Abnormality</option>
                <option value="2">Left Ventricular Hypertrophy</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Max Heart Rate</label>
              <input
                type="number"
                name="MaxHR"
                value={formData.MaxHR}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                placeholder="Enter Max HR"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Exercise Angina</label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="ExerciseAngina"
                    value="Y"
                    onChange={handleChange}
                    required
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="ExerciseAngina"
                    value="N"
                    onChange={handleChange}
                    required
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Oldpeak</label>
              <input
                type="number"
                name="Oldpeak"
                value={formData.Oldpeak}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                placeholder="Enter Oldpeak"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Slope</label>
              <select
                name="Slope"
                value={formData.Slope}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Slope</option>
                <option value="0">Upsloping</option>
                <option value="1">Flat</option>
                <option value="2">Downsloping</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Number of Major Vessels</label>
              <input
                type="number"
                name="CA"
                value={formData.CA}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                placeholder="Enter CA"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Thal</label>
              <select
                name="Thal"
                value={formData.Thal}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Thal</option>
                <option value="0">Normal</option>
                <option value="1">Fixed Defect</option>
                <option value="2">Reversible Defect</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mt-6"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-green-100 text-green-800">
            <h4 className="font-bold">Prediction Result</h4>
            <p>{result.statement}</p>
            <p>Prediction: {result.prediction === 1 ? "Heart Disease" : "No Heart Disease"}</p>
            <p>Probability: {(result.probability * 100).toFixed(2)}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeartPredictionForm;
