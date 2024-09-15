const express = require('express');
const app = express();
app.use(express.json());

app.post('/add', (req, res) => {
    const numbers = req.body.numbers || "";

    let delimiter = /,|\n/;
    if (numbers.startsWith('//')) {
        const parts = numbers.split('\n');
        delimiter = new RegExp(parts[0].substring(2));
        numbers = parts[1];
    }

    const numArray = numbers.split(delimiter).map(Number);
    const sum = numArray.reduce((acc, num) => acc + num, 0);
    res.status(200).send({ sum });
});


module.exports = app;
