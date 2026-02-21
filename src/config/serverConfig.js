const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_DB_URL,
    REDIS_URI: process.env.REDIS_URL,
    JWT_SECRET: process.env.JWT_SECRET,
};
