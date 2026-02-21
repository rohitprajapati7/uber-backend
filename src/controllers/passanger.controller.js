const passangerService = require("../services/passanger.service");

async function getPassangerBooking(req, res) {
    try {
        const bookings = await passangerService.getPassangerBooking(
            req.user._id,
        );
        return res
            .status(201)
            .send({ data: bookings, success: true, error: null });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function provideFeeback(req, res) {
    try {
        const { bookingId, rating, feedback } = req.body;
        const result = await passangerService.provideFeeback(
            req.user._id,
            bookingId,
            rating,
            feedback,
        );
        return res.status(200).json({
            success: true,
            data: result,
            error: null,
            message: "Feedback submitted successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, data: null, error: error.message });
    }
}

module.exports = { getPassangerBooking, provideFeeback };
