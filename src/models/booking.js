const mongoose = require("mongoose");
const { ENUMS } = require("../utills/common");
const { INITIATED, BOOKED, COMPLETED, CANCELLED } = ENUMS.BOOKING_STATUS;

const bookingSchema = new mongoose.Schema({
    passangerId: { type: mongoose.Schema.ObjectId, ref: "User" },
    driver: { type: mongoose.Schema.ObjectId, ref: "User", default: null },
    source: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
    destination: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
    fare: Number,
    status: {
        type: String,
        enums: [INITIATED, BOOKED, COMPLETED, CANCELLED],
        default: INITIATED,
    },
    rating: Number,
    feedback: String,
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
