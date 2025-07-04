import React, { useState, useEffect } from 'react';
import { getAllAppointments } from '@/services/appointment';
import { Table } from 'antd';

export default function AppointmentBookedList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const data = await getAllAppointments();
        setAppointments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Patient', dataIndex: 'patient_name', key: 'patient_name' },
    { title: 'Gender', dataIndex: 'patient_gender', key: 'patient_gender' },
    { title: 'Age', dataIndex: 'patient_age', key: 'patient_age' },
    { title: 'Clinic', dataIndex: 'clinic_name', key: 'clinic_name' },
    { title: 'Date', dataIndex: 'appointment_date', key: 'appointment_date', render: d => new Date(d).toLocaleString() },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Booked Appointments</h2>
      <Table
        dataSource={appointments}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
}