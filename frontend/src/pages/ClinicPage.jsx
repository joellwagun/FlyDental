import React, { useState } from 'react';
import { Search, MapPin, Star, Calendar } from 'lucide-react';
import ClinicSection from '../components/ClinicSection';
import Header from '../components/Header';

const ClinicPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [servicesFilter, setServicesFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const handleApplyFilters = () => {
    console.log('Applying filters:', { searchTerm, locationFilter, servicesFilter, ratingFilter });
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setServicesFilter('');
    setRatingFilter('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Find Your Ideal Dental Clinic
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Search and filter clinics to find the perfect match for your pre-travel dental needs
          </p>

        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Search & Filters</h2>

          {/* Search Bar */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Find clinics near you
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter location or clinic name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Kathmandu, Pokhara, etc.</option>
                  <option value="kathmandu">Kathmandu</option>
                  <option value="pokhara">Pokhara</option>
                  <option value="lalitpur">Lalitpur</option>
                  <option value="bhaktapur">Bhaktapur</option>
                </select>
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services
              </label>
              <select
                value={servicesFilter}
                onChange={(e) => setServicesFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">Checkup, Cleaning, Filling</option>
                <option value="checkup">Checkup</option>
                <option value="cleaning">Cleaning</option>
                <option value="filling">Filling</option>
                <option value="root-canal">Root Canal</option>
                <option value="x-ray">X-Ray</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="relative">
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">4+ stars, etc.</option>
                  <option value="4+">4+ stars</option>
                  <option value="4.5+">4.5+ stars</option>
                  <option value="5">5 stars</option>
                </select>
                <Star className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleApplyFilters}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Apply Filters
            </button>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Available Clinics Section */}
        <ClinicSection />

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-8 py-3 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium">
            Load More Clinics
          </button>
        </div>

        {/* Help Section */}
        <div className="text-center mt-12 py-8">
          <p className="text-gray-600">
            Need help choosing?{' '}
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              Contact us!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClinicPage;