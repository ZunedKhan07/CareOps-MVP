import React, { useEffect } from 'react'
import useStore from '../store/useStore'
import {AlertTriangle, BellRing } from 'lucide-react';

const Alerts = () => {
    const {alerts, fetchInventory, loading} = useStore();

    useEffect(() => {
        fetchInventory();
    }, []);
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BellRing className="text-red-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">System Alerts</h2>
      </div>

      {loading ? (
        <p className="text-gray-500 italic">Checking inventory status...</p>
      ) : alerts.length > 0 ? (
        <div className="grid gap-4">
          {alerts.map((msg, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm animate-pulse"
            >
              <AlertTriangle className="text-red-600" size={24} />
              <p className="text-red-800 font-medium">{msg}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg text-green-800">
          ✅ All systems go! Inventory levels are healthy.
        </div>
      )}
    </div>
  );
};

export default Alerts;