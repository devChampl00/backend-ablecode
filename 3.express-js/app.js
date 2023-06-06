const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Ini Halaman Home</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>Ini Halaman About</h1>');
});

app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', { root: __dirname });
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404 page not found</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
