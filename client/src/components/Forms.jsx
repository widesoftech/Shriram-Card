// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { saveFormData } from '../services/opretions/fieldApi';
import toast from 'react-hot-toast';

function Forms() {

  const [formData, setFormData] = useState({
    name: '',
    class: '',
    section: '',
    dateofBirth: '',
    admissionNumber: '',
    rollNumber: '',
    contactNumber: '',
    emergencyContact: '',
    bloodGroup: '',
    uploadyourPhoto: '',
    address: '',
    modeoftransportation: '',
    designation: '',
    aadharCard: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async() => {
    // Handle form submission, for example, send data to an API
    console.log(formData);
    
  };

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-semibold p-4 md:p-10">WideSoftech Pvt. Ltd</h1>
            <p className="mb-4 md:mb-10">Select fields to be added in the ID Card</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center">
              <input type="radio" className="w-4 h-4 md:w-5 md:h-5" name="role" value="Student" />
              <label className="text-sm text-black ml-2 md:ml-4">Student</label>
            </div>
            <div className="flex items-center">
              <input type="radio" className="w-4 h-4 md:w-5 md:h-5" name="role" value="Staff" />
              <label className="text-sm text-black ml-2 md:ml-4">Staff</label>
            </div>
            <div className="flex items-center">
              <input type="radio" className="w-4 h-4 md:w-5 md:h-5" name="role" value="Employee" />
              <label className="text-sm text-black ml-2 md:ml-4">Employee</label>
            </div>
          </div>
        </div>

        <form className="font-[sans-serif] max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.keys(formData).map((field, index) => (
              <div key={index} className="relative flex items-center">
                <input
                  type={field.includes("date") || field.includes("number") ? "number" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                  value={formData[field]}
                  onChange={handleChange}
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                />
                <div>
                  <input type='checkbox' className='h-5 w-5 ml-2' />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-8 px-6 py-2.5 text-sm w-full bg-[#007bff] hover:bg-[#006bff] text-white rounded transition-all mb-16"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Forms;
