const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    // Tetap menggunakan dialectOptions ssl karena ini wajib untuk Cloud SQL
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
);

sequelize.authenticate()
  .then(() => {
    console.log("Berhasil terhubung ke database Cloud SQL melalui Sequelize!");
  })
  .catch((err) => {
    console.error("Koneksi ke Cloud SQL gagal:", err);
  });

module.exports = sequelize;
