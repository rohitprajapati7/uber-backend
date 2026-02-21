const express = require("express");
const { BookingController } = require("../../controllers");
const { authenticate } = require("../../middlewares/auth.middleware");

const router = express.Router();
router.post("/", authenticate, BookingController.createBookingController);
router.patch("/:bookingId", authenticate, BookingController.updateBookingController);

module.exports = router;
