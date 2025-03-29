import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
      <p className="text-gray-600 mb-4">
        Welcome to our ID Card Generator application. Your privacy is important
        to us, and this Privacy Policy outlines how we collect, use, and
        safeguard your personal information.
      </p>
      
      <h2 className="text-xl font-semibold text-gray-700 mt-4">1. Information We Collect</h2>
      <p className="text-gray-600 mb-2">
        We collect personal details required for generating ID cards, including:
      </p>
      <ul className="list-disc pl-6 text-gray-600">
        <li>Full Name</li>
        <li>Email Address</li>
        <li>Contact Number</li>
        <li>Student or Employee ID</li>
        <li>Profile Picture</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">2. How We Use Your Information</h2>
      <p className="text-gray-600 mb-2">
        The collected information is strictly used for generating ID cards and
        will not be shared with third parties.
      </p>
      
      <h2 className="text-xl font-semibold text-gray-700 mt-4">3. Data Security</h2>
      <p className="text-gray-600 mb-2">
        We implement security measures to protect your data, ensuring its
        confidentiality and preventing unauthorized access.
      </p>
      
      <h2 className="text-xl font-semibold text-gray-700 mt-4">4. Your Rights</h2>
      <p className="text-gray-600 mb-2">
        You have the right to request deletion or modification of your personal
        data at any time.
      </p>
      
      <h2 className="text-xl font-semibold text-gray-700 mt-4">5. Contact Us</h2>
      <p className="text-gray-600">
        If you have any questions regarding our Privacy Policy, please contact
        us.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
