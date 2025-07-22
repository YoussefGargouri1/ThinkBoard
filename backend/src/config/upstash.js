
import { Redis } from '@upstash/redis'; // Importing Redis client from Upstash
import { Ratelimit } from '@upstash/ratelimit'; // Importing Ratelimit class from Upstash
import dotenv from 'dotenv'; // Importing dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

const redis = Redis.fromEnv(); // Create a Redis client using environment variables

const ratelimit = new Ratelimit({
    redis,
    limiter : Ratelimit.slidingWindow(100, "60 s"),
});

export default ratelimit; // Exporting the rate limiter instance to be used in the middleware