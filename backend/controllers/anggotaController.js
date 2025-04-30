const db = require('../config/db');

// Get all members
exports.getAllMembers = (req, res) => {
  const query = 'SELECT * FROM anggota';

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data anggota', error: err });
    }
    res.status(200).json({
      message: 'Data anggota berhasil diambil',
      data: result.rows
    });
  });
};

// Create new member
exports.createMember = (req, res) => {
  const { user_id, nama, tanggal_keanggotaan } = req.body;
  const query = 'INSERT INTO anggota (user_id, nama, tanggal_keanggotaan) VALUES ($1, $2, $3) RETURNING *';

  db.query(query, [user_id, nama, tanggal_keanggotaan], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal menambahkan anggota', error: err });
    }
    res.status(201).json({
      message: 'Anggota berhasil ditambahkan',
      data: result.rows[0]
    });
  });
};

// Get member by ID
exports.getMemberById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM anggota WHERE id = $1';

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal mengambil data anggota', error: err });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Anggota tidak ditemukan' });
    }
    res.status(200).json({
      message: 'Data anggota berhasil diambil',
      data: result.rows[0]
    });
  });
};

exports.updateMember = (req, res) => {
  const { user_id, nama, tanggal_keanggotaan } = req.body;
  db.query('UPDATE anggota SET user_id = $1, nama = $2, tanggal_keanggotaan = $3 WHERE id = $4 RETURNING *',
    [user_id, nama, tanggal_keanggotaan, req.params.id], (err, result) => {
      if (err) return res.status(500).json({ message: 'Gagal update', error: err });
      if (result.rows.length === 0) return res.status(404).json({ message: 'Tidak ditemukan' });
      res.status(200).json({ data: result.rows[0] });
    });
};

exports.deleteMember = (req, res) => {
  db.query('DELETE FROM anggota WHERE id = $1 RETURNING *', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal delete', error: err });
    if (result.rows.length === 0) return res.status(404).json({ message: 'Tidak ditemukan' });
    res.status(200).json({ data: result.rows[0] });
  });
};