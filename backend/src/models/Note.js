import mongoose from 'mongoose';
// 1- create a schema for the Note model
// 2- create a model using the schema

const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },
    },

    { timestamps: true },
    // Automatically add createdAt and updatedAt fields 
    
);

const Note = mongoose.model('Note', noteSchema);

export default Note;