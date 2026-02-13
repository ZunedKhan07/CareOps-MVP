import React, { useEffect } from 'react';
import useStore from '../store/useStore';
import { LayoutDashboard, Users, Package, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { inventory, fetchInventory, bookings, fetchBookings } = useStore();

    useEffect(() => {
        fetchInventory();
        // Agar store mein fetchBookings nahi hai, toh ye ensure karein ki data load ho raha hai
        if(fetchBookings) fetchBookings(); 
    }, []);

    // Stats calculations
    const lowStockCount = inventory.filter(item => item.quantity <= item.threshold).length;
    const totalItems = inventory.length;
    const totalBookings = bookings?.length || 0;

    const stats = [
        { 
            title: "Total Bookings", 
            value: totalBookings, 
            icon: <Users className="text-blue-600" />, 
            link: "/bookings",
            color: "bg-blue-50" 
        },
        { 
            title: "Inventory Items", 
            value: totalItems, 
            icon: <Package className="text-green-600" />, 
            link: "/inventory",
            color: "bg-green-50" 
        },
        { 
            title: "Low Stock Alerts", 
            value: lowStockCount, 
            icon: <AlertTriangle className="text-red-600" />, 
            link: "/alert",
            color: "bg-red-50" 
        },
    ];

    return (
        <div className="space-y-8 p-4">
            <div className="flex items-center gap-3 border-b pb-4">
                <LayoutDashboard className="text-indigo-600" size={32} />
                <h2 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Link to={stat.link} key={index} className={`${stat.color} p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-gray-200 group`}>
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-white rounded-xl shadow-sm">
                                {stat.icon}
                            </div>
                            <ArrowRight className="text-gray-400 group-hover:text-gray-600 transition-transform group-hover:translate-x-1" size={20} />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-gray-500 font-medium">{stat.title}</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions or Recent Activity Placeholder */}
            <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
                <div className="bg-indigo-50 p-4 rounded-full mb-4">
                    <LayoutDashboard className="text-indigo-500" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Welcome to CareOps Portal</h3>
                <p className="text-gray-500 max-w-sm mt-2">
                    Everything is running smoothly. You have {lowStockCount} items that need attention.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;