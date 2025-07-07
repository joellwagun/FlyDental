import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, message, Tag, Popconfirm } from 'antd';
import AddClinic from '@/clinic_page/ClinicPage/Create';
import { getAllClinics, addClinic, updateClinic, deleteClinic } from '@/services/clinic'; // Import all necessary API calls


export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState(null);
  const [clinics, setClinics] = useState([]); // State to store all clinics for the table
  const [loading, setLoading] = useState(false);

  // Function to fetch all clinics
  const fetchAllClinics = async () => {
    setLoading(true);
    try {
      const data = await getAllClinics(); // Call the API to get all clinics (public route)
      setClinics(data); // Update the state with the fetched clinics
    } catch (err) {
      console.error("Failed to fetch all clinics for admin dashboard:", err);
      message.error('Failed to load clinics.');
      setClinics([]); // Clear clinics on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch clinics when the component mounts
  useEffect(() => {
    fetchAllClinics();
  }, []); // Empty dependency array means this runs once on component mount

  const handleAdd = () => {
    setEditingClinic(null); // Clear any clinic data from a previous edit
    setIsModalOpen(true);   // Open the modal for adding a new clinic
  };

  const handleEdit = (clinic) => {
    setEditingClinic(clinic); // Set the clinic data for editing
    setIsModalOpen(true);      // Open the modal for editing
  };

  const handleDelete = async (id) => {
    try {
      await deleteClinic(id); // Call the API to delete the clinic
      message.success('Clinic deleted successfully!');
      fetchAllClinics(); // Re-fetch the list of clinics after deletion
    } catch (err) {
      console.error("Error deleting clinic:", err);
      message.error('Failed to delete clinic.');
    }
  };

  // Define the columns for the Ant Design Table
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' }, // Display clinic ID
    { title: 'Clinic Name', dataIndex: 'name', key: 'name' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (value) => value?.toFixed(1),
    },
    { title: 'Reviews', dataIndex: 'reviews', key: 'reviews' },
    {
      title: 'Services',
      dataIndex: 'services',
      key: 'services',
      render: (services) =>
        services?.map((s, i) => (
          <Tag color="blue" key={i}>
            {s}
          </Tag>
        )),
    },
    { title: 'Image', dataIndex: 'image', key: 'image', render: (text) => text || 'N/A' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button size="small" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this clinic?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Clinics (Admin)</h1>
        <Button type="primary" onClick={handleAdd}>
          Add New Clinic
        </Button>
      </div>

      <Table
        dataSource={clinics} // Use the 'clinics' state as data source
        columns={columns}
        rowKey="id" // Important for React to efficiently render list items
        loading={loading}
        pagination={{ pageSize: 10 }} // Add pagination for potentially many clinics
      />

      <Modal
        title={editingClinic ? 'Edit Clinic' : 'Add New Clinic'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null} // No default footer buttons
        destroyOnClose // Ensures form resets when modal closes
        afterClose={fetchAllClinics} // Re-fetch all clinics after modal closes (add/edit)
      >
        <AddClinic
          onClose={() => setIsModalOpen(false)} // Function to close the modal
          onSuccess={fetchAllClinics} // Function to call after successful add/edit
          initialValues={editingClinic} // Pass clinic data for editing
        />
      </Modal>
    </div>
  );
}
