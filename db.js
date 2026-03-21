const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "34.170.208.149",
  user: "admin_notes",
  password: "TugasTcc2026!",
  database: "notes_db",
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi ke Cloud SQL gagal:", err);
    return;
  }
  console.log("Berhasil terhubung ke database Cloud SQL!");
});

module.exports = db;
