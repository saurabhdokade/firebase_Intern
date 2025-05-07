const db = require('../config/firebase');
const { Timestamp } = require('firebase-admin/firestore');

const notesCollection = db.collection('notes');

// Create a new note
exports.createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const docRef = await notesCollection.add({
      title,
      content,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    res.status(201).json({ id: docRef.id,docRef, message: 'Note created successfully' });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get all notes
exports.getAllNotes = async (req, res, next) => {
  try {
    const snapshot = await notesCollection.get();

    const notes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get a single note by ID
exports.getNoteById = async (req, res, next) => {
  try {
    const noteDoc = await notesCollection.doc(req.params.id).get();

    if (!noteDoc.exists) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ id: noteDoc.id, ...noteDoc.data() });
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Update a note by ID
exports.updateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    await notesCollection.doc(req.params.id).update({
      title,
      content,
      updatedAt: Timestamp.now(),
    });

    res.status(200).json({ message: 'Note updated successfully' });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Delete a note by ID
exports.deleteNote = async (req, res, next) => {
  try {
    await notesCollection.doc(req.params.id).delete();

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
