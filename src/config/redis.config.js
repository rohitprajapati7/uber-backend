const redis = require("redis");
const ServerConfig = require("./serverConfig");

let redisClient;

async function connectRedis() {
    try {
        redisClient = redis.createClient({
            url: ServerConfig.REDIS_URI,
        });

        redisClient.on("connect", () => {
            console.log("Connected to redis");
        });

        redisClient.on("error", (err) => {
            console.log("Redis connection error", err);
        });

        await redisClient.connect();
    } catch (error) {
        console.log("Error while connecting to redis:", error);
    }
}

function getRedisClient() {
    return redisClient;
}

module.exports = { connectRedis, getRedisClient };
