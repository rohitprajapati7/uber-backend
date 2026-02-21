const express = require("express");
const { InfoController } = require("../../controllers");
const bookingRoutes = require("./bookingRoutes");
const userRoutes = require("./authRoutes");
const driverRoutes = require("./driverRoutes");
const passangerRoutes = require("./passangerRoutes");

const router = express.Router();
console.log('hello')
router.get("/info", InfoController.info);
router.use("/bookings", bookingRoutes);
router.use("/users", userRoutes);
router.use("/driver", driverRoutes);
router.use("/passanger", passangerRoutes);

module.exports = router;
