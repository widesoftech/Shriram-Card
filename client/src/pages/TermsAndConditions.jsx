import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Terms and Conditions
      </h1>
      <p className="text-gray-600 mb-4">
        Welcome to our ID Card Generator application. By using our service, you
        agree to the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">
        1. Acceptance of Terms
      </h2>
      <p className="text-gray-600 mb-2">
        By accessing and using our application, you acknowledge that you have
        read, understood, and agreed to comply with these terms.
      </p>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">
        2. User Responsibilities
      </h2>
      <ul className="list-disc pl-6 text-gray-600">
        <li>Provide accurate and truthful information for ID generation.</li>
        <li>
          Ensure that the uploaded images and details comply with legal and
          ethical standards.
        </li>
        <li>Do not misuse the generated ID cards for fraudulent purposes.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">
        3. Data Privacy
      </h2>
      <p className="text-gray-600 mb-2">
        We collect and store personal information only for ID card generation.
        Your data will not be shared with third parties.
      </p>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">
        4. Termination of Use
      </h2>
      <p className="text-gray-600 mb-2">
        We reserve the right to suspend or terminate access if users violate our
        terms or engage in unlawful activities.
      </p>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">
        5. Changes to Terms
      </h2>
      <p className="text-gray-600 mb-2">
        We may update these terms from time to time. Continued use of the
        application after changes implies acceptance of the new terms.
      </p>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">
        6. Contact Us
      </h2>
      <p className="text-gray-600">
        If you have any questions regarding our Terms and Conditions, please
        contact us.
      </p>
    </div>
  );
};

export default TermsAndConditions;
