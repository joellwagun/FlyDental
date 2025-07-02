// src/pages/ClinicDashboard.jsx
import React from "react";

function ClinicDashboard() {
  return (
    <div className="min-h-screen bg-indigo-50 p-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        Clinic Dashboard
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-700">Welcome, Clinic!</p>
        <p className="text-gray-500 mt-2">
          Here you can manage appointments, view patient requests, and track
          your activities.
        </p>
      </div>

      <div className="mt-6">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Add Appointment
        </button>
      </div>
    </div>
  );
}

export default ClinicDashboard;
