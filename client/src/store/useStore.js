import { create } from "zustand";
import API from "../api/axios";

const useStore = create((set) => ({
    bookings: [],
    inventory: [],
    alerts: [],
    loading: false,

    // 📦 Inventory and Alerts fetch karne ke liye
    fetchInventory: async () => {
        set({ loading: true });
        try {
            const response = await API.get("/inventory");
            console.log("Inventory Response:", response.data);
            
            const inventoryData = response.data.data || response.data;
            const alertsData = response.data.alerts || [];

            set({
                inventory: Array.isArray(inventoryData) ? inventoryData : [],
                alerts: Array.isArray(alertsData) ? alertsData : [],
                loading: false
            });
        } catch (error) {
            console.error("Inventory Fetch Error:", error.response || error.message);
            set({ loading: false });
        }
    },

    // 🏥 Bookings fetch karne ke liye (Ab Dashboard par number dikhega!)
    fetchBookings: async () => {
        set({ loading: true });
        try {
            const response = await API.get("/bookings");
            console.log("Bookings Response:", response.data);

            const bookingData = response.data.data || response.data;

            set({
                bookings: Array.isArray(bookingData) ? bookingData : [],
                loading: false
            });
        } catch (error) {
            console.error("Bookings Fetch Error:", error.response || error.message);
            set({ loading: false });
        }
    }
}));

export default useStore;