const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',        
  host: 'localhost',
  database: 'db_peminjaman_buku', 
  password: '7325',       
  port: 5432,                     
});

pool.connect()
  .then(() => console.log('Koneksi ke database PostgreSQL berhasil'))
  .catch(err => console.error('Gagal koneksi database:', err));

module.exports = pool;

