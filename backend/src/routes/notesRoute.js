// import express from 'express';
import express from 'express';

import notesController from '../Controllers/notesController.js'; // Importing the notes controller

const router = express.Router();

router.get('/', notesController.getAllNotes);
router.get('/:id' , notesController.getNoteById);

router.post('/', notesController.createNote);

router.put('/:id', notesController.updateNote);

router.delete('/:id', notesController.deleteNote); 

export default router; // Exporting the router to be used in the main server file