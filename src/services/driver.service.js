const driverRepository = require("../repositories/driverRepository");

async function getProfile(driverId) {
    const driver = await driverRepository.findDriverById(driverId);
    if (!driver) throw new Error("Driver not found");
    return driver;
}

async function updateLocation(driverId, latitude, longitude) {
    const driver = await driverRepository.updateDriverLocation(driverId, [longitude, latitude]);
    if (!driver) throw new Error("Driver not found");
    return driver;
}

async function acceptBooking(driverId, bookingId) {
    const booking = await driverRepository.findBookingById(bookingId);
    if (!booking) throw new Error("Booking not found");
    if (booking.status !== "initiated") throw new Error("Booking is not available");
    booking.driver = driverId;
    booking.status = "booked";
    await booking.save();
    return booking;
}

async function completeBooking(driverId, bookingId) {
    const booking = await driverRepository.findBookingById(bookingId);
    if (!booking) throw new Error("Booking not found");
    if (booking.driver.toString() !== driverId.toString()) throw new Error("Unauthorized");
    if (booking.status !== "booked") throw new Error("Booking cannot be completed");
    booking.status = "completed";
    await booking.save();
    return booking;
}

async function getBookings(driverId) {
    return await driverRepository.getDriverBookings(driverId);
}

module.exports = { getProfile, updateLocation, acceptBooking, completeBooking, getBookings };
