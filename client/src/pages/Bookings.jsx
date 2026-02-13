import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Calendar, User, Mail, Briefcase, Trash2, Loader2 } from "lucide-react";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Backend ke hisab se state update ki: customerName, email, service
    const [formData, setFormData] = useState({ 
        customerName: "", 
        email: "", 
        service: "" 
    });

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const { data } = await API.get("/bookings");
            // Backend agar success:true wala object bhej raha hai toh data.data use karein
            setBookings(data.data || data);
        } catch (error) {
            console.error("Fetch error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Backend ko ab wahi milega jo wo maang raha hai
            await API.post("/bookings", formData);
            alert("Booking Confirmed! 🏥");
            setFormData({ customerName: "", email: "", service: "" });
            fetchBookings();
        } catch (error) {
            console.error("Post Error:", error.response?.data);
            alert("Error creating booking: " + (error.response?.data?.message || "Check Console"));
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure?")) {
            try {
                await API.delete(`/bookings/${id}`);
                fetchBookings();
            } catch (error) {
                alert("Error deleting booking");
            }
        }
    };

    return (
        <div className="space-y-8 p-4">
            <div className="flex items-center gap-3 border-b pb-4">
                <Calendar className="text-indigo-600" size={32} />
                <h2 className="text-3xl font-extrabold text-gray-800">Hospital Bookings</h2>
            </div>

            {/* Booking Form matched to Backend */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600">Customer Name</label>
                        <input 
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Patient/Customer Name"
                            value={formData.customerName}
                            onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600">Email Address</label>
                        <input 
                            type="email"
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600">Service Required</label>
                        <input 
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="e.g. Checkup, Surgery"
                            value={formData.service}
                            onChange={(e) => setFormData({...formData, service: e.target.value})}
                            required
                        />
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors">
                        Book Now
                    </button>
                </form>
            </div>

            {/* Bookings Display List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <Loader2 className="animate-spin mx-auto col-span-full" size={40} />
                ) : (Array.isArray(bookings) && bookings.length > 0) ? (
                    bookings.map((b) => (
                        <div key={b._id} className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-indigo-500 flex justify-between items-center hover:shadow-md transition-all">
                            <div className="space-y-2">
                                <h4 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
                                    <User size={18} className="text-indigo-500"/> {b.customerName}
                                </h4>
                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                    <Mail size={14}/> {b.email}
                                </p>
                                <p className="text-sm font-medium text-indigo-600 flex items-center gap-2 bg-indigo-50 px-2 py-1 rounded-md w-fit">
                                    <Briefcase size={14}/> {b.service}
                                </p>
                            </div>
                            <button onClick={() => handleDelete(b._id)} className="text-red-300 hover:text-red-600 p-2 transition-colors">
                                <Trash2 size={22} />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed">
                        <p className="text-gray-400">No active bookings found in the database.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookings;