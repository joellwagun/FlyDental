import React from "react";

function Footer() {
  return (
    <>
      <div className="container mx-auto px-4 py-8 bg-indigo-100 mt-5 rounded-md">
        {/* Additional content can go here if needed */}
        <h1 className="font-bold text-2xl text-center mt-5">How it works?</h1>
        <div className="flex flex-wrap text-left mt-5 gap-4 justify-evenly">
          <div className="bg-indigo-200 shadow-md rounded-lg p-6 block  w-80 h-35 ">
            <h3 className="font-semibold mt-2  text-green-600">Step 1</h3>
            <h3 className="font-semibold mt-2">Choose a Clinic</h3>
            <p className="text-sm mt-1.5">
              Browse our network of verified dental clinics near you.
            </p>
          </div>
          <div className="bg-indigo-200 shadow-md rounded-lg p-6 block items-center w-80 h-35">
            <h3 className="font-semibold mt-2 text-green-600"> Step 2</h3>
            <h3 className="font-semibold mt-2">Book Appointment</h3>
            <p className="text-sm mt-1.5">
              Select a convenient date and time for your pre-travel checkup.
            </p>
          </div>
          <div className="bg-indigo-200 shadow-md rounded-lg p-6 block items-center w-80 h-35">
            <h3 className="font-semibold mt-2 text-green-600"> Step 3</h3>
            <h3 className="font-semibold mt-2">Get checked</h3>
            <p className="text-sm mt-1.5">
              Visit the clinic a recieve your digital health certificate
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="container mx-auto px-4 py-8 bg-indigo-100 mt-5 rounded-md">
          {/* Additional content can go here if needed */}
          <h1 className="font-bold text-2xl text-center mt-5">
            Featured Partner Clinics
          </h1>
          <div className="flex flex-wrap text-left mt-5 gap-4 justify-evenly">
            <div className="bg-indigo-200 shadow-md rounded-lg p-6 block  w-80 h-35 text-left">
              <h3 className="font-semibold mt-2">Smile Dental Care</h3>
              <div className="flex flex-wrap items-start mt-2 justify-between">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-500 px-4 py-2 text-white text-lg font-semibold hover:bg-indigo-400 mt-2 h-10"
                >
                  Book Now
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-500 px-4 py-2 text-white text-lg font-semibold hover:bg-indigo-400 mt-2 h-10"
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="bg-indigo-200 shadow-md rounded-lg p-6 block items-center w-80 h-35">
              <h3 className="font-semibold mt-2">Everest Dental Clinic</h3>
              <div className="flex flex-wrap items-start mt-2 justify-between">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-500 px-4 py-2 text-white text-lg font-semibold hover:bg-indigo-400 mt-2 h-10"
                >
                  Book Now
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-500 px-4 py-2 text-white text-lg font-semibold hover:bg-indigo-400 mt-2 h-10"
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="bg-indigo-200 shadow-md rounded-lg p-6 block items-center w-80 h-35">
              <h3 className="font-semibold mt-2">Global Dental Center</h3>
              <div className="flex flex-wrap items-start mt-2 justify-between">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-500 px-4 py-2 text-white text-lg font-semibold hover:bg-indigo-400 mt-2 h-10"
                >
                  Book Now
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-500 px-4 py-2 text-white text-lg font-semibold hover:bg-indigo-400 mt-2 h-10"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
