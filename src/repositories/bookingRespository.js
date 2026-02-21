const Booking = require("../models/booking");

async function createBooking(data) {
    try {
        return await Booking.create(data);
    } catch (error) {
        throw error;
    }
}

async function updateBookingById(bookingId, updateData) {
    try {
        return await Booking.findByIdAndUpdate(bookingId, updateData, { new: true });
    } catch (error) {
        throw error;
    }
}

module.exports = { createBooking, updateBookingById };
