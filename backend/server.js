const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const penggunaRoutes = require('./routes/penggunaRoutes');
const anggotaRoutes = require('./routes/anggotaRoutes');
const bukuRoutes = require('./routes/bukuRoutes');
const peminjamanRoutes = require('./routes/peminjamanRoutes');

app.use('/api', penggunaRoutes);
app.use('/api', anggotaRoutes);
app.use('/api', bukuRoutes);
app.use('/api', peminjamanRoutes);

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,    
  user: process.env.PGUSER, 
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE  
});

pool.connect()
  .then(client => {
    console.log('Terhubung ke database PostgreSQL');
    client.release(); 
  })
  .catch(err => {
    console.error('Gagal terhubung ke database PostgreSQL', err.stack);
  });

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

