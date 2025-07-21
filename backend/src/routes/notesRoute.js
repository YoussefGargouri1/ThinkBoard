// import express from 'express';
const express = require('express');

const notesController = require('../Controllers/notesController.js');

const router = express.Router();

router.get('/', notesController.getAllNotes);
router.get('/:id' , notesController.getNoteById);
 
router.post('/', notesController.createNote);

router.put('/:id', notesController.updateNote);

router.delete('/:id', notesController.deleteNote); 

module.exports = router;
