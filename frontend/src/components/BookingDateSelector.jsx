import React from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

const BookingDateSelector = ({ selectedDate, onDateSelect }) => {
  // Current month dates (example - you might want to generate these dynamically)
  const daysInMonth = 31;
  const availableDates = [3, 5, 7, 10, 12, 15, 17, 20, 22, 25, 27, 30]; // Example available dates
  
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Date</h2>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-purple-50 rounded-xl">
          <Calendar className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-900">July 2023</div>
          <div className="text-sm text-gray-500">Please select an available date highlighted in blue</div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mt-6">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const isAvailable = availableDates.includes(date);
          const isSelected = selectedDate === date;
          
          return (
            <button
              key={date}
              onClick={() => isAvailable && onDateSelect(date)}
              disabled={!isAvailable}
              className={`p-2 rounded-lg text-center transition-all duration-200 ${
                isSelected
                  ? 'bg-purple-600 text-white'
                  : isAvailable
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              {date}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BookingDateSelector;