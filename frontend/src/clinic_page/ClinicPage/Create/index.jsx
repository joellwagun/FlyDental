// Inside AddClinic.jsx

import React, { useEffect } from 'react'
import { Input, Button, Form, message, InputNumber } from 'antd'
import { addClinic, updateClinic } from '@/services/clinic'

export default function AddClinic({ onClose, onSuccess, initialValues }) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (initialValues) {
      // For editing, set initial values, ensuring services is a comma-separated string
      form.setFieldsValue({
        ...initialValues,
        services: initialValues.services?.join(', '), // Convert array to comma-separated string for the Input field
      })
    } else {
      // For adding new, ensure default numeric fields are not null for Ant Design's InputNumber
      form.setFieldsValue({
        services: '',
        rating: 0, // Set to 0, not null, for new clinic
        reviews: 0, // Set to 0, not null, for new clinic
      });
    }
  }, [initialValues, form])

  const handleFinish = async (values) => {
    // Convert services string into array for the backend Pydantic schema
    const servicesStr = values.services || ''
    const clinicData = {
      name: values.name,
      location: values.location,
      // Ensure rating and reviews are numbers, Ant Design's InputNumber should handle this
      rating: values.rating,
      reviews: values.reviews,
      services: servicesStr
        .split(',')
        .map(s => s.trim())
        .filter(Boolean), // Filter(Boolean) removes empty strings from the array
      image: values.image || null,
    }

    try {
      if (initialValues?.id) {
        // For update, send the specific ID
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
      // Safely extract and display validation errors from the backend
      const errorDetail = err.response?.data?.detail;
      if (Array.isArray(errorDetail)) {
        const errorMessages = errorDetail.map(errItem => {
          // errItem.loc[1] often gives the field name, errItem.msg is the error message
          return errItem.loc && errItem.loc.length > 1
            ? `${errItem.loc[1]}: ${errItem.msg}`
            : errItem.msg;
        }).join('; ');
        message.error(`Validation failed: ${errorMessages}`);
      } else if (typeof errorDetail === 'string') {
        message.error(errorDetail);
      } else {
        message.error('Operation failed: An unexpected error occurred.');
      }
    }
  }

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFinish}
      // initialValues are handled in useEffect for better control, remove from here
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