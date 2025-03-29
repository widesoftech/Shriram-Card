import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          About Us
        </h2>
        <p className="text-gray-700 text-lg text-center mb-6">
          Welcome to <span className="font-semibold">Shriram ID Cards</span>, your trusted platform for generating high-quality ID cards for students and employees.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              We aim to simplify the process of ID card creation by offering an easy-to-use platform that ensures accuracy, professionalism, and efficiency.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              What We Offer
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Custom ID card templates</li>
              <li>Fast and secure processing</li>
              <li>Downloadable and printable formats</li>
              <li>Bulk ID card generation for institutions</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-700">
            Let us help you create professional ID cards effortlessly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
