import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import BookingDateSelector from '../components/BookingDateSelector';
import BookingTimeSelector from '../components/BookingTimeSelector';
import AppointmentSummary from '../components/AppointmentSummary';
import Header from '../components/Header';
import { createAppointment } from '@/services/appointment';
import { useParams, useLocation, useNavigate } from 'react-router-dom';


function convertTo24Hour(time12h) {
  if (!time12h) {
    console.error('convertTo24Hour received invalid time:', time12h);
    return '00:00'; // fallback
  }
  const parts = time12h.split(' ');
  if (parts.length !== 2) {
    console.error('convertTo24Hour invalid format:', time12h);
    return '00:00'; // fallback
  }

  const [time, modifier] = parts;
  let [hours, minutes] = time.split(':');

  if (isNaN(hours) || isNaN(minutes)) {
    console.error('convertTo24Hour invalid numbers:', hours, minutes);
    return '00:00'; // fallback
  }

  if (modifier === 'PM' && hours !== '12') hours = parseInt(hours, 10) + 12;
  if (modifier === 'AM' && hours === '12') hours = '00';

  // Make sure hours and minutes are strings and zero-padded
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}


const BookingPage = () => {
     const { clinicId } = useParams();  // get clinic id from URL
  const location = useLocation();    // get state from navigation
  const navigate = useNavigate();
    const clinic = location.state?.clinic;
    const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
const [patientName, setPatientName] = useState('');
const [patientGender, setPatientGender] = useState('');
const [patientAge, setPatientAge] = useState('');
const [patientEmail, setPatientEmail] = useState('');
const [contactNumber, setContactNumber] = useState('');
const [summaryHtml, setSummaryHtml] = useState(null);


   // Build an ISO datetime string whenever both are chosen
    const appointment_date =
      selectedDate && selectedTime
        ? (() => {
            const pad = (n) => n.toString().padStart(2, '0');
            // e.g. "2025-07-05T09:30:00"
            return new Date(
              `2025-07-${pad(selectedDate)}T${convertTo24Hour(selectedTime)}:00`
            ).toISOString();
          })()
        : null;


    const appointmentDetails = {
    clinicName: clinic.name,
    location: clinic.location,
    appointment_date,
    service: 'Checkup Service',
    price: 'NPR 1,500',
    patient_name: patientName,
  patient_gender: patientGender,
  patient_age: patientAge,
  email: patientEmail,
  contact_number: contactNumber,
  };


  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }

const padDate = (day) => day.toString().padStart(2, '0');

const dateString = `2025-07-${padDate(selectedDate)}T${convertTo24Hour(selectedTime)}:00`;
console.log('Creating Date with string:', dateString);

const appointmentDate = new Date(dateString);

if (isNaN(appointmentDate.getTime())) {
  alert('Invalid date/time selected: ' + dateString);
  return;
}




    const appointmentPayload = {
    patient_name: patientName,
    patient_gender: patientGender,
    patient_age: Number(patientAge),
    email: patientEmail,
    contact_number: contactNumber,
    clinic_name: appointmentDetails.clinicName,
     appointment_date: appointmentDate.toLocaleString('sv-SE'),
    };

    try {
      setIsLoading(true);
      await createAppointment(appointmentPayload);
      alert('Appointment booked successfully!');
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (err) {
      console.error(err);
      alert('Failed to book appointment.');
    } finally {
      setIsLoading(false);
    }
  };

 
const handleBackToClinics = () => {
  navigate('/clinics'); // replace with the actual path to your clinics page
};



  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-gray-600 hover:text-gray-900">
                  Clinics
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-900 font-medium">
                  Booking
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Book Your Appointment at Smile Dental Clinic
        </h1>

        <div className="space-y-8">

            {/* name / gender/age */}

         <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
  <h2 className="text-xl font-semibold text-gray-900 mb-6">Patient Information</h2>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Full Name</label>
      <input
        type="text"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        placeholder="Enter full name"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Gender</label>
      <select
        value={patientGender}
        onChange={(e) => setPatientGender(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
      >
        <option value="">Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Age</label>
      <input
        type="number"
        min="1"
        value={patientAge}
        onChange={(e) => setPatientAge(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        placeholder="Enter age"
      />
    </div>
     <div>
    <label className="block text-sm font-medium text-gray-700">Email</label>
    <input
      type="email"
      value={patientEmail}
      onChange={(e) => setPatientEmail(e.target.value)}
      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
      placeholder="Enter email"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Contact Number</label>
    <input
      type="text"
      value={contactNumber}
      onChange={(e) => setContactNumber(e.target.value)}
      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
      placeholder="Enter contact number"
    />
  </div>
  </div>
</div>

          {/* Date Selection */}
          <BookingDateSelector 
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />

          {/* Time Selection */}
          <BookingTimeSelector 
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
          />

          {/* Appointment Summary */}
          <AppointmentSummary 
            appointmentDetails={appointmentDetails}
            onBackToClinics={handleBackToClinics}
            onConfirmBooking={handleConfirmBooking}
            
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;