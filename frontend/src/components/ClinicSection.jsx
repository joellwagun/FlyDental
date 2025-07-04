import React, {useState, useEffect} from 'react';
import ClinicCard from './ClinicCard';
import { getAllClinics } from '@/services/clinic';

const ClinicSection = () => {

const [clinics, setClinics] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchClinics = async () => {
    setLoading(true)
    try {
      const data = await getAllClinics()
      setClinics(data)
    } catch (err) {
      console.error(err)
      message.error('Failed to load clinics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClinics()
  }, [])
 

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