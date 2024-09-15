const express = require('express');
const app = express();
app.use(express.json());

app.post('/add', (req, res) => {
    const numbers = req.body.numbers || "";
    const numArray = numbers.split(/,|\n/).map(Number);
    const sum = numArray.reduce((acc, num) => acc + num, 0);
    res.status(200).send({ sum });
});

module.exports = app;
