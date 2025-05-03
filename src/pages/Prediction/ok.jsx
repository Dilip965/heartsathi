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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-3xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Heart Disease Predictor
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <input
            type="number"
            name="Age"
            placeholder="Age"
            value={formData.Age}
            onChange={handleChange}
            className="input-style"
            required
          />

          <div className="flex items-center space-x-4">
            <label className="text-gray-700">Gender:</label>
            <label><input type="radio" name="Gender" value="M" onChange={handleChange} required /> Male</label>
            <label><input type="radio" name="Gender" value="F" onChange={handleChange} required /> Female</label>
          </div>

          <select name="ChestPainType" value={formData.ChestPainType} onChange={handleChange} required className="input-style">
            <option value="">Chest Pain Type</option>
            <option value="TA">Typical Angina</option>
            <option value="ATA">Atypical Angina</option>
            <option value="NAP">Non-Anginal Pain</option>
            <option value="ASY">Asymptomatic</option>
          </select>

          <input type="number" name="RestingBP" placeholder="Resting BP" value={formData.RestingBP} onChange={handleChange} className="input-style" required />
          <input type="number" name="Cholesterol" placeholder="Cholesterol" value={formData.Cholesterol} onChange={handleChange} className="input-style" required />
          <input type="number" name="FastingBS" placeholder="Fasting BS (1/0)" value={formData.FastingBS} onChange={handleChange} className="input-style" required />
          <select name="RestECG" value={formData.RestECG} onChange={handleChange} className="input-style" required>
            <option value="">Rest ECG</option>
            <option value="0">Normal</option>
            <option value="1">ST-T Abnormality</option>
            <option value="2">Left Ventricular Hypertrophy</option>
          </select>
          <input type="number" name="MaxHR" placeholder="Max HR" value={formData.MaxHR} onChange={handleChange} className="input-style" required />
          
          <div className="flex items-center space-x-4">
            <label className="text-gray-700">Exercise Angina:</label>
            <label><input type="radio" name="ExerciseAngina" value="Y" onChange={handleChange} required /> Yes</label>
            <label><input type="radio" name="ExerciseAngina" value="N" onChange={handleChange} required /> No</label>
          </div>

          <input type="number" step="0.1" name="Oldpeak" placeholder="Oldpeak" value={formData.Oldpeak} onChange={handleChange} className="input-style" required />
          <select name="Slope" value={formData.Slope} onChange={handleChange} className="input-style" required>
            <option value="">Slope</option>
            <option value="0">Upsloping</option>
            <option value="1">Flat</option>
            <option value="2">Downsloping</option>
          </select>
          <input type="number" name="CA" placeholder="Number of Major Vessels (0–3)" value={formData.CA} onChange={handleChange} className="input-style" required />
          <select name="Thal" value={formData.Thal} onChange={handleChange} className="input-style" required>
            <option value="">Thal</option>
            <option value="0">Normal</option>
            <option value="1">Fixed Defect</option>
            <option value="2">Reversible Defect</option>
          </select>

          <button
            type="submit"
            className="col-span-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mt-4"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-green-100 text-green-800">
            <h4 className="font-semibold text-lg">Prediction Result</h4>
            <p><strong>Prediction:</strong> {result.prediction === 1 ? "Heart Disease" : "No Heart Disease"}</p>
            <p><strong>Probability:</strong> {(result.probability * 100).toFixed(2)}%</p>
            <p><strong>Statement:</strong> {result.statement}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeartPredictionForm;
