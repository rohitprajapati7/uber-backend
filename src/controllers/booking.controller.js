const bookingService = require("../services/booking.service");
const  {StatusCodes} = require('http-status-codes')

const createBookingController = async(req, res) => {
    try {
        const booking = await bookingService.createBookingService(req.body);
        return res.status(StatusCodes.OK).json({ success: true, data: booking, error: null });
    } catch (error) {
        console.log("error in creating booking controller", error);
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: null, error: error.message });
    }
};

const updateBookingController = async (req, res) => {
    try {
        const booking = await bookingService.updateBookingService(req.params.bookingId, req.body);
        return res.status(StatusCodes.OK).json({ success: true, data: booking, error: null });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: null, error: error.message });
    }
};

module.exports = { createBookingController, updateBookingController };