const { Ratelimit } = require('@upstash/ratelimit');
const { Redis } = require('@upstash/redis');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const redis = Redis.fromEnv(); // Create a Redis client using environment variables

const ratelimit = new Ratelimit({
    redis,
    limiter : Ratelimit.slidingWindow(100, "60 s"),
});

module.exports = ratelimit; // Export the ratelimiter instance for use in other parts of the application
