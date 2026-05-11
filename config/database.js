require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi ke Cloud SQL gagal:", err);
    return;
  }
  console.log("Berhasil terhubung ke database Cloud SQL!");
});

module.exports = db;
