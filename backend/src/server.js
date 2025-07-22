import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'; // Importing path to serve static files

import notesRoute from './routes/notesRoute.js';
import  connectDB  from './config/db.js'; // Importing the connectDB function
import rateLimiter from './middleware/rateLimiter.js'; // Importing the rate limiter middleware


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); // Get the current directory name 


if (process.env.NODE_ENV !== 'production') {
    app.use(cors(
        {origin: 'http://localhost:5173', }
    )); 
}

app.use(express.json()); // Middleware to parse JSON request bodies

app.use(rateLimiter); // Apply rate limiting middleware


app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); // Call the next middleware or route handler
});

app.use("/api/notes", notesRoute);



if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Frontend/dist'))); 
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../Frontend/dist/index.html')); // Serve the React app's index.html for all other routes
    });
}


connectDB().then( () => {

    app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
    })

});