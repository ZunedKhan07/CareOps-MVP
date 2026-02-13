import express from "express";
import { createBooking, deleteBooking, getBooking } from "../controllers/booking.controller.js";
import { createInventory, getInventory } from "../controllers/inventory.controller.js";

const router = express.Router()

router.route("/bookings")
    .get(getBooking)
    .post(createBooking)

router.route("/bookings/:id")
    .delete(deleteBooking)


router.route("/inventory")
    .get(getInventory)
    .post(createInventory)

export default router;