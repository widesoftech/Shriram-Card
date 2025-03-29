import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getFormFiels, saveFormData } from "../services/opretions/fieldApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Modal from "react-modal";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function Secondform() {
  const navigate = useNavigate();
  const { fieldsId, role } = useParams();

  const [formFields, setFormFields] = useState({});
  const [formData, setFormData] = useState({
    fieldsId,
    role,
    aadharnumber: "",
    name: "",
    section: "",
    contactNumber: "",
    address: "",
    Class: "",
    dateofBirth: "",
    uploadyourPassport: "",
    admissionNo: "",
    bloodGroup: "",
    designation: "",
    rollNo: "",
    emergencyConNo: "",
    modeOfTransportation: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getFilds = async () => {
    const data = await getFormFiels({ _id: fieldsId });
    setFormFields(data.formfield);
  };

  useEffect(() => {
    getFilds();
  }, [fieldsId, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleFileChange = (e) => {

  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => setImage(reader.result);
  //     reader.readAsDataURL(file);
  //   }

  // };

  //  const getCroppedImage = () => {
  //     if (cropperRef.current) {
  //       const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
  //       croppedCanvas.toBlob((blob) => setCroppedImage(blob), "image/jpeg");
  //     }
  //   };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setFormData({ ...formData, uploadyourPassport: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const getCroppedImage = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      if (croppedCanvas) {
        croppedCanvas.toBlob((blob) => {
          setCroppedImage(blob);
          setFormData({ ...formData, uploadyourPassport: blob });
        }, "image/jpeg");
      }
    }
  };

  const handleSubmit = () => {
    setModalIsOpen(true);
  };

  const confirmSubmit = async () => {
    const response = await saveFormData(formData, navigate);
    console.log("response: ", response);
    setModalIsOpen(false);
  };

  const {
    aadharCard,
    address,
    admissionNumber,
    bloodGroup,
    classN,
    contactNumber,
    dateofBirth,
    designation,
    emergencyContact,
    modeOfTransportation,
    name,
    rollNumber,
    section,
    uploadYourPhoto,
  } = formFields;

  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);

  useEffect(() => {
    if (formData.uploadyourPassport) {
      const image = URL.createObjectURL(formData.uploadyourPassport);
      setImage(image);
    }
  }, [formData.uploadyourPassport]);

  return (
    <div className="mt-6 mb-6">
      <div className="font-[sans-serif] max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <form className="font-[sans-serif] max-w-4xl mx-auto">
          <h3 className=" text-lg py-4">
            <span className=" text-blue-700">Note: </span>Please Insert All
            Fields Properly
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {aadharCard && (
              <div className="relative flex flex-col items-start">
                <label
                  htmlFor="aadharnumber"
                  className="mb-2 text-sm text-gray-700"
                >
                  Aadhar Number <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="aadharnumber"
                  id="aadharnumber"
                  placeholder="Aadhar Number"
                  value={formData.aadharnumber}
                  onChange={handleChange}
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                  required
                />
              </div>
            )}
            {name && (
              <div className="relative flex flex-col items-start">
                <label htmlFor="name" className="mb-2 text-sm text-gray-700">
                  Name<span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Student Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                  required
                />
              </div>
            )}
            {section && (
              <div className="relative flex flex-col items-start">
                <label htmlFor="section" className="mb-2 text-sm text-gray-700">
                  Section <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="section"
                  placeholder="Section"
                  value={formData.section}
                  onChange={handleChange}
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                  required
                />
              </div>
            )}
            {contactNumber && (
              <div className="relative flex flex-col items-start">
                <label
                  htmlFor="contactNumber"
                  className="mb-2 text-sm text-gray-700"
                >
                  Contact Number <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                  required
                />
              </div>
            )}
            {address && (
              <div className="relative flex flex-col items-start">
                <label htmlFor="address" className="mb-2 text-sm text-gray-700">
                  Address <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  maxLength={50}
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                  required
                />
              </div>
            )}
            {classN && (
              <div className="relative flex flex-col items-start">
                <label htmlFor="Class" className="mb-2 text-sm text-gray-700">
                  Class <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="Class"
                  placeholder="Class"
                  value={formData.Class}
                  onChange={handleChange}
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                  required
                />
              </div>
            )}
            {admissionNumber && (
              <div className="relative flex flex-col items-start">
                <label
                  htmlFor="admissionNo"
                  className="mb-2 text-sm text-gray-700"
                >
                  Admission Number <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="admissionNo"
                  placeholder="Admission Number"
                  value={formData.admissionNo}
                  onChange={handleChange}
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent
                   text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                  required
                />
              </div>
            )}
            {bloodGroup && (
              <div className="relative flex flex-col items-start">
                <label
                  htmlFor="bloodGroup"
                  className="mb-2 text-sm text-gray-700"
                >
                  Blood Group <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="bloodGroup"
                  placeholder="Type here"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                  required
                />
              </div>
            )}
            {designation && (
              <div className="relative flex flex-col items-start">
                <label
                  htmlFor="designation"
                  className="mb-2 text-sm text-gray-700"
                >
                  Designation <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="designation"
                  placeholder="Designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                  required
                />
              </div>
            )}
            {rollNumber && (
              <div className="relative flex flex-col items-start">
                <label htmlFor="rollNo" className="mb-2 text-sm text-gray-700">
                  Roll Number <span className="text-red-700">*</span>
                </label>
                <input
                  type="number"
                  name="rollNo"
                  placeholder="Roll Number"
                  value={formData.rollNo}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                />
              </div>
            )}
            {emergencyContact && (
              <div className="relative flex flex-col items-start">
                <label
                  htmlFor="emergencyConNo"
                  className="mb-2 text-sm text-gray-700"
                >
                  Emergency Contact No. <span className="text-red-700">*</span>
                </label>
                <input
                  type="number"
                  name="emergencyConNo"
                  placeholder="Emergency Contact No."
                  value={formData.emergencyConNo}
                  onChange={handleChange}
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                  required
                />
              </div>
            )}
            {modeOfTransportation && (
              <div className="relative flex flex-col items-start">
                <label
                  htmlFor="modeOfTransportation"
                  className="mb-2 text-sm text-gray-700"
                >
                  Mode Of Transportation <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="modeOfTransportation"
                  placeholder="Mode Of Transportation"
                  value={formData.modeOfTransportation}
                  onChange={handleChange}
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                  required
                />
              </div>
            )}
            {dateofBirth && (
              <div className="relative flex flex-col items-start">
                <label
                  htmlFor="dateofBirth"
                  className="mb-2 text-sm text-gray-700"
                >
                  Date Of Birth <span className="text-red-700">*</span>
                </label>
                <input
                  type="date"
                  name="dateofBirth"
                  placeholder="Date of Birth"
                  value={formData.dateofBirth}
                  onChange={handleChange}
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border
                 outline-[#007bff] rounded transition-all"
                  required
                />
              </div>
            )}
            {uploadYourPhoto && (
              <div className="relative flex flex-col items-start">
                <label
                  htmlFor="uploadyourPassport"
                  className="mb-2 text-sm text-gray-700"
                >
                  Upload Your Passport <span className="text-red-700">*</span>
                </label>
                <p className=" text-[0.6rem] text-red-400">
                  Please Provied Clear Pasport Size Photo
                </p>
                {/* <input
                  type="file"
                  name="uploadyourPassport"
                  onChange={handleFileChange}
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                  required
                /> */}
                <div className='img-crop'>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {image && (
                    <Cropper
                      src={image}
                      className="img-crop"
                      style={{ height: 400, width: "100%" }}
                      initialAspectRatio={1}
                      aspectRatio={1}
                      guides={false}
                      ref={cropperRef}
                    />
                  )}
                  <button className="bg-green-500 border rounded-md p-2 text-white font-bold" onClick={getCroppedImage}>Crop img</button>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center mt-4">
            <input type="checkbox" id="acceptTerms" className="mr-3" required />
            <label htmlFor="acceptTerms" className="text-sm text-gray-700">
              I accept the above information is true and correct{" "}
              <span className="text-red-700">*</span>
            </label>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              className="mt-8 px-6 py-2.5 text-sm w-[20%] bg-[#007bff] hover:bg-[#006bff] text-white rounded transition-all mb-16"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-8 px-6 py-2.5 text-sm w-[20%] bg-[#007bff] hover:bg-[#006bff] text-white rounded transition-all mb-16"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {/* <Modal
        className={` w-3/12 m-auto mt-20 h-[30rem] `}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirm Submission"
      >
        <h2 className=" text-center text-3xl font-semibold py-3">
          Confirm Submission
        </h2>

        <div className=" w-[20rem] mx-auto flex flex-col justify-center align-middle items-center ">
          <img src={image} className=" mx-auto mb-5 " width={130} alt="" />
          <div className=" w-full ml-10">
            {formData.name && (
              <p className=" text-xl">
                <span className=" pr-4 font-semibold">Name:</span>{" "}
                {formData.name}
              </p>
            )}
            {formData.designation && (
              <p className=" text-xl">
                <span className=" pr-4 font-semibold">Designation: </span>
                {formData.designation}
              </p>
            )}
            {formData.Class && (
              <p className=" text-xl">
                <span className=" pr-4 font-semibold">Class: </span>
                {formData.Class}
              </p>
            )}
            {formData.rollNo && (
              <p className=" text-xl">
                <span className=" pr-4 font-semibold">Roll Number: </span>
                {formData.rollNo}
              </p>
            )}
            {formData.dateofBirth && (
              <p className=" text-xl">
                <span className=" pr-4 font-semibold">Date Of Birth: </span>
                {formData.dateofBirth}
              </p>
            )}
            {formData.contactNumber && (
              <p className=" text-xl">
                <span className=" pr-4 font-semibold">Contact Number: </span>
                {formData.contactNumber}
              </p>
            )}
            {formData.section && (
              <p className=" text-xl">
                <span className=" pr-4 font-semibold">Section: </span>
                {formData.section}
              </p>
            )}
            {formData.bloodGroup && (
              <p className=" text-xl">
                <span className=" pr-4 font-semibold">Blood Group: </span>
                {formData.bloodGroup}
              </p>
            )}
            {formData.admissionNo && (
              <p className=" text-xl">
                <span className=" pr-4 font-semibold">Admission Number: </span>
                {formData.admissionNo}
              </p>
            )}
            {formData.emergencyConNo && (
              <p className=" text-xl">
                <span className=" pr-4 font-semibold">
                  Emergency Contact No.:{" "}
                </span>
                {formData.emergencyConNo}
              </p>
            )}
            {formData.aadharnumber && (
              <p className=" text-xl">
                <span className=" pr-4 font-semibold">Aadhar Number: </span>
                {formData.aadharnumber}
              </p>
            )}
            {formData.modeOfTransportation && (
              <p className=" text-xl">
                <span className=" pr-4 font-semibold">
                  Mode Of Transportation:{" "}
                </span>
                {formData.modeOfTransportation}
              </p>
            )}
            {formData.address && (
              <p className=" text-xl">
                <span className=" pr-4 font-semibold">Address: </span>
                {formData.address}
              </p>
            )}
           
          </div>
        </div>
        <div className=" flex gap-10 justify-center">
          <button
            onClick={() => setModalIsOpen(false)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={confirmSubmit}
            className="mt-4 ml-2 px-4 py-2 bg-green-600 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </Modal> */}

      <Modal
        className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-3/12 m-auto mt-10 sm:mt-20 h-auto max-h-[90vh] overflow-auto p-4 bg-white rounded-lg shadow-lg"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirm Submission"
      >
        <h2 className="text-center text-2xl sm:text-3xl font-semibold py-3">
          Confirm Submission
        </h2>
        <div className="w-full sm:w-[20rem] mx-auto flex flex-col justify-center items-center">
          <img src={image} className="mx-auto mb-5 w-24 sm:w-32" alt="" />
          <div className="w-full px-4 sm:px-10">
            {formData.name && (
              <p className="text-base sm:text-xl">
                <span className="pr-2 font-semibold">Name:</span>
                {formData.name}
              </p>
            )}
            {formData.designation && (
              <p className="text-base sm:text-xl">
                <span className="pr-2 font-semibold">Designation:</span>
                {formData.designation}
              </p>
            )}
            {formData.Class && (
              <p className="text-base sm:text-xl">
                <span className="pr-2 font-semibold">Class:</span>
                {formData.Class}
              </p>
            )}
            {formData.rollNo && (
              <p className="text-base sm:text-xl">
                <span className="pr-2 font-semibold">Roll Number:</span>
                {formData.rollNo}
              </p>
            )}
            {formData.dateofBirth && (
              <p className="text-base sm:text-xl">
                <span className="pr-2 font-semibold">Date Of Birth:</span>
                {new Date(formData.dateofBirth)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, "/")}{" "}
              </p>
            )}
            {formData.contactNumber && (
              <p className="text-base sm:text-xl">
                <span className="pr-2 font-semibold">Contact Number:</span>
                {formData.contactNumber}
              </p>
            )}
            {formData.section && (
              <p className="text-base sm:text-xl">
                <span className="pr-2 font-semibold">Section:</span>
                {formData.section}
              </p>
            )}
            {formData.bloodGroup && (
              <p className="text-base sm:text-xl">
                <span className="pr-2 font-semibold">Blood Group:</span>
                {formData.bloodGroup}
              </p>
            )}
            {formData.admissionNo && (
              <p className="text-base sm:text-xl">
                <span className="pr-2 font-semibold">Admission Number:</span>
                {formData.admissionNo}
              </p>
            )}
            {formData.emergencyConNo && (
              <p className="text-base sm:text-xl">
                <span className="pr-2 font-semibold">
                  Emergency Contact No.:
                </span>
                {formData.emergencyConNo}
              </p>
            )}
            {formData.aadharnumber && (
              <p className="text-base sm:text-xl">
                <span className="pr-2 font-semibold">Aadhar Number:</span>
                {formData.aadharnumber}
              </p>
            )}
            {formData.modeOfTransportation && (
              <p className="text-base sm:text-xl">
                <span className="pr-2 font-semibold">
                  Mode Of Transportation:
                </span>
                {formData.modeOfTransportation}
              </p>
            )}
            {formData.address && (
              <p className="text-base sm:text-xl">
                <span className="pr-2 font-semibold">Address:</span>
                {formData.address}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 justify-center mt-4">
          <button
            onClick={() => setModalIsOpen(false)}
            className="px-4 py-2 bg-red-600 text-white rounded w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={confirmSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded w-full sm:w-auto"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Secondform;

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { getFormFiels, saveFormData } from "../services/opretions/fieldApi";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import Modal from "react-modal";
// function Secondform() {
//   const navigate = useNavigate();
//   const { fieldsId, role } = useParams();

//   const [formFields, setFormFields] = useState({});
//   const [formData, setFormData] = useState({
//     fieldsId,
//     role,
//     aadharnumber: "",
//     name: "",
//     section: "",
//     contactNumber: "",
//     address: "",
//     Class: "",
//     dateofBirth: "",
//     uploadyourPassport: "",
//     admissionNo: "",
//     bloodGroup: "",
//     designation: "",
//     rollNo: "",
//     emergencyConNo: "",
//     modeOfTransportation: "",
//   });
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const getFilds = async () => {
//     const data = await getFormFiels({ _id: fieldsId });
//     setFormFields(data.formfield);
//   };

//   useEffect(() => {
//     getFilds();
//   }, [fieldsId, role]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files[0],
//     });
//   };

//   const handleSubmit = () => {
//     setModalIsOpen(true);
//   };

//   const confirmSubmit = async () => {
//     const response = await saveFormData(formData, navigate);
//     console.log("response: ", response);
//     setModalIsOpen(false);
//   };

//   const {
//     aadharCard,
//     address,
//     admissionNumber,
//     bloodGroup,
//     classN,
//     contactNumber,
//     dateofBirth,
//     designation,
//     emergencyContact,
//     modeOfTransportation,
//     name,
//     rollNumber,
//     section,
//     uploadYourPhoto,
//   } = formFields;

//   const [image, setImage] = useState("");

//   useEffect(() => {
//     if (formData.uploadyourPassport) {
//       const image = URL.createObjectURL(formData.uploadyourPassport);
//       setImage(image);
//     }
//   }, [formData.uploadyourPassport]);

//   return (
//     <div className="mt-6 mb-6">
//       <div className="font-[sans-serif] max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//         <form className="font-[sans-serif] max-w-4xl mx-auto">
//           <h3 className=" text-lg py-4">
//             <span className=" text-blue-700">Note: </span>Please Insert All
//             Fields Properly
//           </h3>
//           <div className="grid sm:grid-cols-2 gap-4">
//             {aadharCard && (
//               <div className="relative flex flex-col items-start">
//                 <label
//                   htmlFor="aadharnumber"
//                   className="mb-2 text-sm text-gray-700"
//                 >
//                   Aadhar Number <span className="text-red-700">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="aadharnumber"
//                   id="aadharnumber"
//                   placeholder="Aadhar Number"
//                   value={formData.aadharnumber}
//                   onChange={handleChange}
//                   className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
//                   required
//                 />
//               </div>
//             )}
//             {name && (
//               <div className="relative flex flex-col items-start">
//                 <label htmlFor="name" className="mb-2 text-sm text-gray-700">
//                   Name<span className="text-red-700">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Student Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
//                   required
//                 />
//               </div>
//             )}
//             {section && (
//               <div className="relative flex flex-col items-start">
//                 <label htmlFor="section" className="mb-2 text-sm text-gray-700">
//                   Section <span className="text-red-700">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="section"
//                   placeholder="Section"
//                   value={formData.section}
//                   onChange={handleChange}
//                   className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
//                   required
//                 />
//               </div>
//             )}
//             {contactNumber && (
//               <div className="relative flex flex-col items-start">
//                 <label
//                   htmlFor="contactNumber"
//                   className="mb-2 text-sm text-gray-700"
//                 >
//                   Contact Number <span className="text-red-700">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="contactNumber"
//                   placeholder="Contact Number"
//                   value={formData.contactNumber}
//                   onChange={handleChange}
//                   className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
//                   required
//                 />
//               </div>
//             )}
//             {address && (
//               <div className="relative flex flex-col items-start">
//                 <label htmlFor="address" className="mb-2 text-sm text-gray-700">
//                   Address <span className="text-red-700">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   maxLength={50}
//                   className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
//                   required
//                 />
//               </div>
//             )}
//             {classN && (
//               <div className="relative flex flex-col items-start">
//                 <label htmlFor="Class" className="mb-2 text-sm text-gray-700">
//                   Class <span className="text-red-700">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="Class"
//                   placeholder="Class"
//                   value={formData.Class}
//                   onChange={handleChange}
//                   className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
//                   required
//                 />
//               </div>
//             )}
//             {admissionNumber && (
//               <div className="relative flex flex-col items-start">
//                 <label
//                   htmlFor="admissionNo"
//                   className="mb-2 text-sm text-gray-700"
//                 >
//                   Admission Number <span className="text-red-700">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="admissionNo"
//                   placeholder="Admission Number"
//                   value={formData.admissionNo}
//                   onChange={handleChange}
//                   className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
//                   required
//                 />
//               </div>
//             )}
//             {bloodGroup && (
//               <div className="relative flex flex-col items-start">
//                 <label
//                   htmlFor="bloodGroup"
//                   className="mb-2 text-sm text-gray-700"
//                 >
//                   Blood Group <span className="text-red-700">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="bloodGroup"
//                   placeholder="Type here"
//                   value={formData.bloodGroup}
//                   onChange={handleChange}
//                   className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
//                   required
//                 />
//               </div>
//             )}
//             {designation && (
//               <div className="relative flex flex-col items-start">
//                 <label
//                   htmlFor="designation"
//                   className="mb-2 text-sm text-gray-700"
//                 >
//                   Designation <span className="text-red-700">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="designation"
//                   placeholder="Designation"
//                   value={formData.designation}
//                   onChange={handleChange}
//                   className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
//                   required
//                 />
//               </div>
//             )}
//             {rollNumber && (
//               <div className="relative flex flex-col items-start">
//                 <label htmlFor="rollNo" className="mb-2 text-sm text-gray-700">
//                   Roll Number <span className="text-red-700">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="rollNo"
//                   placeholder="Roll Number"
//                   value={formData.rollNo}
//                   onChange={handleChange}
//                   required
//                   className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
//                 />
//               </div>
//             )}
//             {emergencyContact && (
//               <div className="relative flex flex-col items-start">
//                 <label
//                   htmlFor="emergencyConNo"
//                   className="mb-2 text-sm text-gray-700"
//                 >
//                   Emergency Contact No. <span className="text-red-700">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="emergencyConNo"
//                   placeholder="Emergency Contact No."
//                   value={formData.emergencyConNo}
//                   onChange={handleChange}
//                   className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
//                   required
//                 />
//               </div>
//             )}
//             {modeOfTransportation && (
//               <div className="relative flex flex-col items-start">
//                 <label
//                   htmlFor="modeOfTransportation"
//                   className="mb-2 text-sm text-gray-700"
//                 >
//                   Mode Of Transportation <span className="text-red-700">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="modeOfTransportation"
//                   placeholder="Mode Of Transportation"
//                   value={formData.modeOfTransportation}
//                   onChange={handleChange}
//                   className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
//                   required
//                 />
//               </div>
//             )}
//             {dateofBirth && (
//               <div className="relative flex flex-col items-start">
//                 <label
//                   htmlFor="dateofBirth"
//                   className="mb-2 text-sm text-gray-700"
//                 >
//                   Date Of Birth <span className="text-red-700">*</span>
//                 </label>
//                 <input
//                   type="date"
//                   name="dateofBirth"
//                   placeholder="Date of Birth"
//                   value={formData.dateofBirth}
//                   onChange={handleChange}
//                   className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
//                   required
//                 />
//               </div>
//             )}
//             {uploadYourPhoto && (
//               <div className="relative flex flex-col items-start">
//                 <label
//                   htmlFor="uploadyourPassport"
//                   className="mb-2 text-sm text-gray-700"
//                 >
//                   Upload Your Passport <span className="text-red-700">*</span>
//                 </label>
//                 <p className=" text-[0.6rem] text-red-400">
//                   Please Provied Clear Pasport Size Photo
//                 </p>
//                 <input
//                   type="file"
//                   name="uploadyourPassport"
//                   onChange={handleFileChange}
//                   className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
//                   required
//                 />
//               </div>
//             )}
//           </div>
//           <div className="flex items-center mt-4">
//             <input type="checkbox" id="acceptTerms" className="mr-3" required />
//             <label htmlFor="acceptTerms" className="text-sm text-gray-700">
//               I accept the above information is true and correct{" "}
//               <span className="text-red-700">*</span>
//             </label>
//           </div>
//           <div className="flex gap-4">
//             <button
//               type="button"
//               className="mt-8 px-6 py-2.5 text-sm w-[20%] bg-[#007bff] hover:bg-[#006bff] text-white rounded transition-all mb-16"
//               onClick={() => navigate(-1)}
//             >
//               Back
//             </button>
//             <button
//               type="button"
//               onClick={handleSubmit}
//               className="mt-8 px-6 py-2.5 text-sm w-[20%] bg-[#007bff] hover:bg-[#006bff] text-white rounded transition-all mb-16"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Confirmation Modal */}
//       <Modal
//         className={` w-3/12 m-auto mt-20 h-[30rem] `}
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//         contentLabel="Confirm Submission"
//       >
//         <h2 className=" text-center text-3xl font-semibold py-3">
//           Confirm Submission
//         </h2>
//         <div className=" w-[20rem] mx-auto flex flex-col justify-center align-middle items-cente  ">
//           <img src={image} className=" mx-auto mb-5 " width={130} alt="" />
//           <div className=" w-full ml-10">
//             {formData.name && (
//               <p className=" text-xl">
//                 <span className=" pr-4 font-semibold">Name:</span>{" "}
//                 {formData.name}
//               </p>
//             )}
//             {formData.designation && (
//               <p className=" text-xl">
//                 <span className=" pr-4 font-semibold">Designation: </span>
//                 {formData.designation}
//               </p>
//             )}
//             {formData.Class && (
//               <p className=" text-xl">
//                 <span className=" pr-4 font-semibold">Class: </span>
//                 {formData.Class}
//               </p>
//             )}
//             {formData.rollNo && (
//               <p className=" text-xl">
//                 <span className=" pr-4 font-semibold">Roll Number: </span>
//                 {formData.rollNo}
//               </p>
//             )}
//             {formData.dateofBirth && (
//               <p className=" text-xl">
//                 <span className=" pr-4 font-semibold">Date Of Birth: </span>
//                 {formData.dateofBirth}
//               </p>
//             )}
//             {formData.contactNumber && (
//               <p className=" text-xl">
//                 <span className=" pr-4 font-semibold">Contact Number: </span>
//                 {formData.contactNumber}
//               </p>
//             )}
//             {formData.section && (
//               <p className=" text-xl">
//                 <span className=" pr-4 font-semibold">Section: </span>
//                 {formData.section}
//               </p>
//             )}
//             {formData.bloodGroup && (
//               <p className=" text-xl">
//                 <span className=" pr-4 font-semibold">Blood Group: </span>
//                 {formData.bloodGroup}
//               </p>
//             )}
//             {formData.admissionNo && (
//               <p className=" text-xl">
//                 <span className=" pr-4 font-semibold">Admission Number: </span>
//                 {formData.admissionNo}
//               </p>
//             )}
//             {formData.emergencyConNo && (
//               <p className=" text-xl">
//                 <span className=" pr-4 font-semibold">
//                   Emergency Contact No.:{" "}
//                 </span>
//                 {formData.emergencyConNo}
//               </p>
//             )}
//             {formData.aadharnumber && (
//               <p className=" text-xl">
//                 <span className=" pr-4 font-semibold">Aadhar Number: </span>
//                 {formData.aadharnumber}
//               </p>
//             )}
//             {formData.modeOfTransportation && (
//               <p className=" text-xl">
//                 <span className=" pr-4 font-semibold">
//                   Mode Of Transportation:{" "}
//                 </span>
//                 {formData.modeOfTransportation}
//               </p>
//             )}
//             {formData.address && (
//               <p className=" text-xl">
//                 <span className=" pr-4 font-semibold">Address: </span>
//                 {formData.address}
//               </p>
//             )}

//           </div>
//         </div>
//         <div className=" flex gap-10 justify-center">
//           <button
//             onClick={() => setModalIsOpen(false)}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={confirmSubmit}
//             className="mt-4 ml-2 px-4 py-2 bg-green-600 text-white rounded"
//           >
//             Confirm
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default Secondform;
