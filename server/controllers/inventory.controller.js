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