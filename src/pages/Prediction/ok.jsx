import React, { useState } from 'react';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    chest_pain: '',
    resting_bp: '',
    cholesterol: '',
    fasting_bs: '',
    rest_ecg: '',
    max_hr: '',
    exercise_angina: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
  });

  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction('');

    try {
      const response = await fetch('https://backend-1-idye.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
                <input
                  id={key}
                  type="number"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
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

        {prediction && <h3 className="mt-4 text-xl text-green-600 text-center">Prediction: {prediction}</h3>}
        {error && <h3 className="mt-4 text-xl text-red-600 text-center">Error: {error}</h3>}
      </div>
    </div>
  );
};

export default PredictionForm;
