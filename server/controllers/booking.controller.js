import { Booking } from "../models/Booking.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getBooking = asyncHandler(async (_, res) => {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    if (bookings.length === 0) {
        return res.status(200).json({
            success: true,
            message: "Bookings are not found !!",
            data: []
        });
    }

    res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings
    });
});

const createBooking = asyncHandler(async (req, res) => {
    const { customerName, email, service } = req.body;

    // Validation
    if (!customerName || !email || !service) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    const booking = await Booking.create({
        customerName,
        email,
        service
    });

    res.status(201).json(booking);
})

const deleteBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        res.status(404);
        throw new Error("Booking not found");
    }

    await booking.deleteOne();
    res.status(200).json({ id: req.params.id, message: "Booking removed" });
});


export {
    getBooking,
    createBooking,
    deleteBooking
}