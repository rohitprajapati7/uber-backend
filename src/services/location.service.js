const { getRedisClient } = require("../config/redis.config");

class LocationService {
    async setDriverSocket(driverId, socketId) {
        const client = getRedisClient();
        if (client) await client.set(`driver:${driverId}`, socketId);
    }

    async getDriverSocket(driverId) {
        const client = getRedisClient();
        if (!client) return null;
        return await client.get(`driver:${driverId}`);
    }

    async deleteDriverSocket(driverId) {
        const client = getRedisClient();
        if (client) await client.del(`driver:${driverId}`);
    }
}

module.exports = new LocationService();
