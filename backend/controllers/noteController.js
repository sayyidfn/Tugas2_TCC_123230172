const NoteModel = require("../models/noteModel");

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
