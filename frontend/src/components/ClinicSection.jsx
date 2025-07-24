import React, { useEffect, useState } from "react";
import ClinicCard from "./ClinicCard";
import { getAllClinics } from "@/services/clinic";

const ClinicSection = ({
  searchTerm = "",
  locationFilter = "",
  servicesFilter = "",
  ratingFilter = "",
}) => {
  const [clinics, setClinics] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const data = await getAllClinics();
        setClinics(data);
      } catch (error) {
        console.error("Failed to fetch clinics:", error);
      }
    };
    fetchClinics();
  }, []);

  useEffect(() => {
    let filtered = clinics;

    // Search by name or location
    if (searchTerm) {
      filtered = filtered.filter(
        (clinic) =>
          clinic.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          clinic.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Exact match for location
    if (locationFilter) {
      filtered = filtered.filter(
        (clinic) =>
          clinic.location?.toLowerCase() === locationFilter.toLowerCase()
      );
    }

    // Services includes selected option
    if (servicesFilter) {
      filtered = filtered.filter(
        (clinic) =>
          Array.isArray(clinic.services) &&
          clinic.services.includes(servicesFilter)
      );
    }

    // Rating >= selected minimum rating
    if (ratingFilter) {
      const minRating = parseFloat(ratingFilter);
      filtered = filtered.filter(
        (clinic) =>
          !isNaN(parseFloat(clinic.rating)) &&
          parseFloat(clinic.rating) >= minRating
      );
    }

    setFilteredClinics(filtered);
  }, [clinics, searchTerm, locationFilter, servicesFilter, ratingFilter]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredClinics.length > 0 ? (
        filteredClinics.map((clinic) => (
          <ClinicCard key={clinic.id} clinic={clinic} />
        ))
      ) : (
        <p className="text-gray-500 col-span-full text-center">
          No clinics found.
        </p>
      )}
    </div>
  );
};

export default ClinicSection;
