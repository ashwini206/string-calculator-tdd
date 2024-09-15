// src/backend/server.js
const express = require('express');
const cors = require('cors'); // Import CORS middleware
const app = express();

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

app.post('/add', (req, res) => {
  let numbers = req.body.numbers || "";
  
  // Default delimiter is comma or newline
  let delimiter = /,|\n/;

  // Custom delimiter support
  if (numbers.startsWith('//')) {
    const parts = numbers.split('\n');
    delimiter = new RegExp(parts[0].substring(2));
    numbers = parts[1];
  }

  const numArray = numbers.split(delimiter).map(Number);
  const negatives = numArray.filter(num => num < 0);

  if (negatives.length > 0) {
    return res.status(400).send(`Negative numbers not allowed: ${negatives.join(', ')}`);
  }

  const sum = numArray.reduce((acc, num) => acc + num, 0);
  res.status(200).send({ sum });
});

module.exports = app;
