const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const dotenv = require('dotenv');

// initialize the dotenv
dotenv.config();

// Getting the redis URL from .env
const redisUrl = process.env.REDIS_URL;

// Creating a Redis client using redisUrl
const client = redis.createClient(redisUrl);

// Promisifying Redis hget and hset methods for async/await support
client.hGet = util.promisify(client.hGet);
client.hSet = util.promisify(client.hSet);
// Promisify client.del for async/await support
client.del = util.promisify(client.del);

const exec = mongoose.Query.prototype.exec;

// Adding a cache method to mongoose Query prototype
mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');
    this.cacheExpire = options.expire || 30;  // Custom expiration time (default: 30 seconds)
    return this;
}

// Overriding the exec function to implement caching
mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments);  // Run the original exec if caching is not enabled
    }

    // Create a unique cache key by serializing the query and collection name
    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name,
        options: this.getOptions()  // Ensure query options like limit, skip, sort are included
    }));

    try {
        // Check if there is a cached value for the generated key in Redis
        const cacheValue = await client.hGet(this.hashKey, key);

        if (cacheValue) {
            const doc = JSON.parse(cacheValue);
            // Return the cached value, making sure it's properly converted into Mongoose models
            return Array.isArray(doc)
                ? doc.map(d => new this.model(d))
                : new this.model(doc);
        }

        // If no cache is found, execute the query on the database
        const result = await exec.apply(this, arguments);

        // Cache the result in Redis and set the expiration time
        await client.hSet(this.hashKey, key, JSON.stringify(result), 'EX', this.cacheExpire);

        return result;
    } catch (err) {
        console.error("Redis error:", err);
        // If there is a Redis error, fall back to executing the query normally
        return exec.apply(this, arguments);
    }
};

// Function to clear cache for a specific hashKey
const clearHash = async (hashKey) => {
    try {
        await client.del(JSON.stringify(hashKey));
        console.log(`Cache cleared for hashKey: ${hashKey}`);
    } catch (err) {
        console.error(`Failed to clear cache for hashKey: ${hashKey}`, err);
    }
};

// export out the clearHash Func
module.exports = {
    clearHash,
};