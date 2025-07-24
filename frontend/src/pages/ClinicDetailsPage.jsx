// src/pages/ClinicDetailsPage.jsx
import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Star, MapPin } from "lucide-react";

const ClinicDetailsPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const clinic = state?.clinic;
  const navigate = useNavigate();

  if (!clinic) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">
          Clinic not found. Please go back and try again.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-[#634aff] text-white rounded hover:bg-[#7b64ff]"
        >
          Go Back
        </button>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="w-5 h-5 fill-yellow-400 text-yellow-400 opacity-50"
          />
        );
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded mt-5">
      <div className="bg-blue-100 h-48 flex items-center justify-center rounded mb-4">
        <span className="text-4xl">{clinic.image}</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">{clinic.name}</h1>

      <div className="flex items-center gap-2 mb-2">
        {renderStars(clinic.rating)}
        <span className="text-sm text-gray-600">
          ({clinic.rating}) • {clinic.reviews} reviews
        </span>
      </div>

      <div className="flex items-center text-gray-600 text-sm mb-4">
        <MapPin className="w-5 h-5 mr-1" />
        {clinic.location}
      </div>

      <p className="text-gray-700 text-sm mb-3">
        <strong>Services:</strong> {clinic.services.join(", ")}
      </p>

      <p className="text-gray-700 text-sm mb-3">
        <strong>Description:</strong>{" "}
        {clinic.description || "No description available."}
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        Back
      </button>
    </div>
  );
};

export default ClinicDetailsPage;
