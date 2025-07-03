import React from 'react';
import { MapPin, Calendar, Clock, FileText, CreditCard } from 'lucide-react';

const AppointmentSummary = ({ appointmentDetails, onBackToClinics, onConfirmBooking }) => {
  const { clinicName, location, date, time, service, price } = appointmentDetails;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Appointment Summary</h2>
      
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Appointment Details</h3>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">{clinicName}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-gray-600">{location}</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-gray-600">
              {date && time ? `July ${date}, 2023 at ${time}` : 'Please select date and time'}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-gray-600">{service}</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-gray-600">{price}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBackToClinics}
          className="flex-1 px-6 py-3 text-purple-600 border border-purple-200 rounded-full hover:bg-purple-50 transition-all duration-200 font-medium"
        >
          Back to Clinics
        </button>
        <button
          onClick={onConfirmBooking}
          disabled={!date || !time}
          className={`flex-1 px-6 py-3 rounded-full transition-all duration-200 font-medium shadow-sm hover:shadow-md ${
            date && time
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default AppointmentSummary;