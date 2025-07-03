import React from "react";
import HomeDental from "../assets/HomeDental.jpg";

function MidSection() {
  return (
    <>
      <div className="flex justify-center items-center gap-4 mt-10 bg-blue-100 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Image and text now inside same parent */}
          <img
            src={HomeDental}
            alt="HomeDental"
            className="w-200 h-auto object-cover rounded-md"
          />

          <div className="text-center md:text-left max-w-md">
            <h1 className="font-bold text-3xl text-blue-900">
              Avoid costly dental care abroad
            </h1>
            <p className="text-sm text-gray-700 mt-4">
              Get checked before you fly! Our pre-travel dental checkup service
              ensures you're ready for your journey without dental worries.
            </p>

            <div className="flex justify-center md:justify-start gap-5 mt-6">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-white text-lg font-semibold hover:bg-indigo-500"
              >
                Book Now
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-white text-lg font-semibold hover:bg-indigo-500"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 bg-indigo-100 mt-5 rounded-md">
        {/* Additional content can go here if needed */}
        <h1 className="font-bold text-2xl text-center mt-5">Key benefits</h1>
        <div className="flex flex-wrap  items-center mt-5 gap-4 justify-evenly">
          <div className="bg-indigo-300 shadow-md rounded-lg p-6 block items-center w-80 h-35 ">
            <h3 className="font-semibold mt-2">Save Money</h3>
            <p className="text-sm">
              Avoid expensive emergency dental treatments abroad with preventive
              care.
            </p>
          </div>
          <div className="bg-indigo-300 shadow-md rounded-lg p-6 block items-center w-80 h-35">
            <h3 className="font-semibold mt-2">Experts Clinic</h3>
            <p className="text-sm">
              Access our network of verified dental professionals across Nepal.
            </p>
          </div>
          <div className="bg-indigo-300 shadow-md rounded-lg p-6 block items-center w-80 h-35">
            <h3 className="font-semibold mt-2">E-Prescriptions</h3>
            <p className="text-sm">
              Get digital Prescriptions you can access anywhere during your
              travels.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-indigo-500 w-100% h-40 text-center mx-auto p-6 rounded-lg text-white flex flex-col ">
        <h2 className="font-semibold mt-2">Book your dental checkup today!</h2>
        <p className="text-sm">
          join thousands of Nepelese students and professionals who travel with
          confidence.
        </p>
        <div className="flex flex-wrap justify-center mt-4.5 ">
          <button
            className=" bg-purple-500 rounded-md hover:bg-purple-600 text-white font-semibold px-4 py-2"
            type="submit"
          >
            Get Started !
          </button>
        </div>
      </div>
    </>
  );
}

export default MidSection;