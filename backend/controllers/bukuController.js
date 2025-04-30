const db = require('../config/db');

// Get all books
exports.getAllBooks = (req, res) => {
  const query = 'SELECT * FROM buku';

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data buku', error: err });
    }
    res.status(200).json({
      message: 'Data buku berhasil diambil',
      data: result.rows
    });
  });
};

// Create a new book
exports.createBook = (req, res) => {
  const { judul, pengarang, isbn, stok_tersedia } = req.body;
  const query = 'INSERT INTO buku (judul, pengarang, isbn, stok_tersedia) VALUES ($1, $2, $3, $4) RETURNING *';

  db.query(query, [judul, pengarang, isbn, stok_tersedia], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal menambahkan buku', error: err });
    }
    res.status(201).json({
      message: 'Buku berhasil ditambahkan',
      data: result.rows[0]
    });
  });
};

// Get book by ID
exports.getBookById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM buku WHERE id = $1';

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal mengambil data buku', error: err });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
    res.status(200).json({
      message: 'Data buku berhasil diambil',
      data: result.rows[0]
    });
  });
};
