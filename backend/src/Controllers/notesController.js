import Note from '../models/Note.js'; // Importing the Note model

async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // Fetch all notes sorted by creation date newest first
        res.status(200).json(notes);
    }
    catch (error) {
        console.error(`Error in getAllNotes controller: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

async function createNote(req, res) {
    try{
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json(newNote);
    }
    catch (error) {
        console.error(`Error in createNote controller: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

async function updateNote(req, res) {
    try{
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content } , { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(updatedNote);
    }
    catch (error) {
        console.error(`Error in updateNote controller: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: `Note with id ${req.params.id} deleted successfully` });
    } catch (error) {
        console.error(`Error in deleteNote controller: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}


async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    }
    catch (error) {
        console.error(`Error in getNoteById controller: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

export default {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    getNoteById
}; // Exporting the controller functions to be used in the notes route