import { Inventory } from "../models/Inventory.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getInventory = asyncHandler(async (req, res) => {
    const items = await Inventory.find();

    if (!items || items.length === 0) {
        return res.status(200).json({ 
            success: true, 
            message: "No items in inventory", 
            data: [], 
            alerts: [] 
        }); // <-- Json ka bracket
    } // <--- YE WALA BRACKET MISSING THA! Isko lagate hi error khatam.

    const alerts = items
        .filter(item => item.quantity <= (item.threshold || 10))
        .map(item => `Alert: ${item.itemName} is low on stock!`);

    res.status(200).json({
        success: true,
        data: items,
        alerts: alerts
    });
});

export const createInventory = asyncHandler(async (req, res) => {
    const { itemName, quantity, threshold } = req.body;

    // Validation: Check karo sab fields hain ya nahi
    if (!itemName || !quantity || !threshold) {
        return res.status(400).json({ 
            success: false, 
            message: "All fields (Item Name, Quantity, Threshold) are required" 
        });
    }

    // Database mein save karo
    const newItem = await Inventory.create({
        itemName,
        quantity: Number(quantity),
        threshold: Number(threshold)
    });

    res.status(201).json({
        success: true,
        message: "Item added successfully",
        data: newItem
    });
});