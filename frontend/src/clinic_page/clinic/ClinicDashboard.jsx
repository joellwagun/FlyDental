import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, message, Tag, Popconfirm } from 'antd';
import AddClinic from '../Create';
import { getMyClinic, deleteClinic } from '@/services/clinic';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes
import ClinicList from '../ClinicPage/List';

export default function ClinicDashboard() { // This is your ClinicLayout
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);

  const clinicId = localStorage.getItem("clinic_id");

  const fetchClinics = async () => {
    setLoading(true);
    try {
      const data = await getMyClinic();
      setClinics([data]);
    } catch (err) {
      console.error("Failed to fetch clinic info:", err);
      if (err.response && err.response.status === 403) {
          message.error('Access Denied: You are not authorized to view this clinic or user is not linked to a clinic.');
      } else if (err.response && err.response.status === 404) {
          message.error('Clinic not found for your user account.');
      } else {
          message.error('Failed to load clinic information.');
      }
      setClinics([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  const handleAdd = () => { /* ... */ };
  const handleEdit = (clinic) => { /* ... */ };
  const handleDelete = async (id) => { /* ... */ };

  const columns = [ /* ... */ ]; // Keep columns here if you want to use them directly in ClinicLayout

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Clinic Dashboard</h2>
        <Button type="primary" onClick={handleAdd}>
          Add Clinic
        </Button>
      </div>

      {/* Render the nested route content here.
          If ClinicList is the index route, it will render here.
          Pass the fetched data as props. */}
      <Outlet context={{ clinics, loading, handleEdit, handleDelete, columns }} />

      {/* Or if ClinicList is the only content for the index route, you can render it directly
          and pass props like this, removing the <Outlet> and nested <Route index>
          <ClinicList clinics={clinics} loading={loading} />
      */}

      <Modal
        title={editingClinic ? 'Edit Clinic' : 'Add New Clinic'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
        afterClose={fetchClinics}
      >
        <AddClinic
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchClinics}
          initialValues={editingClinic}
        />
      </Modal>
    </>
  );
}