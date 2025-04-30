const db = require('../config/db');

// Get all users
exports.getAllPengguna = (req, res) => {
  const query = 'SELECT * FROM pengguna';

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data pengguna', error: err });
    }
    res.status(200).json({
      message: 'Data pengguna berhasil diambil',
      data: result.rows
    });
  });
};

// Create new user
exports.createUser = (req, res) => {
  const { username, password_hash, peran } = req.body;
  const query = 'INSERT INTO pengguna (username, password_hash, peran) VALUES ($1, $2, $3) RETURNING *';

  db.query(query, [username, password_hash, peran], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal menambahkan pengguna', error: err });
    }
    res.status(201).json({
      message: 'Pengguna berhasil ditambahkan',
      data: result.rows[0]
    });
  });
};

// Get user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM pengguna WHERE id = $1';

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal mengambil data pengguna', error: err });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
    res.status(200).json({
      message: 'Data pengguna berhasil diambil',
      data: result.rows[0]
    });
  });
};

exports.updateUser = (req, res) => {
  const { username, password_hash, peran } = req.body;
  db.query('UPDATE pengguna SET username = $1, password_hash = $2, peran = $3 WHERE id = $4 RETURNING *',
    [username, password_hash, peran, req.params.id], (err, result) => {
      if (err) return res.status(500).json({ message: 'Gagal mengupdate pengguna', error: err });
      if (result.rows.length === 0) return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      res.status(200).json({ message: 'Pengguna diperbarui', data: result.rows[0] });
    });
};

exports.deleteUser = (req, res) => {
  db.query('DELETE FROM pengguna WHERE id = $1 RETURNING *', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menghapus pengguna', error: err });
    if (result.rows.length === 0) return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    res.status(200).json({ message: 'Pengguna dihapus', data: result.rows[0] });
  });
};
