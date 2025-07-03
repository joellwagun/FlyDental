import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 mt-12 border-t">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">&copy; {new Date().getFullYear()} Smile Dental Clinic. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0 text-sm">
          <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600">Terms</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
