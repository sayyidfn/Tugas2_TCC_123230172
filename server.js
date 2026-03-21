const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("Server aplikasi notes berjalan dengan baik");
});

// 1. Tambah Catatan
app.post("/notes", (req, res) => {
  const { judul, isi } = req.body;
  const sql = "INSERT INTO notes (judul, isi) VALUES (?, ?)";

  db.query(sql, [judul, isi], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: "Catatan berhasil ditambahkan",
      id: result.insertId,
    });
  });
});

// 2. Lihat catatan (Sudah diperbaiki)
app.get("/notes", (req, res) => {
  const sql = "SELECT * FROM notes ORDER BY tanggal_dibuat DESC";

  // Parameter diubah menjadi (err, results)
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// 3. Edit catatan (Sudah diperbaiki URL-nya)
app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { judul, isi } = req.body;
  const sql = "UPDATE notes SET judul = ?, isi = ? WHERE id = ?";

  db.query(sql, [judul, isi, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Catatan tidak ditemukan" });

    res.status(200).json({ message: "Catatan berhasil diupdate" });
  });
});

// 4. Hapus catatan (Sudah diperbaiki URL-nya)
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM notes WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Catatan tidak ditemukan" });

    res.status(200).json({ message: "Catatan berhasil dihapus" });
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
