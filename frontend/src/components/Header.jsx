import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">DentalFly</h1>
          </div>

          {/* Navigation */}
        

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;