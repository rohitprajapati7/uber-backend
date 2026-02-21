const express = require("express");
const { getPassangerBooking, provideFeeback } = require("../../controllers/passanger.controller");
const { authenticate } = require("../../middlewares/auth.middleware");

const router = express.Router();
router.get("/bookings", authenticate, getPassangerBooking);
router.post("/feedback", authenticate, provideFeeback);

module.exports = router;
