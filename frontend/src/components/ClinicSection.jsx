import React from 'react';
import ClinicCard from './ClinicCard';

const ClinicSection = () => {
  const clinics = [
    {
      id: 1,
      name: 'Smile Dental Care',
      location: 'Kathmandu, 5km away',
      rating: 4.8,
      reviews: 120,
      services: ['Checkup', 'Cleaning', 'X-ray'],
      image: '👥'
    },
    {
      id: 2,
      name: 'Premier Dental Clinic',
      location: 'Kathmandu, 3km away',
      rating: 4.7,
      reviews: 98,
      services: ['Checkup', 'Cleaning', 'Filling'],
      image: '👥'
    },
    {
      id: 3,
      name: 'Himalayan Dental',
      location: 'Pokhara, 2km away',
      rating: 4.5,
      reviews: 86,
      services: ['Checkup', 'Cleaning', 'Root Canal'],
      image: '👥'
    },
    {
      id: 4,
      name: 'Everest Dental Hub',
      location: 'Kathmandu, 2km away',
      rating: 4.9,
      reviews: 145,
      services: ['Checkup', 'Cleaning', 'Fillings'],
      image: '👥'
    },
    {
      id: 5,
      name: 'Valley Dental Center',
      location: 'Lalitpur, 4km away',
      rating: 4.6,
      reviews: 110,
      services: ['Checkup', 'Cleaning', 'Whitening'],
      image: '👥'
    },
    {
      id: 6,
      name: 'Nepal Dental Associates',
      location: 'Bhaktapur, 8km away',
      rating: 4.7,
      reviews: 92,
      services: ['Checkup', 'X-Ray', 'Consultation'],
      image: '👥'
    },
    {
      id: 7,
      name: 'City Smile Clinic',
      location: 'Kathmandu, 6km away',
      rating: 4.4,
      reviews: 78,
      services: ['Checkup', 'Cleaning', 'Filling'],
      image: '👥'
    },
    {
      id: 8,
      name: 'Modern Dental Care',
      location: 'Pokhara, 5km away',
      rating: 4.5,
      reviews: 89,
      services: ['Checkup', 'Cleaning', 'X-ray'],
      image: '👥'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Clinics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clinics.map((clinic) => (
          <ClinicCard key={clinic.id} clinic={clinic} />
        ))}
      </div>
    </div>
  );
};

export default ClinicSection;