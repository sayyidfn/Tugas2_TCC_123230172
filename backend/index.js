<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const noteRoutes = require("./routes/notes");
const sequelize = require("./config/database"); // Tambahkan ini

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routing
app.use("/", noteRoutes);

// Jalankan Server setelah Sinkronisasi Database
// .sync() akan membuatkan tabel secara otomatis jika belum ada
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server backend berjalan di port ${port}`);
  });
}).catch(err => {
  console.error("Gagal sinkronisasi database:", err);
=======
// Import Package dan File
const express = require("express");
const sequelize = require("./config/database");
const notesRoutes = require("./routes/noteRoutes");

// Inisialisasi Express dan Cors
const app = express();
const cors = require("cors");

// Izinkan origin frontend lokal yang umum dipakai saat development
app.use(cors({
  origin: ['http://localhost', 'http://localhost:5173', 'http://127.0.0.1:5500', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route dasar untuk testing
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: 'Selamat datang di Notes API!',
    endpoints: {
      'GET /api/notes': 'Lihat semua catatan',
      'GET /api/notes/:id': 'Lihat detail catatan',
      'POST /api/notes': 'Tambah catatan baru',
      'PUT /api/notes/:id': 'Edit catatan',
      'DELETE /api/notes/:id': 'Hapus catatan'
    }
  });
});

// Setting Routes
require("./schema/noteSchema"); // Untuk generate Tabel Notes
app.use("/api/notes", notesRoutes); // Untuk setting routes notes

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server',
    error: err.message
  });
});

// Sync Database dan Jalankan Server
const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
  console.log("✅ Database synced");
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
>>>>>>> ae5d0010c0e295808e32fff7804d39f61f9e591c
});
