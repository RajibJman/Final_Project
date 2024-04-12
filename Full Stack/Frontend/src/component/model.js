import React, { useState } from 'react';
import axios from 'axios';

const PredictionForm = () => {
  const [moduleName, setModuleName] = useState('');
  const [traineeCount, setTraineeCount] = useState('');
  const [level, setLevel] = useState('');
  const [role, setRole] = useState('');
  const [predictedDuration, setPredictedDuration] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send in the POST request
    const inputData = {
      MODULE_NAME: moduleName,
      TRAINEE_COUNT: traineeCount,
      LEVEL: level,
      ROLE: role
    };

    try {
      // Make POST request to Flask backend
      const response = await axios.post('http://localhost:5000/predict', inputData);
      
      // Set predicted duration from response
      setPredictedDuration(response.data.predicted_duration);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      // Handle error gracefully (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>Predict Duration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Module Name:</label>
          <input type="text" value={moduleName} onChange={(e) => setModuleName(e.target.value)} required />
        </div>
        <div>
          <label>Trainee Count:</label>
          <input type="number" value={traineeCount} onChange={(e) => setTraineeCount(e.target.value)} required />
        </div>
        <div>
          <label>Level:</label>
          <input type="text" value={level} onChange={(e) => setLevel(e.target.value)} required />
        </div>
        <div>
          <label>Role:</label>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
        </div>
        <button type="submit">Predict</button>
      </form>

      {predictedDuration !== null && (
        <div>
          <h3>Predicted Duration:</h3>
          <p>{predictedDuration}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
