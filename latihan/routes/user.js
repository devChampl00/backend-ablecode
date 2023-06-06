const express = require('express'),
    router = express.Router(),
    userHandler = require('../controllers/AuthController');

router.post('/register', userHandler.register);
router.post('/login', userHandler.login);

module.exports = router;
