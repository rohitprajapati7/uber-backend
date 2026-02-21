const User = require("../models/user");
const Booking = require("../models/booking");

async function findPassagerById(id) {
    try {
        return await User.findById(id);
    } catch (error) {
        throw error;
    }
}

async function findBookingsByPassanger(passangerId) {
    try {
        return await Booking.find({ passangerId });
    } catch (error) {
        throw error;
    }
}

async function findBookingById(bookingId) {
    try {
        return await Booking.findById(bookingId);
    } catch (error) {
        throw error;
    }
}

module.exports = { findPassagerById, findBookingsByPassanger, findBookingById };
