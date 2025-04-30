const express = require('express');
const router = express.Router();
const peminjamanController = require('../controllers/peminjamanController');

router.get('/peminjaman', peminjamanController.getAllLoans);
router.post('/peminjaman', peminjamanController.createLoan);
router.put('/peminjaman/:id', peminjamanController.updateLoanStatus);

module.exports = router;
