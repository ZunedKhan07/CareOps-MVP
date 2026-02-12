import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    customerName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    service : {
        type: String,
        required: true
    },
    status : {
        type: String,
        default: "Pending"
    },
    date : {
        type: Date,
        required: Date.now
    },
}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema)