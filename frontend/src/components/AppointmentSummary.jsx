import React from "react";
import {
  MapPin,
  Calendar,
  Mail,
  User,
  Phone,
  FileText,
  CreditCard,
} from "lucide-react";

const AppointmentSummary = ({
  appointmentDetails,
  onBackToClinics,
  onConfirmBooking,
}) => {
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

  const formattedDate = apptDateObj
    ? apptDateObj.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const formattedTime = apptDateObj
    ? apptDateObj.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  // Validation rules
  const isValidName = /^[A-Za-z\s]+$/.test(patient_name);
  const isValidAge =
    !isNaN(patient_age) && patient_age >= 1 && patient_age <= 100;
  const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
  const isValidPhone = /^\d{10}$/.test(contact_number);
  const isDateSet = !!appointment_date;

  const isFormValid =
    isValidName && isValidAge && isValidEmail && isValidPhone && isDateSet;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Appointment Summary
      </h2>

      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <User className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Patient Details
            </h3>
          </div>
        </div>

        <div className="space-y-3 text-gray-600">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4" />
            <span
              className={`font-medium text-gray-800 ${
                !isValidName && "text-red-600"
              }`}
            >
              {patient_name || "—"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm">Gender:</span>
            <span>{patient_gender || "—"}</span>
            <span className="ml-4">Age:</span>
            <span className={`${!isValidAge && "text-red-600"}`}>
              {patient_age || "—"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4" />
            <span className={`${!isValidEmail && "text-red-600"}`}>
              {email || "—"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4" />
            <span className={`${!isValidPhone && "text-red-600"}`}>
              {contact_number || "—"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Appointment Details
            </h3>
          </div>
        </div>

        <div className="space-y-4 text-gray-600">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div className="font-semibold text-gray-900">{clinicName}</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>{location}</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              {formattedDate && formattedTime
                ? `${formattedDate} at ${formattedTime}`
                : "Please select date and time"}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>{service}</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>{price}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBackToClinics}
          className="flex-1 px-6 py-3 text-purple-600 border border-purple-200 rounded-full hover:bg-purple-50 transition-all duration-200 font-medium"
        >
          Back to Clinics
        </button>
        <button
          onClick={onConfirmBooking}
          disabled={!isFormValid}
          className={`flex-1 px-6 py-3 rounded-full font-medium shadow-sm transition-all duration-200 ${
            isFormValid
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          title={!isFormValid ? "Please fix errors before confirming" : ""}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default AppointmentSummary;
