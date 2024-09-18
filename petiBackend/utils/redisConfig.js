// Import Redis client creation method from redis package
const { createClient } = require('redis');

// Import dotenv to load environment variables
const dotenv = require('dotenv');

// Import CustomError class from custom error handling middleware
const { CustomError } = require('../middlewares/error');

// Configure dotenv to load variables from .env file
dotenv.config();

// Define the Redis client variable, initially undefined
let client;

// Function to initialize Redis client
const initRedisClient = async () => {
    // Check if the Redis client already exists
    // If it doesn't exist, create a new Redis client
    if (!client) {
        client = createClient(); // Create Redis client instance
        // Handle connection errors
        client.on("error", () => console.log("Error creating Redis client"));
    }
    try {
        // Attempt to connect the client to the Redis server
        await client.connect();
        console.log("connected to redis");
    } catch (error) {
        // Throw a custom error if the connection fails
        throw new CustomError("Error occurred while initializing Redis");
    }
};

// // Function to retrieve a value from Redis by key
// const getValue = async (key) => {
//     try {
//         // Get JSON data from Redis for the provided key
//         const value = await client.json.get(`user:${key}`);
//         return value; // Return the retrieved value
//     } catch (error) {
//         // Throw a custom error if retrieval fails
//         throw new CustomError("Error occurred while getting value from key:", key);
//     }
// };

// Function to set a value in Redis with a given key
// const setValue = async (key, value) => {
//     try {
//         // Set JSON data in Redis for the provided key
//         const data = await client.json.set(`user:${key}`, "$", value);
//         return data; // Return the result of setting the data
//     } catch (error) {
//         // Throw a custom error if setting the value fails
//         throw new CustomError("Error occurred while setting value for key:", key);
//     }
// };

// Function to retrieve a value from Redis by key
const getValue = async (key) => {
    try {
        const value = await client.hGet('cache', key); // Get data from Redis
        return value ? JSON.parse(value) : null; // Parse JSON value
    } catch (error) {
        throw new CustomError("Error occurred while getting value from Redis", key);
    }
};

// Function to set a value in Redis with a given key
const setValue = async (key, value, expire = 30) => {
    try {
        await client.hSet('cache', key, JSON.stringify(value), 'EX', expire); // Set data in Redis with expiration
        return value;
    } catch (error) {
        throw new CustomError("Error occurred while setting value in Redis", key);
    }
};

// Function to clear cache for a specific key
const clearCache = async (key) => {
    try {
        await client.hDel('cache', key); // Delete specific key from Redis cache
        console.log(`Cache cleared for key: ${key}`);
    } catch (error) {
        console.error(`Failed to clear cache for key: ${key}`, error);
    }
};

// Function to clear all caches
const clearAllCaches = async () => {
    try {
        const keys = await client.hKeys('cache'); // Get all cache keys
        await Promise.all(keys.map(key => client.hDel('cache', key))); // Delete all cache keys
        console.log('All cache cleared');
    } catch (error) {
        console.error('Failed to clear all cache', error);
    }
};

// Export the functions for use in other modules
module.exports = {
    initRedisClient,
    getValue,
    setValue,
    clearCache,
    clearAllCaches
};