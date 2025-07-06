// RegisterPage.jsx
import React, { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    // First Name
    if (!formData.firstName) {
      errs.firstName = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      errs.firstName = "First name must contain only letters";
    }

    // Last Name
    if (!formData.lastName) {
      errs.lastName = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      errs.lastName = "Last name must contain only letters";
    }

    // Age
    if (!formData.age) {
      errs.age = "Age is required";
    } else if (isNaN(formData.age) || formData.age < 2 || formData.age > 100) {
      errs.age = "Age must be between 2 and 100";
    }

    // Email
    if (!formData.email) {
      errs.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = "Invalid email format";
    }

    // Phone
    if (!formData.phone) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errs.phone = "Phone number must be 10 digits";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Registration successful!");
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        phone: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border border-gray-300 rounded-lg shadow-lg font-sans">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* First Name */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.firstName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.lastName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="age">
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.age
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.age && (
            <p className="text-red-600 text-sm mt-1">{errors.age}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
