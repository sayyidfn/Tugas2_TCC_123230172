const NoteModel = require("../models/noteModel");

<<<<<<< HEAD
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

exports.getNoteById = async (req, res) => {
  try {
    const note = await NoteModel.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Catatan tidak ditemukan" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
=======
const NoteController = {
  // Ambil semua catatan
  getAllNotes: async (req, res) => {
    try {
      const notes = await NoteModel.getAllNotes();
      res.status(200).json(notes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Ambil catatan berdasarkan ID
  getNoteById: async (req, res) => {
    try {
      const { id } = req.params;
      const note = await NoteModel.getNoteById(id);
      if (!note) {
        return res.status(404).json({ message: "Catatan tidak ditemukan" });
      }
      res.status(200).json(note);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Tambah catatan baru
  createNote: async (req, res) => {
    try {
      const { judul, isi } = req.body;
      const newNote = await NoteModel.createNote(judul, isi);
      res.status(201).json({
        message: "Catatan berhasil ditambahkan",
        id: newNote.id,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update catatan
  updateNote: async (req, res) => {
    try {
      const { id } = req.params;
      const { judul, isi } = req.body;
      
      const [updated] = await NoteModel.updateNote(id, judul, isi);
      
      if (!updated) {
        return res.status(404).json({ message: "Catatan tidak ditemukan" });
      }
      res.status(200).json({ message: "Catatan berhasil diupdate" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Hapus catatan
  deleteNote: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await NoteModel.deleteNote(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Catatan tidak ditemukan" });
      }
      res.status(200).json({ message: "Catatan berhasil dihapus" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = NoteController;
>>>>>>> ae5d0010c0e295808e32fff7804d39f61f9e591c
