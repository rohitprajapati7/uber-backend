const express = require("express");
const http = require("http");
const { ServerConfig, RedisConfig, DatabaseConfig } = require("./config");
const v1Routes = require("./routes");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const socketIo = require("socket.io");
const locationService = require("./services/location.service");

const io = socketIo(server);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/api", v1Routes);

async function init() {
    await Promise.all([
        DatabaseConfig.connectMongo(),
        RedisConfig.connectRedis(),
    ]);
}

const connectedDrivers = {};
const connectedPassengers = {};

io.on("connection", (socket) => {
    socket.on("registerDriver", (driverId) => {
        connectedDrivers[driverId] = socket.id;
        locationService.setDriverSocket(driverId, socket.id);
    });

    socket.on("registerPassenger", (passengerId) => {
        connectedPassengers[passengerId] = socket.id;
    });

    socket.on("requestRide", (data) => {
        Object.keys(connectedDrivers).forEach((driverId) => {
            io.to(connectedDrivers[driverId]).emit("rideRequest", {
                bookingId: data.bookingId,
                passengerId: data.passengerId,
                passengerName: data.passengerName,
                source: data.source,
                destination: data.destination,
                fare: data.fare,
            });
        });
    });

    socket.on("acceptRide", (data) => {
        const passengerSocketId = connectedPassengers[data.passengerId];
        if (passengerSocketId) {
            io.to(passengerSocketId).emit("rideAccepted", {
                bookingId: data.bookingId,
                driverId: data.driverId,
                driverName: data.driverName,
            });
        }
        Object.keys(connectedDrivers).forEach((driverId) => {
            if (driverId !== data.driverId) {
                io.to(connectedDrivers[driverId]).emit("rideTaken", {
                    bookingId: data.bookingId,
                });
            }
        });
    });

    socket.on("rejectRide", (data) => {
        console.log(`Driver rejected ride ${data.bookingId}`);
    });

    socket.on("disconnect", () => {
        for (const [driverId, sid] of Object.entries(connectedDrivers)) {
            if (sid === socket.id) {
                delete connectedDrivers[driverId];
                locationService.deleteDriverSocket(driverId);
                break;
            }
        }
        for (const [passengerId, sid] of Object.entries(connectedPassengers)) {
            if (sid === socket.id) {
                delete connectedPassengers[passengerId];
                break;
            }
        }
    });
});

server.listen(ServerConfig.PORT, async () => {
    console.log(`Server started at ${ServerConfig.PORT}`);
    await init();
});
