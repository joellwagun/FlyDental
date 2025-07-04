
import React, {useEffect} from 'react'
import { Input, Button, Form, message, InputNumber } from 'antd'
import { addClinic ,updateClinic} from '@/services/clinic'

export default function AddClinic({ onClose, onSuccess, initialValues }) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        services: initialValues.services?.join(', '),
      })
    }
  }, [initialValues, form])

  const handleFinish = async (values) => {
    // Convert services string into array
    const servicesStr = values.services || ''
    const clinicData = {
      name: values.name,
      location: values.location,
      rating: values.rating,
      reviews: values.reviews,
      services: servicesStr
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
      image: values.image || null,
    }

      try {
      if (initialValues?.id) {
        await updateClinic(initialValues.id, clinicData)
        message.success('Clinic updated successfully!')
      } else {
        await addClinic(clinicData)
        message.success('Clinic added successfully!')
      }
      form.resetFields()
      onClose()
      onSuccess && onSuccess()
    } catch (err) {
      console.error(err)
      message.error(err.response?.data?.detail || 'Operation failed.')
    }
  }

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFinish}
      initialValues={{ services: '', rating: null, reviews: null }}
    >
      <Form.Item
        name="name"
        label="Clinic Name"
        rules={[{ required: true, message: 'Please enter a clinic name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="location"
        label="Location"
        rules={[{ required: true, message: 'Please enter a location' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="rating"
        label="Rating"
        rules={[{ type: 'number', min: 0, max: 10, message: 'Rating must be between 0 and 10' }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="reviews"
        label="Reviews"
        rules={[{ type: 'number', min: 0, message: 'Reviews count must be non-negative' }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="services" label="Services (comma separated)">
        <Input placeholder="e.g. Cleaning, Whitening, Extraction" />
      </Form.Item>

      <Form.Item name="image" label="Image Emoji or URL">
        <Input />
      </Form.Item>

      <div className="flex justify-end gap-2">
        <Button onClick={onClose}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
  )
}

