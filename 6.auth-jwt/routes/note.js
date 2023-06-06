const express = require('express'),
    router = express.Router(),
    verifytoken = require('../middleware/verifytoken'),
    noteHandler = require('../controllers/NoteController');

router.get('/', verifytoken, noteHandler.index);
router.post('/', verifytoken, noteHandler.store);
router.get('/:id', verifytoken, noteHandler.show);
router.put('/:id', verifytoken, noteHandler.update);
router.delete('/:id', verifytoken, noteHandler.delete);

module.exports = router;
