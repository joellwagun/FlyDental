import api from './api';

// Send services as an actual array, hit the trailing‑slash URL
export const addClinic = async (clinicData) => {
  const payload = {
    ...clinicData,
    services: clinicData.services, // [ 'Cleaning', 'Whitening', … ]
  };
  const res = await api.post('/clinic/', payload);
  return res.data;
};

export const getAllClinics = () => api.get('/clinic/').then(r => r.data);
export const getClinicById  = (id) => api.get(`/clinic/${id}`).then(r => r.data);
export const updateClinic  = (id, data) =>
  api.put(`/clinic/${id}`, { ...data, services: data.services }).then(r => r.data);
export const deleteClinic  = (id) => api.delete(`/clinic/${id}`).then(r => r.data);
