const User = require("../models/user");
const Booking = require("../models/booking");

async function findDriverById(driverId) {
    return await User.findById(driverId);
}

async function updateDriverLocation(driverId, coordinates) {
    return await User.findByIdAndUpdate(
        driverId,
        { "location.coordinates": coordinates },
        { new: true }
    );
}

async function getDriverBookings(driverId) {
    return await Booking.find({ driver: driverId });
}

async function findBookingById(bookingId) {
    return await Booking.findById(bookingId);
}

module.exports = { findDriverById, updateDriverLocation, getDriverBookings, findBookingById };
