const express = require('express');
const router = express.Router();
const anggotaController = require('../controllers/anggotaController');

router.get('/anggota', anggotaController.getAllMembers);
router.post('/anggota', anggotaController.createMember);
router.get('/anggota/:id', anggotaController.getMemberById);
router.put('/anggota/:id', anggotaController.updateMember);
router.delete('/anggota/:id', anggotaController.deleteMember);

module.exports = router;
