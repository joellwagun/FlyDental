import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex flex-wrap text-2xl font-bold text-indigo-600"
        >
          FlyDental
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-indigo-600">
            Home
          </Link>
          <Link to="/clinics" className="hover:text-indigo-600">
            Clinics
          </Link>
          <Link to="/about" className="hover:text-indigo-600">
            About
          </Link>
          <Link to="/contact" className="hover:text-indigo-600">
            Contact
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex flex-wrap gap-6 text-sm font-medium">
          <Link
            to="/login"
            className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
