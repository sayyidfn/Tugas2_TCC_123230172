<<<<<<< HEAD
// Ambil file schema yang kamu buat sebelumnya
const Note = require("../schema/noteSchema"); // Pastikan nama file/foldernya sesuai ya

const findAll = async () => {
  return await Note.findAll({
    order: [["tanggal_dibuat", "DESC"]], // Mengurutkan dari yang terbaru
  });
};

const create = async (noteData) => {
  return await Note.create(noteData);
};

const findById = async (id) => {
  return await Note.findByPk(id);
};

const updateById = async (id, noteData) => {
  return await Note.update(noteData, {
    where: { id: id },
  });
};

const deleteById = async (id) => {
  return await Note.destroy({
    where: { id: id },
  });
};

module.exports = {
  findAll,
  create,
  findById,
  updateById,
  deleteById,
};
=======
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
>>>>>>> ae5d0010c0e295808e32fff7804d39f61f9e591c
