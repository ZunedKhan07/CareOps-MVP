import React, { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import API from '../api/axios';
import { Plus, Package, AlertCircle, Loader2 } from "lucide-react";

const Inventory = () => {
    const { inventory, fetchInventory, loading } = useStore();
    const [formData, setFormData] = useState({ itemName: "", quantity: "", threshold: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchInventory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await API.post("/inventory", formData);
            alert("Item Added Successfully! 🎉");
            setFormData({ itemName: "", quantity: "", threshold: "" });
            fetchInventory(); // List ko refresh karega
        } catch (error) {
            console.error("Add error", error);
            alert("Error adding item. Check console.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 p-4">
            {/* Header Section */}
            <div className="flex items-center gap-3 border-b pb-4">
                <Package className="text-blue-600" size={32} />
                <h2 className="text-3xl font-extrabold text-gray-800">Inventory Management</h2>
            </div>

            {/* Add Item Form */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Add New Stock Item</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600">Item Name</label>
                        <input 
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                            placeholder="e.g. Oxygen Mask"
                            value={formData.itemName} 
                            onChange={(e) => setFormData({...formData, itemName: e.target.value})} 
                            required 
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600">Current Quantity</label>
                        <input 
                            type="number" 
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                            placeholder="0"
                            value={formData.quantity} 
                            onChange={(e) => setFormData({...formData, quantity: e.target.value})} 
                            required 
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600">Min. Threshold</label>
                        <input 
                            type="number" 
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                            placeholder="5"
                            value={formData.threshold} 
                            onChange={(e) => setFormData({...formData, threshold: e.target.value})} 
                            required 
                        />
                    </div>
                    <button 
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:bg-blue-400"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                        Add to Stock
                    </button>
                </form>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
                        <tr>
                            <th className="p-4 border-b">Item Details</th>
                            <th className="p-4 border-b text-center">In Stock</th>
                            <th className="p-4 border-b text-center">Threshold</th>
                            <th className="p-4 border-b text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="p-10 text-center text-gray-400">
                                    <Loader2 className="animate-spin mx-auto mb-2" size={32} />
                                    Fetching inventory...
                                </td>
                            </tr>
                        ) : inventory.length > 0 ? (
                            inventory.map((item) => (
                                <tr key={item._id} className="hover:bg-blue-50 transition-colors">
                                    <td className="p-4 font-semibold text-gray-800">{item.itemName}</td>
                                    <td className="p-4 text-center font-mono text-lg">{item.quantity}</td>
                                    <td className="p-4 text-center text-gray-500">{item.threshold}</td>
                                    <td className="p-4">
                                        <div className="flex justify-center">
                                            {Number(item.quantity) <= Number(item.threshold) ? (
                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ring-1 ring-red-200">
                                                    <AlertCircle size={14} /> LOW STOCK
                                                </span>
                                            ) : (
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-green-200">
                                                    STABLE
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-10 text-center text-gray-500 italic">
                                    Inventory is empty. Add items to see them here.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;