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
});
