const NoteModel = require("../models/noteModel");

exports.getNotes = async (req, res) => {
  try {
    const notes = await NoteModel.findAll();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createNote = async (req, res) => {
  try {
    // Menyesuaikan field dari frontend (title & note) ke database (judul & isi)
    // Jika frontend sudah mengirimkan 'judul' dan 'isi', kamu cukup pakai: const data = req.body;
    const data = {
      judul: req.body.title || req.body.judul,
      isi: req.body.note || req.body.isi,
      tanggal_dibuat: new Date()
    };

    const newNote = await NoteModel.create(data);
    res.json({ message: "Catatan berhasil ditambahkan", id: newNote.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const data = {
      judul: req.body.title || req.body.judul,
      isi: req.body.note || req.body.isi,
    };

    await NoteModel.updateById(req.params.id, data);
    res.json({ message: "Catatan berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await NoteModel.deleteById(req.params.id);
    res.json({ message: "Catatan berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
