import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ClinicPage from "./pages/ClinicPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import UserProfile from "./user/pages/UserProfile";
import ClinicLayout from "./clinic_page/layout";
import ClinicList from "./clinic_page/ClinicPage/List";
import AppointmentBookedList from "./clinic_page/Appointment_booked/List";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clinics" element={<ClinicPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-dashboard" element={<UserProfile />} />
        
        {/* Clinic dashboard nested routes */}
        <Route path="/clinic-dashboard" element={<ClinicLayout />}>
          <Route index element={<ClinicList />} />
          <Route path="appointment-booked" element={<AppointmentBookedList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
