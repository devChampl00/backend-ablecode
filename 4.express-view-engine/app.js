const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
const { getBooks, storeBook } = require('./utilities/book');

// menggunakan ejs
app.set('view engine', 'ejs');

// menggunakan ejs layout
app.use(expressLayouts);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        layout: 'layouts/main',
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact',
        layout: 'layouts/main',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        layout: 'layouts/main',
    });
});

app.get('/books', (req, res) => {
    const books = getBooks();
    res.render('book/index', {
        title: 'Data Buku',
        layout: 'layouts/main',
        books,
    });
});

app.get('/books/create', (req, res) => {
    res.render('book/create', {
        title: 'Buat Data',
        layout: 'layouts/main',
    });
});

app.post('/books', (req, res) => {
    res.send(storeBook(req, res));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
