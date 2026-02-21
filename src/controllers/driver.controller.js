const { StatusCodes } = require("http-status-codes");
const driverService = require("../services/driver.service");

async function getProfile(req, res) {
    try {
        const driver = await driverService.getProfile(req.user._id);
        return res.status(StatusCodes.OK).json({ success: true, data: driver, error: null });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: null, error: error.message });
    }
}

async function updateLocation(req, res) {
    try {
        const { latitude, longitude } = req.body;
        const driver = await driverService.updateLocation(req.user._id, latitude, longitude);
        return res.status(StatusCodes.OK).json({ success: true, data: driver, error: null });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: null, error: error.message });
    }
}

async function acceptBooking(req, res) {
    try {
        const booking = await driverService.acceptBooking(req.user._id, req.params.bookingId);
        return res.status(StatusCodes.OK).json({ success: true, data: booking, error: null });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: null, error: error.message });
    }
}

async function completeBooking(req, res) {
    try {
        const booking = await driverService.completeBooking(req.user._id, req.params.bookingId);
        return res.status(StatusCodes.OK).json({ success: true, data: booking, error: null });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: null, error: error.message });
    }
}

async function getBookings(req, res) {
    try {
        const bookings = await driverService.getBookings(req.user._id);
        return res.status(StatusCodes.OK).json({ success: true, data: bookings, error: null });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: null, error: error.message });
    }
}

module.exports = { getProfile, updateLocation, acceptBooking, completeBooking, getBookings };
