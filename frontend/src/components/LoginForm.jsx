import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ROLES, getNormalizedRole } from "../constants/roles";

const loginUser = async ({ email, password }) => {
  const response = await axios.post("http://localhost:8000/auth/login", {
    email,
    password,
  });
  return response.data;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const userData = await loginUser({ email, password });
      console.log("Login response:", userData);

      // Validate required fields
      if (!userData.role || !userData.user_id) {
        throw new Error("Invalid response from server - missing required fields");
      }

      // Store user data
      localStorage.setItem("token", userData.access_token);
      localStorage.setItem("role", userData.role);
      localStorage.setItem("user_id", userData.user_id);
      if (userData.clinic_id) {
        localStorage.setItem("clinic_id", userData.clinic_id);
      }

      // Determine redirect path based on normalized role
      const normalizedRole = getNormalizedRole(userData.role);
      console.log("Normalized role:", normalizedRole);

      switch (normalizedRole) {
        case ROLES.CLINIC:
          navigate("/clinic-dashboard");
          break;
        case ROLES.ADMIN:
          navigate("/admin-dashboard");
          break;
        default:
          navigate("/user-dashboard");
      }
    } catch (err) {
      const serverMsg = err.response?.data?.detail || err.message || "Login failed. Try again.";
      setError(serverMsg);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
        Sign in to your account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {typeof error === "string" ? error : error.msg || JSON.stringify(error)}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;