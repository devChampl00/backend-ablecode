const express = require('express');
const router = express.Router();
const noteHandler = require('../controllers/NoteController');
const verifytoken = require('../middleware/verifytoken');

router.get('/note', verifytoken, noteHandler.getNotes);

module.exports = router;
