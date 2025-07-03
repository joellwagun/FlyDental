import React from "react";
import AppointmentList from "../components/AppointmentList";

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900">My Appointments</h1>
      <AppointmentList />
    </div>
  );
};

export default UserProfile;
