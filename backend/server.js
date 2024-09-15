const express = require('express');
const app = express();
app.use(express.json());

app.post('/add', (req, res) => {
    const numbers = req.body.numbers || "";
    const delimiter = /,|\n/;
    const numArray = numbers.split(delimiter).map(Number);
    const negatives = numArray.filter(num => num < 0);

    if (negatives.length > 0) {
        return res.status(400).send(`Negative numbers not allowed: ${negatives.join(', ')}`);
    }

    const sum = numArray.reduce((acc, num) => acc + num, 0);
    res.status(200).send({ sum });
});

module.exports = app;
