const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Note } = require('../models');
const { JWT_SECRET_KEY } = process.env;

class noteController {
    static getNotes = async (req, res) => {
        const user = req.user;
        res.send('Selamat datang di rumah!' + user.email);
    };
}

module.exports = noteController;
