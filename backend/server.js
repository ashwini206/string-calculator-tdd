const express = require('express');
const app = express();
app.use(express.json());

app.post('/add', (req, res) => {
    const numbers = req.body.numbers || "";
    if (!numbers) return res.status(200).send({ sum: 0 });
});

module.exports = app;
