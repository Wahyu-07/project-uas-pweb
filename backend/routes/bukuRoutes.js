const express = require('express');
const router = express.Router();
const bukuController = require('../controllers/bukuController');

router.get('/buku', bukuController.getAllBooks);
router.post('/buku', bukuController.createBook);
router.get('/buku/:id', bukuController.getBookById);

module.exports = router;
