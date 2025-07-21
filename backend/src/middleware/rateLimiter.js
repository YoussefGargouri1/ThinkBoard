const ratelimit = require("../config/upstash.js"); // Importing the rate limiter instance

const rateLimiter = async (req, res, next) => {
    try{
        const {success} = await ratelimit.limit("my-limit-key"); 

        if (!success) {
            return res.status(429).json({ message: "Too many requests, please try again later." });
        }
        next(); // Call the next middleware or route handler if the request is within the rate limit
    }
    catch (error) {
        console.error(`Error in rateLimiter middleware: ${error.message}`);
        next(error); // Pass the error to the next middleware for handling
    }
}


module.exports = rateLimiter; // ✅ CommonJS export