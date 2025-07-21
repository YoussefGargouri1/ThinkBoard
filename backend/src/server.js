const express = require('express');

// import notesRoute from './routes/notesRoute.js';
const notesRoute = require('./routes/notesRoute.js');

const { connectDB } = require('./config/db.js'); 

const rateLimiter = require('./middleware/rateLimiter.js'); 

const dotenv = require('dotenv'); 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


const cors = require('cors'); 
app.use(cors(
    {origin: 'http://localhost:5173', }
)); 



app.use(express.json()); // Middleware to parse JSON request bodies

app.use(rateLimiter); // Apply rate limiting middleware


app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); // Call the next middleware or route handler
});

app.use("/api/notes", notesRoute);


connectDB().then( () => {

    app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
    })

});