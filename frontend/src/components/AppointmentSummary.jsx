import React from 'react';
import { MapPin, Calendar, Mail, User,Phone, FileText, CreditCard } from 'lucide-react';

const AppointmentSummary = ({ appointmentDetails, onBackToClinics, onConfirmBooking }) => {
 const {
    clinicName,
    location,
    appointment_date,
    service,
    price,
    patient_name,
    patient_gender,
    patient_age,
    email,
    contact_number,
  } = appointmentDetails;


   const apptDateObj = appointment_date ? new Date(appointment_date) : null;

  // Format date and time nicely
  const formattedDate = apptDateObj
    ? apptDateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const formattedTime = apptDateObj
    ? apptDateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Appointment Summary</h2>
      

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <User className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Patient Details</h3>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <User className="w-4 h-4" />
            <span className="font-medium text-gray-800">{patient_name}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <span className="text-sm">Gender:</span>
            <span>{patient_gender}</span>
            <span className="ml-4">Age:</span>
            <span>{patient_age}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{contact_number}</span>
          </div>
        </div>
      </div>

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
              {formattedDate && formattedTime
                ? `${formattedDate} at ${formattedTime}`
                : 'Please select date and time'}
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
          disabled={!appointment_date}
          className={`flex-1 px-6 py-3 rounded-full transition-all duration-200 font-medium shadow-sm hover:shadow-md ${
            appointment_date
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