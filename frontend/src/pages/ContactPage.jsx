import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

function ContactUs() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-blue-50 rounded-xl shadow-md">
      <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
        Contact Us
      </h2>

      <div className="space-y-6 text-gray-800 text-lg">
        <div className="flex items-center gap-3">
          <MapPin className="text-blue-600" />
          <span>123 Dental Street, Kathmandu, Nepal</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="text-blue-600" />
          <span>+977-1-5551234</span>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="text-blue-600" />
          <span>info@flydental.com</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="text-blue-600" />
          <span>Open: Sun – Fri, 9:00 AM – 6:00 PM</span>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;