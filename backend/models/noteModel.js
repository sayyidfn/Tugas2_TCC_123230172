const db = require("../config/database");

const Note = {
  // Mengambil semua data notes
  getAll: (callback) => {
    db.query("SELECT * FROM notes", callback);
  },

  // Menambahkan note baru
  create: (data, callback) => {
    db.query(
      "INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)",
      [data.title, data.datetime, data.note],
      callback,
    );
  },

  // Mengubah note berdasarkan ID
  update: (id, data, callback) => {
    db.query(
      "UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?",
      [data.title, data.datetime, data.note, id],
      callback,
    );
  },

  // Menghapus note berdasarkan ID
  delete: (id, callback) => {
    db.query("DELETE FROM notes WHERE id = ?", [id], callback);
  },
};

module.exports = Note;
