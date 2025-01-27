// src/pages/Dashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full p-6">
      <div className="bg-white rounded-lg shadow-sm p-10">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600">Welcome to the dashboard!</p>
      </div>
    </div>
  );
}

export default Dashboard;
