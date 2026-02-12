import express from "express";
import { createBooking, deleteBooking, getBooking } from "../controllers/booking.controller.js";
import { getInventory } from "../controllers/inventory.controller.js";

const router = express.Router()

router.route("/bookings")
    .get(getBooking)
    .post(createBooking)

router.route("/bookings/:id")
    .delete(deleteBooking)


router.route("/intentory")
    .get(getInventory)

export default router;