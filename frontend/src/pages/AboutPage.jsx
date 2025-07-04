import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl text-gray-800">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
        About FlyDental
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
          Travel Confidently. Smile Freely.
        </h2>
        <p className="text-base leading-relaxed">
          At <strong>FlyDental</strong>, we believe that a healthy smile is the
          first step toward a confident journey abroad. Every year, thousands of
          Nepalese students and professionals head to countries like the UK,
          USA, and Australia—but in the hustle of travel prep, dental care often
          gets overlooked. We’re here to change that.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
          Why FlyDental?
        </h2>
        <p className="text-base leading-relaxed">
          Dental care abroad is expensive and often difficult to access. What
          could be a simple fix in Nepal might turn into a painful, costly
          problem overseas. FlyDental helps prevent this by making{" "}
          <strong>pre-travel dental care</strong> easy, affordable, and
          accessible.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
          What We Offer
        </h2>
        <ul className="list-disc pl-6 text-base space-y-2">
          <li>
            <strong>Online Appointment Booking</strong> – Book dental checkups
            with trusted clinics across Nepal.
          </li>

          <li>
            <strong>Digital E-Prescriptions</strong> – Receive secure
            prescriptions for use abroad.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
          Who Is This For?
        </h2>
        <p className="text-base leading-relaxed">
          FlyDental is designed for{" "}
          <strong>Nepalese students and professionals</strong> preparing to go
          abroad. If you're on a tight schedule or worried about costly
          treatments overseas, this platform is for you.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
          Our Mission
        </h2>
        <p className="text-base leading-relaxed">
          Our mission is to make preventive dental care a routine part of travel
          prep. No more emergency toothaches in foreign countries. With
          FlyDental, you’ll be ready to fly with peace of mind.
        </p>
      </section>

      <section className="text-center mt-12">
        <h2 className="text-xl font-semibold mb-4">
          Join thousands of travelers taking charge of their dental health.
        </h2>
      </section>
    </div>
  );
};

export default About;