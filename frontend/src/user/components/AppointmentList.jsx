import React from "react";

const appointments = [
  {
    id: 1,
    clinicName: "Smile Dental Care",
    date: "2025-07-15",
    time: "09:00 AM",
    service: "General Checkup",
    status: "Confirmed",
  },
  {
    id: 2,
    clinicName: "City Dental Clinic",
    date: "2025-08-01",
    time: "11:00 AM",
    service: "Cleaning",
    status: "Pending",
  },
];

const AppointmentList = () => {
  return (
    <div className="space-y-4">
      {appointments.map((appt) => (
        <div
          key={appt.id}
          className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
        >
          <h2 className="font-semibold text-lg text-gray-900">{appt.clinicName}</h2>
          <p className="text-sm text-gray-600">{appt.date} at {appt.time}</p>
          <p className="text-sm text-gray-600">Service: {appt.service}</p>
          <p className={`text-sm font-medium ${appt.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>
            Status: {appt.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
