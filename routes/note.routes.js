const express = require('express');
const { body } = require('express-validator');
const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require('../controllers/note.controller');

const validate = require('../validators/note.validator');

const router = express.Router();

router.post('/notes', validate, createNote);
router.get('/notes', getAllNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', validate, updateNote);
router.delete('/notes/:id', deleteNote);

module.exports = router;
