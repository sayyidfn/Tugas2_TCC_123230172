const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

// Daftar endpoint API Anda
router.get("/notes", noteController.getNotes);
router.post("/notes", noteController.createNote);
router.get("/notes/:id", noteController.getNoteById);
router.put("/notes/:id", noteController.updateNote);
router.delete("/notes/:id", noteController.deleteNote);

module.exports = router;
