import React, { useState, useEffect } from 'react'
import { Button, Modal, Table, message, Tag, Popconfirm } from 'antd'
import AddClinic from '../Create'
import { getAllClinics, deleteClinic } from '@/services/clinic'

export default function ClinicList() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClinic, setEditingClinic] = useState(null)
  const [clinics, setClinics] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchClinics = async () => {
    setLoading(true)
    try {
      const data = await getAllClinics()
      setClinics(data)
    } catch (err) {
      console.error(err)
      message.error('Failed to fetch clinics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClinics()
  }, [])

  const handleAdd = () => {
    setEditingClinic(null)
    setIsModalOpen(true)
  }

  const handleEdit = (clinic) => {
    setEditingClinic(clinic)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    try {
      await deleteClinic(id)
      message.success('Clinic deleted')
      fetchClinics()
    } catch (err) {
      console.error(err)
      message.error('Failed to delete clinic')
    }
  }

  const columns = [
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
        services.map((s, i) => (
          <Tag color="blue" key={i}>
            {s}
          </Tag>
        )),
    },
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
  ]

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Clinic List</h2>
        <Button type="primary" onClick={handleAdd}>
          Add Clinic
        </Button>
      </div>

      <Table
        dataSource={clinics}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

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
  )
}
