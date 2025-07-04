import api from './api'

// Create a new appointment
export const createAppointment = async (data) => {
  const res = await api.post('/appointments/', data)
  return res.data
}

// Get all appointments
export const getAllAppointments = async () => {
  const res = await api.get('/appointments/')
  return res.data
}

// Get appointment by ID
export const getAppointmentById = async (id) => {
  const res = await api.get(`/appointments/${id}`)
  return res.data
}

// Update an appointment
export const updateAppointment = async (id, updatedData) => {
  const res = await api.put(`/appointments/${id}`, updatedData)
  return res.data
}

// Delete an appointment
export const deleteAppointment = async (id) => {
  const res = await api.delete(`/appointments/${id}`)
  return res.data
}
