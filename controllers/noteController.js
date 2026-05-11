const Note = require("../models/noteModel");

exports.getNotes = (req, res) => {
  Note.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.createNote = (req, res) => {
  Note.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Catatan berhasil ditambahkan", id: results.insertId });
  });
};

exports.updateNote = (req, res) => {
  Note.update(req.params.id, req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Catatan berhasil diperbarui" });
  });
};

exports.deleteNote = (req, res) => {
  Note.delete(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Catatan berhasil dihapus" });
  });
};
