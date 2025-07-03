import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          FlyDental
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/clinics" className="hover:text-indigo-600">Clinics</Link>
          <Link to="/about" className="hover:text-indigo-600">About</Link>
          <Link to="/contact" className="hover:text-indigo-600">Contact</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/login" className="text-gray-700 hover:text-indigo-600">
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
