import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    threshold: {
        type: Number,
        default: 10
    }
}, { timestamps: true });

export const Inventory = mongoose.model("Inventory", inventorySchema)