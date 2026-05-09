const Note = require("../schema/noteSchema");

const NoteModel = {
  // Ambil semua catatan
  getAllNotes: () => {
    return Note.findAll({
      order: [['tanggal_dibuat', 'DESC']]
    });
  },

  // Ambil catatan berdasarkan ID
  getNoteById: (id) => {
    return Note.findByPk(id);
  },

  // Tambah catatan baru
  createNote: (judul, isi) => {
    return Note.create({ judul, isi });
  },

  // Update catatan
  updateNote: (id, judul, isi) => {
    return Note.update(
      { judul, isi },
      { where: { id } }
    );
  },

  // Hapus catatan
  deleteNote: (id) => {
    return Note.destroy({ where: { id } });
  }
};

module.exports = NoteModel;
