const mongoose = require("mongoose");
const ServerConfig = require("../config/serverConfig");

async function connectMongo() {
    try {
        await mongoose.connect(ServerConfig.MONGO_URI);
        console.log("Mongodb connected successfully!");
    } catch (error) {
        console.log("Error while connecting to db..", error);
    }
}

module.exports = { connectMongo };
