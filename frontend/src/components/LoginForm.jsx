import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      if (role === "clinic") {
        navigate("/clinic-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-900"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-900"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-lg font-medium text-gray-900"
          >
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600"
          >
            <option value="user">User</option>
            <option value="clinic">Clinic</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-white text-lg font-semibold hover:bg-indigo-500"
        >
          Sign in
        </button>
      </form>

      <div className="mt-5 text-center text-sm hover:text-indigo-500 hover:underline">
        <a href="#">Forgot password?</a>
      </div>
    </div>
  );
};

export default LoginForm;