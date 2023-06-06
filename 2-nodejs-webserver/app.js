const fs = require('fs'); //file sistem
const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
    //membuat server
    const url = req.url; //mendapatkan url

    res.writeHead(200, {
        'Content-Type': 'text-html',
    }); //memberi status 200 ok pada halaman

    function renderHTML(path, res) {
        fs.readFile(path, (err, data) => {
            err ? res.writeHead(404).write('error: file not found') : res.write(data);
            res.end(); //mengakhiri respon server
        });
    } // membuat fungsi mengembalikan file html dengan parameter path url dan dan respone dari server

    switch (url) {
        case '/about':
            renderHTML('./pages/about.html', res);
            break; // mengembalikan file 'pages/about.html, dan jika tidak ada akan mengembalikan status 404
        case '/contact':
            renderHTML('./pages/contact.html', res);
            break; // mengembalikan file 'pages/contact.html, dan jika tidak ada akan mengembalikan status 404

        default:
            renderHTML('./pages/index.html', res);
            break; // mengembalikan file 'pages/index.html, dan jika tidak ada akan mengembalikan status 404
    } // route sederhana dengan percabangan switch case
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}...`); // pesan di konsol saad server berjalan
});
