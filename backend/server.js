const express = require('express');
const cors = require('cors');

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

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
