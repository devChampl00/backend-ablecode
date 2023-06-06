const fs = require('fs');

function getBooks() {
    const books = fs.readFileSync('data/books.json', 'utf-8');
    return JSON.parse(books);
}

function storeBook(req) {
    const books = getBooks();
    const newBooks = books.push(req.body);

    const newData = JSON.stringify(newBooks);
    return fs.writeFileSync('data/books.json', newData);
}
module.exports = { getBooks, storeBook };

fs.writeFileSync();
