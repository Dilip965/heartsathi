import React, { useState } from 'react';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    Age: '',
    Gender: '',
    ChestPainType: '',
    RestingBP: '',
    Cholesterol: '',
    FastingBS: '',
    RestECG: '',
    MaxHR: '',
    ExerciseAngina: '',
    Oldpeak: '',
    Slope: '',
    CA: '',
    Thal: '',
  });

  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction('');

    const formattedData = {
      ...formData,
      Age: Number(formData.Age),
      Gender: Number(formData.Gender),
      ChestPainType: Number(formData.ChestPainType),
      RestingBP: Number(formData.RestingBP),
      Cholesterol: Number(formData.Cholesterol),
      FastingBS: Number(formData.FastingBS),
      RestECG: Number(formData.RestECG),
      MaxHR: Number(formData.MaxHR),
      ExerciseAngina: Number(formData.ExerciseAngina),
      Oldpeak: Number(formData.Oldpeak),
      Slope: Number(formData.Slope),
      CA: Number(formData.CA),
      Thal: Number(formData.Thal),
    };

    try {
      const response = await fetch('https://heartsathi-backend.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(data.prediction);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Error occurred while communicating with the server.');
    }
  };

  const dropdownOptions = {
    Gender: [
      { label: 'Male', value: 1 },
      { label: 'Female', value: 0 },
    ],
    ChestPainType: [
      { label: 'Typical Angina', value: 0 },
      { label: 'Atypical Angina', value: 1 },
      { label: 'Non-anginal Pain', value: 2 },
      { label: 'Asymptomatic', value: 3 },
    ],
    RestECG: [
      { label: 'Normal', value: 0 },
      { label: 'ST-T Wave Abnormality', value: 1 },
      { label: 'Left Ventricular Hypertrophy', value: 2 },
    ],
    ExerciseAngina: [
      { label: 'No', value: 0 },
      { label: 'Yes', value: 1 },
    ],
    Slope: [
      { label: 'Upsloping', value: 0 },
      { label: 'Flat', value: 1 },
      { label: 'Downsloping', value: 2 },
    ],
    Thal: [
      { label: 'Normal', value: 1 },
      { label: 'Fixed Defect', value: 2 },
      { label: 'Reversible Defect', value: 3 },
    ],
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Heart Disease Prediction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col">
                <label htmlFor={key} className="text-sm font-medium text-gray-600 capitalize mb-2">
                  {key.replace('_', ' ')}
                </label>
                {dropdownOptions[key] ? (
                  <select
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select {key}</option>
                    {dropdownOptions[key].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={key}
                    type="number"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md text-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Predict
          </button>
        </form>

        {prediction !== '' && (
          <div className="mt-6 text-xl text-center p-4 rounded-md shadow-md">
            {prediction === 0 && (
              <div className="text-green-600 bg-green-100 p-4 rounded-lg">
                <p className="text-2xl font-bold">✅ Low Risk</p>
                <p>You are likely <strong>not at risk</strong> of heart disease. Keep up the healthy lifestyle! 🎉</p>
              </div>
            )}
            {prediction === 1 && (
              <div className="text-yellow-700 bg-yellow-100 p-4 rounded-lg">
                <p className="text-2xl font-bold">⚠️ Mild Risk</p>
                <p>There is a <strong>mild risk</strong> of heart disease. Consider regular checkups and a healthy diet. 🩺</p>
              </div>
            )}
            {prediction === 2 && (
              <div className="text-orange-700 bg-orange-100 p-4 rounded-lg">
                <p className="text-2xl font-bold">🟠 Moderate Risk</p>
                <p>There is a <strong>moderate risk</strong> of heart disease. Please consult a doctor. ⚠️</p>
              </div>
            )}
            {prediction === 3 && (
              <div className="text-red-700 bg-red-100 p-4 rounded-lg">
                <p className="text-2xl font-bold">🚨 High Risk</p>
                <p>There is a <strong>high risk</strong> of heart disease. Medical attention is recommended. ❗</p>
              </div>
            )}
            {prediction === 4 && (
              <div className="text-red-800 bg-red-200 p-4 rounded-lg">
                <p className="text-2xl font-bold">🛑 Very High Risk</p>
                <p>There is a <strong>very high risk</strong> of heart disease. Seek urgent medical care immediately. 🚑</p>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600 text-center p-4 rounded-md shadow-md bg-red-100">
            <p className="text-lg font-semibold">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;
