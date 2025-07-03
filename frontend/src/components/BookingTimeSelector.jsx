
import React, { useState } from 'react';
import { Clock } from 'lucide-react';

const BookingTimeSelector = ({ selectedTime, onTimeSelect }) => {
  const [activeTab, setActiveTab] = useState('Morning');

  const timeSlots = {
    Morning: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    Afternoon: ['2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM']
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Time</h2>
      
      {/* Time Period Tabs */}
      <div className="flex gap-1 mb-6">
        {['Morning', 'Afternoon'].map((period) => (
          <button
            key={period}
            onClick={() => setActiveTab(period)}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === period
                ? 'text-gray-900 border-b-2 border-gray-900 bg-transparent'
                : 'text-gray-500 hover:text-gray-700 bg-transparent'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-3 gap-4">
        {timeSlots[activeTab].map((time) => (
          <button
            key={time}
            onClick={() => onTimeSelect(time)}
            className={`p-4 rounded-2xl border transition-all duration-200 hover:shadow-md hover:scale-105 ${
              selectedTime === time
                ? 'border-purple-300 bg-purple-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <Clock className={`w-5 h-5 ${selectedTime === time ? 'text-purple-600' : 'text-gray-400'}`} />
              <span className={`font-medium ${selectedTime === time ? 'text-purple-900' : 'text-gray-900'}`}>
                {time}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookingTimeSelector;
