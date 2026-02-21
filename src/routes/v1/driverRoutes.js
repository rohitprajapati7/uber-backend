const express = require("express");
const driverController = require("../../controllers/driver.controller");
const { authenticate } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/profile", authenticate, driverController.getProfile);
router.patch("/location", authenticate, driverController.updateLocation);
router.get("/bookings", authenticate, driverController.getBookings);
router.patch("/bookings/:bookingId/accept", authenticate, driverController.acceptBooking);
router.patch("/bookings/:bookingId/complete", authenticate, driverController.completeBooking);

module.exports = router;
