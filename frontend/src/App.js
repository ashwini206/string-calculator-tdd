import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/add', { numbers });
      setResult(res.data.sum);
      setError("");
    } catch (err) {
      // Check if err.response exists before trying to access err.response.data
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("An unexpected error occurred");
      }
      setResult(null);
    }
  };
  
  

  return (
    <div style={{ margin: "50px" }}>
      <h1>String Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          placeholder="Enter numbers (comma or newline separated)"
          style={{ width: "300px", padding: "10px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "10px" }}>Calculate Sum</button>
      </form>
      {result !== null && (
        <h2 style={{ marginTop: "20px", color: "green" }}>Sum: {result}</h2>
      )}
      {error && (
        <p style={{ marginTop: "20px", color: "red" }}>Error: {error}</p>
      )}
    </div>
  );
};

export default App;
