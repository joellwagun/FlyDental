import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import AddClinic from '../Create'

export default function ClinicList() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => setIsModalOpen(true)
  const handleCancel = () => setIsModalOpen(false)

  return (
    <>
      <div className="text-xl font-semibold mb-4">ClinicList</div>
      <Button type="primary" onClick={showModal}>
        Add Clinic
      </Button>

      <Modal
        title="Add New Clinic"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnHidden
      >
        <AddClinic onClose={handleCancel} />
      </Modal>
    </>
  )
}
