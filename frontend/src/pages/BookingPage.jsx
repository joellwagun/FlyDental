import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import BookingDateSelector from '../components/BookingDateSelector';
import BookingTimeSelector from '../components/BookingTimeSelector';
import AppointmentSummary from '../components/AppointmentSummary';
import Header from '../components/Header';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const appointmentDetails = {
    clinicName: 'Smile Dental Clinic',
    location: 'Kamaldi, Kathmandu',
    date: selectedDate,
    time: selectedTime,
    service: 'Checkup Service',
    price: 'NPR 1,500'
  };

  const handleBackToClinics = () => {
    // Navigate back to clinics page
    console.log('Back to clinics');
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }
    console.log('Confirm booking', appointmentDetails);
    // Here you would typically send the booking to your backend
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