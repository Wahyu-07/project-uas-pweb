const { Pool } = require('pg');
const { Client } = require('pg');

const pool = new Pool({
  user: 'postgres',        
  host: '192.168.1.43',
  database: 'db_peminjaman_buku', 
  password: '7325',       
  port: 5432,                     
});

const client = new Client({
  host: '192.168.1.43',  // IP server PostgreSQL
  user: 'isanbegal',
  password: 'isanbegal',
  database: 'db_peminjaman_buku',
  port: 5432
});

client.connect()
  .then(() => console.log('Database connected!'))
  .catch(err => console.log('Database connection error', err));

pool.connect()
  .then(() => console.log('Koneksi ke database PostgreSQL berhasil'))
  .catch(err => console.error('Gagal koneksi database:', err));

module.exports = pool;

