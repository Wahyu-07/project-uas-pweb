const express = require('express');
const router = express.Router();
const penggunaController = require('../controllers/penggunaController');

router.get('/pengguna', penggunaController.getAllPengguna);
router.post('/pengguna', penggunaController.createUser);
router.get('/pengguna/:id', penggunaController.getUserById);
router.put('/pengguna/:id', penggunaController.updateUser);
router.delete('/pengguna/:id', penggunaController.deleteUser);

module.exports = router;
