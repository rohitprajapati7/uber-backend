const passangerRepository = require("../repositories/passageRepository");

async function getPassangerBooking(passangerId) {
    const passanger = await passangerRepository.findPassagerById(passangerId);
    if (!passanger) throw new Error("Passanger not found");
    const bookings = await passangerRepository.findBookingsByPassanger(passangerId);
    return bookings;
}

async function provideFeeback(passangerId, bookingId, rating, feedback) {
    const booking = await passangerRepository.findBookingById(bookingId);
    if (!booking) throw new Error("Booking not found");
    if (booking.passangerId.toString() !== passangerId.toString()) {
        throw new Error("Unauthorized to provide feedback for this booking");
    }
    booking.rating = rating;
    booking.feedback = feedback;
    await booking.save();
    return booking;
}

module.exports = { getPassangerBooking, provideFeeback };
