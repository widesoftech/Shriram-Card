// src/components/SubmissionSuccess.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

const SubmissionSuccess = () => {
//   const history = useHistory();
    const navigate = useNavigate();

  const handleBackToHome = () => {
    // history.push('/');
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-500">Success!</h2>
        <p className="text-lg text-center mb-6">Your data has been submitted successfully.</p>
        <button
          onClick={handleBackToHome}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
