const bookingRepository = require("../repositories/bookingRespository");

async function createBookingService(bookingData) {
    try {
        return await bookingRepository.createBooking(bookingData);
    } catch (error) {
        console.log("error::", error);
        throw new Error('Error while creating booking');
    }
}

async function updateBookingService(bookingId, updateData) {
    const booking = await bookingRepository.updateBookingById(bookingId, updateData);
    if (!booking) throw new Error("Booking not found");
    return booking;
}

module.exports = { createBookingService, updateBookingService };
