const db = require('../config/db');

// Get all loans
exports.getAllLoans = (req, res) => {
  const query = 'SELECT * FROM peminjaman';

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data peminjaman', error: err });
    }
    res.status(200).json({
      message: 'Data peminjaman berhasil diambil',
      data: result.rows
    });
  });
};

// Create a new loan
exports.createLoan = (req, res) => {
  const { id_buku, id_anggota, tanggal_peminjaman, tanggal_pengembalian } = req.body;
  const query = `
    INSERT INTO peminjaman (id_buku, id_anggota, tanggal_peminjaman, tanggal_pengembalian)
    VALUES ($1, $2, $3, $4) RETURNING *
  `;

  db.query(query, [id_buku, id_anggota, tanggal_peminjaman, tanggal_pengembalian], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal membuat data peminjaman', error: err });
    }
    res.status(201).json({
      message: 'Data peminjaman berhasil dibuat',
      data: result.rows[0]
    });
  });
};

// Update loan status
exports.updateLoanStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const query = 'UPDATE peminjaman SET status = $1 WHERE id = $2 RETURNING *';

  db.query(query, [status, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal memperbarui status peminjaman', error: err });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data peminjaman tidak ditemukan' });
    }
    res.status(200).json({
      message: 'Status peminjaman berhasil diperbarui',
      data: result.rows[0]
    });
  });
};
