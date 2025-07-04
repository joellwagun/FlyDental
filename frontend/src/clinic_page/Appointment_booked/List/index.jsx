import React, { useState, useEffect } from 'react';
import { getAllAppointments } from '@/services/appointment';
import { Table, Tag } from 'antd';

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
        console.error('Failed to fetch appointments:', err);
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
    {
      title: 'Date & Time',
      key: 'datetime',
      render: (_, record) => {
        const date = new Date(record.appointment_date);
        const localDate = date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        const localTime = date.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
        });
        return `${localDate} at ${localTime}`;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'gray';
        if (status === 'confirmed') color = 'green';
        else if (status === 'pending') color = 'orange';
        else if (status === 'cancelled') color = 'red';
        return <Tag color={color}>{status || 'N/A'}</Tag>;
      },
    },
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
        bordered
      />
    </div>
  );
}
