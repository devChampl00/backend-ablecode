const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'latihan_nodejs_mysql',
});

module.exports = { db };
