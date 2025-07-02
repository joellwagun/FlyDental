import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md w-full">
      <div className="px-8 py-4 flex items-center justify-between w-full">
        {/* Logo */}
        <div className="text-3xl font-bold text-indigo-600">FlyDental</div>

        {/* Nav links container */}
        <div className="flex justify-between items-center w-full ml-20">
          {/* Left links */}
          <div className="flex gap-10 text-gray-700 font-medium mt-1">
            <Link to="/" className="hover:text-indigo-600">
              Home
            </Link>
            <Link to="/about" className="hover:text-indigo-600">
              About
            </Link>
            <Link to="/appointment" className="hover:text-indigo-600">
              Appointment
            </Link>
          </div>

          {/* Right links */}
          <div className="flex gap-6 text-gray-700 font-medium ml-auto mt-1">
            <Link to="/" className="hover:text-indigo-600">
              Home
            </Link>
            <Link to="/login" className="hover:text-indigo-600">
              Login
            </Link>
            <Link to="/register" className="hover:text-indigo-600">
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
