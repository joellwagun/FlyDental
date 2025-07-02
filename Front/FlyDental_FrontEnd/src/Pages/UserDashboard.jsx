// src/pages/ClinicDashboard.jsx
import React from "react";

function UserDashboard() {
  return (
    <div className="min-h-screen bg-indigo-50 p-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        User Dashboard
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-700">Welcome, User!</p>
        <p className="text-gray-500 mt-2">
          Here you can manage appointments and track your activities.
        </p>
      </div>

      <div className="mt-6">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Book Appointment
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;
