// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import html2canvas from "html2canvas";
// import JSZip from "jszip";

// import Temp from "../assets/VTemp1.jpeg";
// import img0 from "../assets/NHTemp1.jpeg";
// import img from "../assets/NHTemp1.jpeg";
// import img1 from "../assets/NHTemp2.jpeg";
// import img2 from "../assets/NHTemp3.jpeg";
// import img3 from "../assets/NVTemp1.jpg";
// import img4 from "../assets/NVTemp2.jpeg";
// import img5 from "../assets/NVTemp2.jpg";
// import toast, { Toaster } from "react-hot-toast";

// const ImageSwiper = () => {
//   const [images, setImages] = useState([]);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(Temp);
//   const [selectedFormat, setSelectedFormat] = useState(1);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/v1/template"
//         );
//         setImages(response.data);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     };

//     fetchImages();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/v1/data/getAllEntryes"
//         );
//         setData(response.data.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Function to capture a single ID card
//   const captureCard = async (index) => {
//     const cardRef = document.getElementById(`card-${index}`);
//     if (!cardRef) {
//       console.error("Card reference is null!");
//       return null;
//     }

//     await new Promise((resolve) => setTimeout(resolve, 500)); 
//     const canvas = await html2canvas(cardRef, {
//       scale: 2,
//       useCORS: true,
//       logging: true,
//     });

//     return canvas.toDataURL("image/png");
//   };

//   const handleDownload = async (index) => {
//     const cardRef = document.getElementById(`card-${index}`);
//     if (!cardRef) {
//       console.error("Card reference is null!");
//       return;
//     }
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       const canvas = await html2canvas(cardRef, {
//         scale: 2,
//         useCORS: true,
//         logging: true,
//       });

//       const image = canvas.toDataURL("image/png");

//       const link = document.createElement("a");
//       link.href = image;
//       link.download = `id_card_${index}.png`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error("Error capturing image:", error);
//     }
//   };
//   // console.log("This website is made by Tinku Kohad");
  

//   const handleAllDownload = async () => {
//     const zip = new JSZip();
//     const folder = zip.folder("ID_Cards");
//     setLoading(true);
//     for (let index = 0; index < data.length; index++) {
//       const image = await captureCard(index);
//       if (image) {
//         const imgData = image.split(",")[1];
//         folder.file(`id_card_${index}.png`, imgData, { base64: true });
//       }
//     }

//     zip.generateAsync({ type: "blob" }).then((content) => {
//       saveAs(content, "ID_Cards.zip");
//     });
//     setLoading(false);
//   };

//   const Formatimages = [img, img1, img2, img3, img4, img5,img0];

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/v1/data/delete/${id}`);
//       toast.success("Card Deleted");
//       setData((prevData) => prevData.filter((item) => item._id !== id));
//     } catch (error) {
//       console.error("Error deleting card:", error);
//     }
//   };

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const nextPage = () =>
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));


//   const sortedData = [...data].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );


//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);

//   const paginatedData = sortedData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <>
//       <Toaster position="top-center" reverseOrder={false} />
//       <div className="flex items-start justify-between">
//         <div className="w-fit p-4 bg-white shadow-lg rounded-lg">
//           <h2 className="text-2xl underline font-bold text-gray-800 text-center mb-4">
//             Select Templates
//           </h2>
//           {images.length > 0 ? (
//             <Swiper
//               modules={[Pagination, Autoplay]}
//               direction="vertical"
//               spaceBetween={10}
//               slidesPerView={1}
//               pagination={{ clickable: true }}
//               autoplay={{ delay: 3000 }}
//               className="w-64 h-96"
//             >
//               {images.map((image, index) => (
//                 <SwiperSlide
//                   key={index}
//                   className="flex justify-center items-center"
//                 >
//                   <img
//                     src={image.image}
//                     alt={`Slide ${index}`}
//                     className="w-full h-fit object-cover rounded-lg shadow-md cursor-pointer"
//                     onClick={() => setSelectedImage(image.image)}
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           ) : (
//             <p className="text-center text-gray-500">No images available</p>
//           )}
//         </div>

//         {/* middle section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 overflow-y-auto overflow-x-hidden mt-10 py-10">
//           <div className="fixed bottom-5 right-5">
//             <button
//               className="px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 shadow-lg"
//               onClick={handleAllDownload}
//             >
//               {loading ? "Please wait..." : " Download All as ZIP"}
//             </button>
//           </div>

//           {/* cards */}
//           {paginatedData.map((item, index) => {
//             if (selectedFormat === 1) {
//               return (
//                 <div
//                   key={index}
//                   className="flex justify-center align-middle items-center shadow-lg"
//                 >
//                   <div
//                     id={`card-${index}`}
//                     className="w-[22.2rem] bg-green-400 border relative"
//                   >
//                     <img
//                       src={selectedImage}
//                       alt=""
//                       loading="lazy"
//                       className="z-0"
//                     />
//                     <img
//                       className="w-[5.5rem] h-[6.99rem] top-[4.7rem] left-[1.2rem] absolute"
//                       src={item.uploadyourPassport}
//                       alt=""
//                     />
//                     <div className="z-50 absolute top-[6rem] left-[7.2rem] leading-[1.1rem] font-semibold">
//                       <div className=" flex">
//                         {item.name && (
//                           <>
//                             <span className=" font-bold mr-[3.5rem]">Name</span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.name && (
//                           <p className=" w-[9rem]  "> {item.name}</p>
//                         )}
//                       </div>
//                       <div className=" flex">
//                         {item.Class && (
//                           <p>
//                             <span className=" font-bold mr-[3.8rem]">
//                               Class
//                             </span>{" "}
//                             : {item.Class}
//                           </p>
//                         )}
//                       </div>
//                       <div className=" flex">
//                         {item.section && (
//                           <>
//                             <span className=" font-bold mr-[2.8rem]">
//                               Section
//                             </span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.section && (
//                           <p className=" w-[8rem]  "> {item.section}</p>
//                         )}
//                       </div>
//                       {item.dateofBirth && (
//                         <p>
//                           <span className=" font-bold mr-[2.5rem]">
//                             D. O. B.
//                           </span>{" "}
//                           :{" "}
//                           {item.dateofBirth
//                             ? new Date(item.dateofBirth)
//                                 .toLocaleDateString("en-GB")
//                                 .replace(/\//g, "/")
//                             : ""}
//                         </p>
//                       )}
//                       <div className="flex">
//                         {item.designation && (
//                           <>
//                             <p className=" font-bold mr-[0rem]">Designation</p>{" "}
//                             <span className="ml-2">:</span>
//                             <p className=" w-[8.5rem] ml-2">
//                               {item.designation}
//                             </p>
//                           </>
//                         )}
//                       </div>
//                       {item.bloodGroup && (
//                         <p>
//                           <span className=" font-bold mr-[1.5rem]">
//                             Blood Gr.
//                           </span>{" "}
//                           : {item.bloodGroup}
//                         </p>
//                       )}
//                         {item.admissionNo && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Admi No.</p>
//                           <span className="mr-1 ml-7">:</span>
//                           <p className="">{item.admissionNo}</p>
//                         </div>
//                       )}
//                       {item.contactNumber && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Contact No.</p>
//                           <span className="mr-1 ml-2">:</span>
//                           <p className="">{item.contactNumber}</p>
//                         </div>
//                       )}
//                       {item.aadharnumber && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Aadhar No.</p>
//                           <span className="mr-1 ml-2">:</span>
//                           <p className="">{item.aadharnumber}</p>
//                         </div>
//                       )}
//                       <div className=" flex ">
//                         {item.address && (
//                           <>
//                             <span className=" font-bold mr-[2.4rem]">
//                               Address
//                             </span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.address && (
//                           <p className=" w-[9rem] "> {item.address}</p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="dd flex flex-col item-center">
//                       {!loading && (
//                         <button
//                           className="download-button"
//                           onClick={() => handleDownload(index)}
//                         >
//                           Download
//                         </button>
//                       )}
//                       <button
//                         className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 shadow-lg absolute z-50 t-0 "
//                         onClick={() => handleDelete(item._id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             } else if (selectedFormat === 2) {
//               return (
//                 <div
//                   key={index}
//                   className="flex justify-center align-middle items-center shadow-lg"
//                 >
//                   <div
//                     id={`card-${index}`}
//                     className="w-[22.2rem] bg-blue-400 border relative"
//                   >
//                     {/* Format 2 Image */}
//                     <img
//                       src={selectedImage}
//                       alt="Format 2"
//                       loading="lazy"
//                       className="z-0"
//                     />

//                     <img
//                       className="w-[5rem] h-[6.5rem] top-[5.8rem] left-[0.5rem] absolute"
//                       src={item.uploadyourPassport}
//                       alt=""
//                     />

//                     <div className="z-50 absolute top-[5.3rem] left-[7.5rem] leading-[1.1rem] font-semibold">
//                       <div className=" flex">
//                         {item.name && (
//                           <>
//                             <span className=" font-bold mr-[3rem]">Name</span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.name && (
//                           <p className=" w-[9rem]  "> {item.name}</p>
//                         )}
//                       </div>
//                       <div className=" flex">
//                         {item.Class && (
//                           <p>
//                             <span className=" font-bold mr-[3.1rem]">
//                               Class
//                             </span>{" "}
//                             : {item.Class}
//                           </p>
//                         )}
//                       </div>

//                       <div className=" flex">
//                         {item.section && (
//                           <>
//                             <span className=" font-bold mr-[2.2rem]">
//                               Section
//                             </span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.section && (
//                           <p className=" w-[8.5rem]  "> {item.section}</p>
//                         )}
//                       </div>
//                       {item.dateofBirth && (
//                         <p>
//                           <span className=" font-bold mr-[2.1rem]">
//                             D. O. B.
//                           </span>{" "}
//                           :{" "}
//                           {item.dateofBirth
//                             ? new Date(item.dateofBirth)
//                                 .toLocaleDateString("en-GB")
//                                 .replace(/\//g, "/")
//                             : ""}
//                         </p>
//                       )}
//                       <div className="flex">
//                         {item.designation && (
//                           <>
//                             <p className=" font-bold mr-[0rem]">Designation</p>{" "}
//                             <span className="ml-[2px]">:</span>
//                             <p className=" w-[8.5rem] ml-2">
//                               {item.designation}
//                             </p>
//                           </>
//                         )}
//                       </div>
//                       {item.bloodGroup && (
//                         <p>
//                           <span className=" font-bold mr-[1.2rem]">
//                             Blood Gr.
//                           </span>{" "}
//                           : {item.bloodGroup}
//                         </p>
//                       )}
//                          {item.admissionNo && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Admi No.</p>
//                           <span className="mr-1 ml-5">:</span>
//                           <p className="">{item.admissionNo}</p>
//                         </div>
//                       )}
//                       {item.contactNumber && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Contact No.</p>
//                           <span className="mr-1 ml-1">:</span>
//                           <p className="">{item.contactNumber}</p>
//                         </div>
//                       )}
//                       {item.aadharnumber && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Aadhar No.</p>
//                           <span className="mr-1 ml-2">:</span>
//                           <p className="">{item.aadharnumber}</p>
//                         </div>
//                       )}
//                       <div className=" flex ">
//                         {item.address && (
//                           <>
//                             <span className=" font-bold mr-[2rem]">
//                               Address
//                             </span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.address && (
//                           <p className=" w-[13rem] "> {item.address}</p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Download Button */}
//                     <div className="dd flex flex-col item-center">
//                       {!loading && (
//                         <button
//                           className="download-button"
//                           onClick={() => handleDownload(index)}
//                         >
//                           Download
//                         </button>
//                       )}
//                       <button
//                         className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 shadow-lg absolute z-50 t-0 "
//                         onClick={() => handleDelete(item._id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             } else if (selectedFormat === 3) {
//               return (
//                 <div
//                   key={index}
//                   className="flex justify-center align-middle items-center shadow-lg"
//                 >
//                   <div
//                     id={`card-${index}`}
//                     className=" w-[22.2rem] bg-green-400 border relative "
//                   >
//                     <img
//                       src={selectedImage}
//                       alt="Format 2"
//                       loading="lazy"
//                       className="z-0"
//                     />

//                     <img
//                       className=" w-[5.1rem] h-[7rem] top-[5.2rem] left-[15.62rem] rounded-lg absolute  "
//                       src={item.uploadyourPassport}
//                       alt=""
//                     />
//                     <div className=" z-50 absolute top-[5.2rem] left-[1rem] leading-[1.1rem] font-semibold ">
//                       <div className=" flex">
//                         {item.name && (
//                           <>
//                             <span className=" font-bold mr-[3.5rem]">Name</span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.name && (
//                           <p className=" w-[9.3rem]  "> {item.name}</p>
//                         )}
//                       </div>
//                       <div className=" flex">
//                         {item.Class && (
//                           <p>
//                             <span className=" font-bold mr-[3.8rem]">
//                               Class
//                             </span>{" "}
//                             : {item.Class}
//                           </p>
//                         )}
//                       </div>
//                       {item.section && (
//                         <p>
//                           <span className=" font-bold mr-[2.5rem]">
//                             Section
//                           </span>{" "}
//                           : {item.section}{" "}
//                         </p>
//                       )}
//                       {item.dateofBirth && (
//                         <p>
//                           <span className=" font-bold mr-[2.5rem]">
//                             D. O. B.
//                           </span>{" "}
//                           :{" "}
//                           {item.dateofBirth
//                             ? new Date(item.dateofBirth)
//                                 .toLocaleDateString("en-GB")
//                                 .replace(/\//g, "/")
//                             : ""}
//                         </p>
//                       )}
//                       <div className="flex">
//                         {item.designation && (
//                           <>
//                             <p className=" font-bold mr-[0rem]">Designation</p>{" "}
//                             <span className="ml-2">:</span>
//                             <p className=" w-[8.5rem] ml-2">
//                               {item.designation}
//                             </p>
//                           </>
//                         )}
//                       </div>
//                       {item.bloodGroup && (
//                         <p>
//                           <span className=" font-bold mr-[1.5rem]">
//                             Blood Gr.
//                           </span>{" "}
//                           : {item.bloodGroup}
//                         </p>
//                       )}
//                       {item.admissionNo && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Admi No.</p>
//                           <span className="mr-1 ml-7">:</span>
//                           <p className="">{item.admissionNo}</p>
//                         </div>
//                       )}
//                       {item.contactNumber && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Contact No.</p>
//                           <span className="mr-1 ml-2">:</span>
//                           <p className="">{item.contactNumber}</p>
//                         </div>
//                       )}
//                       {item.aadharnumber && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Aadhar No.</p>
//                           <span className="mr-1 ml-2">:</span>
//                           <p className="">{item.aadharnumber}</p>
//                         </div>
//                       )}
//                       <div className=" flex ">
//                         {item.address && (
//                           <>
//                             <span className=" font-bold mr-[2.4rem]">
//                               Address
//                             </span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.address && (
//                           <p className=" w-[13rem]"> {item.address}</p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="dd flex flex-col item-center">
//                       {!loading && (
//                         <button
//                           className="download-button"
//                           onClick={() => handleDownload(index)}
//                         >
//                           Download
//                         </button>
//                       )}
//                       <button
//                         className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 shadow-lg absolute z-50 t-0 "
//                         onClick={() => handleDelete(item._id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             } else if (selectedFormat === 4) {
//               return (
//                 <div
//                   key={index}
//                   className="flex justify-center align-middle items-center shadow-lg"
//                 >
//                   <div
//                     id={`card-${index}`}
//                     className=" w-[22.2rem] bg-green-400 border relative "
//                   >
//                     <img
//                       src={selectedImage}
//                       alt="Format 2"
//                       loading="lazy"
//                       className="z-0"
//                     />

//                     <img
//                       loading="lazy"
//                       className=" w-[8.1rem] h-[10.7rem] top-[8.5rem] left-[7rem] rounded absolute  "
//                       src={item.uploadyourPassport}
//                       alt=""
//                     />
//                     <div className=" z-50 absolute top-[20.2rem] left-[1.5rem] text-[1.1rem] font-semibold leading-6">
//                     <div className=" flex">
//                         {item.name && (
//                           <>
//                             <span className=" font-bold mr-[3.5rem]">Name</span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.name && (
//                           <p className=" w-[15rem]  "> {item.name}</p>
//                         )}
//                       </div>
//                       <div className=" flex">
//                         {item.Class && (
//                           <p>
//                             <span className="font-bold mr-[3.8rem]">
//                               Class
//                             </span>{" "}
//                             : {item.Class}
//                           </p>
//                         )}
//                       </div>

//                       <div className=" flex">
//                         {item.section && (
//                           <>
//                             <span className=" font-bold mr-[2.8rem]">
//                               Section
//                             </span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.section && (
//                           <p className=" w-[10rem]  "> {item.section}</p>
//                         )}
//                       </div>

//                       {item.rollNo && (
//                         <p>
//                           <span className=" font-bold mr-[2.2rem]">
//                             Roll No.
//                           </span>{" "}
//                           : {item.rollNo}{" "}
//                         </p>
//                       )}
//                       {item.dateofBirth && (
//                         <p>
//                           <span className=" font-bold mr-[2.5rem]">
//                             D. O. B.
//                           </span>{" "}
//                           :{" "}
//                           {item.dateofBirth
//                             ? new Date(item.dateofBirth)
//                                 .toLocaleDateString("en-GB")
//                                 .replace(/\//g, "/")
//                             : ""}
//                         </p>
//                       )}
//                       <div className="flex">
//                         {item.designation && (
//                           <>
//                             <p className=" font-bold mr-[0rem]">Designation</p>{" "}
//                             <span className="ml-2">:</span>
//                             <p className=" w-[12.5rem] ml-2">
//                               {item.designation}
//                             </p>
//                           </>
//                         )}
//                       </div>
//                       {item.bloodGroup && (
//                         <p>
//                           <span className=" font-bold mr-[1.5rem]">
//                             Blood Gr.
//                           </span>{" "}
//                           : {item.bloodGroup}
//                         </p>
//                       )}
//                       {item.admissionNo && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Admi No.</p>
//                           <span className="mr-1 ml-7">:</span>
//                           <p className="">{item.admissionNo}</p>
//                         </div>
//                       )}
//                       {item.contactNumber && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Contact No.</p>
//                           <span className="mr-1 ml-2">:</span>
//                           <p className="">{item.contactNumber}</p>
//                         </div>
//                       )}
//                       {item.aadharnumber && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Aadhar No.</p>
//                           <span className="mr-1 ml-2">:</span>
//                           <p className="">{item.aadharnumber}</p>
//                         </div>
//                       )}
//                       <div className=" flex ">
//                         {item.address && (
//                           <>
//                             <span className=" font-bold mr-[2.4rem]">
//                               Address
//                             </span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.address && (
//                           <p className=" w-[13rem] "> {item.address}</p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="dd flex flex-col item-center">
//                       {!loading && (
//                         <button
//                           className="download-button"
//                           onClick={() => handleDownload(index)}
//                         >
//                           Download
//                         </button>
//                       )}
//                       <button
//                         className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 shadow-lg absolute z-50 t-0 "
//                         onClick={() => handleDelete(item._id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             } else if (selectedFormat === 5) {
//               return (
//                 <div
//                   className=" flex justify-center align-middle items-center shadow-lg"
//                   key={index}
//                 >
//                   <div
//                     id={`card-${index}`}
//                     className=" w-[22.2rem] bg-green-400 border relative "
//                   >
//                     <img
//                       src={selectedImage}
//                       alt="Format 4"
//                       loading="lazy"
//                       className="z-0"
//                     />

//                     <img
//                       loading="lazy"
//                       className=" w-[8.5rem] h-[9.8rem] top-[8rem] left-[6.8rem] rounded absolute  "
//                       src={item.uploadyourPassport}
//                       alt=""
//                     />
//                     <div className=" z-50 absolute top-[18.2rem] left-[1.5rem] text-[1.1rem] font-semibold leading-6">
//                       <div className=" flex">
//                         {item.name && (
//                           <>
//                             <span className=" font-bold mr-[3.5rem]">Name</span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.name && (
//                           <p className=" w-[15rem]  "> {item.name}</p>
//                         )}
//                       </div>
//                       <div className=" flex">
//                         {item.Class && (
//                           <p>
//                             <span className=" font-bold mr-[3.8rem]">
//                               Class
//                             </span>{" "}
//                             : {item.Class}
//                           </p>
//                         )}
//                       </div>

//                       <div className=" flex">
//                         {item.section && (
//                           <>
//                             <span className=" font-bold mr-[2.8rem]">
//                               Section
//                             </span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.section && (
//                           <p className=" w-[10rem]  "> {item.section}</p>
//                         )}
//                       </div>

//                       {item.rollNo && (
//                         <p>
//                           <span className=" font-bold mr-[2.2rem]">
//                             Roll No.
//                           </span>{" "}
//                           : {item.rollNo}{" "}
//                         </p>
//                       )}
//                       {item.dateofBirth && (
//                         <p>
//                           <span className=" font-bold mr-[2.5rem]">
//                             D. O. B.
//                           </span>{" "}
//                           :{" "}
//                           {item.dateofBirth
//                             ? new Date(item.dateofBirth)
//                                 .toLocaleDateString("en-GB")
//                                 .replace(/\//g, "/")
//                             : ""}
//                         </p>
//                       )}
//                       <div className="flex">
//                         {item.designation && (
//                           <>
//                             <p className=" font-bold mr-[0rem]">Designation</p>{" "}
//                             <span className="ml-2">:</span>
//                             <p className=" w-[12.5rem] ml-2">
//                               {item.designation}
//                             </p>
//                           </>
//                         )}
//                       </div>
//                       {item.bloodGroup && (
//                         <p>
//                           <span className=" font-bold mr-[1.5rem]">
//                             Blood Gr.
//                           </span>{" "}
//                           : {item.bloodGroup}
//                         </p>
//                       )}
//                       {item.admissionNo && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Admi No.</p>
//                           <span className="mr-1 ml-7">:</span>
//                           <p className="">{item.admissionNo}</p>
//                         </div>
//                       )}
//                       {item.contactNumber && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Contact No.</p>
//                           <span className="mr-1 ml-2">:</span>
//                           <p className="">{item.contactNumber}</p>
//                         </div>
//                       )}
//                       {item.aadharnumber && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Aadhar No.</p>
//                           <span className="mr-1 ml-2">:</span>
//                           <p className="">{item.aadharnumber}</p>
//                         </div>
//                       )}
//                       <div className=" flex ">
//                         {item.address && (
//                           <>
//                             <span className=" font-bold mr-[2.4rem]">
//                               Address
//                             </span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.address && (
//                           <p className=" w-[13rem] "> {item.address}</p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="dd flex flex-col item-center">
//                       {!loading && (
//                         <button
//                           className="download-button"
//                           onClick={() => handleDownload(index)}
//                         >
//                           Download
//                         </button>
//                       )}
//                       <button
//                         className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 shadow-lg absolute z-50 t-0 "
//                         onClick={() => handleDelete(item._id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             } else if (selectedFormat === 6) {
//               return (
//                 <div
//                   key={index}
//                   className="flex justify-center align-middle items-center shadow-lg"
//                 >
//                   <div
//                     id={`card-${index}`}
//                     className=" w-[22.2rem] bg-green-400 border relative "
//                   >
//                     <img
//                       src={selectedImage}
//                       alt="Format 4"
//                       loading="lazy"
//                       className="z-0"
//                     />
//                     <img
//                       className=" w-[8.6rem] h-[10.57rem] top-[11.6rem] left-[13.2rem] absolute  "
//                       src={item.uploadyourPassport}
//                       alt=""
//                     />

//                     <div className=" z-50 absolute top-[13rem] left-[1rem] font-semibold leading-6">
//                       <div className=" flex">
//                         {item.name && (
//                           <>
//                             <span className=" font-bold mr-[3.5rem]">Name</span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.name && (
//                           <p className=" w-[5.3rem]  "> {item.name}</p>
//                         )}
//                       </div>
//                       <div className=" flex">
//                         {item.Class && (
//                           <p>
//                             <span className=" font-bold mr-[3.8rem]">
//                               Class
//                             </span>{" "}
//                             : {item.Class}
//                           </p>
//                         )}
//                       </div>

//                       <div className=" flex">
//                         {item.section && (
//                           <>
//                             <span className=" font-bold mr-[2.8rem]">
//                               Section
//                             </span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.section && (
//                           <p className=" w-[5rem]  "> {item.section}</p>
//                         )}
//                       </div>

//                       {item.rollNo && (
//                         <p>
//                           <span className=" font-bold mr-[2.5rem]">
//                             Roll No.
//                           </span>{" "}
//                           : {item.rollNo}{" "}
//                         </p>
//                       )}
//                       {item.dateofBirth && (
//                         <p>
//                           <span className=" font-bold mr-[2.5rem]">
//                             D. O. B.
//                           </span>{" "}
//                           :{" "}
//                           {item.dateofBirth
//                             ? new Date(item.dateofBirth)
//                                 .toLocaleDateString("en-GB")
//                                 .replace(/\//g, "/")
//                             : ""}
//                         </p>
//                       )}
//                       <div className="flex">
//                         {item.designation && (
//                           <>
//                             <p className=" font-bold mr-[0rem]">Designation</p>{" "}
//                             <span className="ml-2">:</span>
//                             <p className=" w-[8.5rem] ml-2">
//                               {item.designation}
//                             </p>
//                           </>
//                         )}
//                       </div>
//                       {item.bloodGroup && (
//                         <p>
//                           <span className=" font-bold mr-[1.5rem]">
//                             Blood Gr.
//                           </span>{" "}
//                           : {item.bloodGroup}
//                         </p>
//                       )}
//                       {item.admissionNo && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Admi No.</p>
//                           <span className="mr-1 ml-7">:</span>
//                           <p className="">{item.admissionNo}</p>
//                         </div>
//                       )}
//                       {item.contactNumber && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Contact No.</p>
//                           <span className="mr-1 ml-2">:</span>
//                           <p className="">{item.contactNumber}</p>
//                         </div>
//                       )}
//                       {item.aadharnumber && (
//                         <div className="flex">
//                           <p className=" font-bold mr-[0rem]">Aadhar No.</p>
//                           <span className="mr-1 ml-2">:</span>
//                           <p className="">{item.aadharnumber}</p>
//                         </div>
//                       )}
//                       <div className=" flex ">
//                         {item.address && (
//                           <>
//                             <span className=" font-bold mr-[2.4rem]">
//                               Address
//                             </span>
//                             <span className="mr-1">:</span>
//                           </>
//                         )}

//                         {item.address && (
//                           <p className=" w-[9rem] "> {item.address}</p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="dd flex flex-col item-center">
//                       {!loading && (
//                         <button
//                           className="download-button"
//                           onClick={() => handleDownload(index)}
//                         >
//                           Download
//                         </button>
//                       )}
//                       <button
//                         className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 shadow-lg absolute z-50 t-0 "
//                         onClick={() => handleDelete(item._id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             }
//              else if (selectedFormat === 7) {
//               return (
//                 <div
//                 key={index}
//                 className="flex justify-center align-middle items-center shadow-lg"
//               >
//                 <div
//                   id={`card-${index}`}
//                   className="w-[22.2rem] bg-green-400 border relative"
//                 >
//                   <img
//                     src={selectedImage}
//                     alt=""
//                     loading="lazy"
//                     className="z-0"
//                   />
//                   <img
//                     className="w-[6rem] h-[7rem] top-[4rem] left-[0.7rem] absolute"
//                     src={item.uploadyourPassport}
//                     alt=""
//                   />
//                   <div className="z-50 absolute top-[5rem] left-[7.2rem] leading-[1.1rem] font-semibold">
//                     <div className=" flex">
//                       {item.name && (
//                         <>
//                           <span className=" font-bold mr-[3.5rem]">Name</span>
//                           <span className="mr-1">:</span>
//                         </>
//                       )}

//                       {item.name && (
//                         <p className=" w-[9.3rem]  "> {item.name}</p>
//                       )}
//                     </div>
//                     <div className=" flex">
//                       {item.Class && (
//                         <p>
//                           <span className=" font-bold mr-[3.8rem]">
//                             Class
//                           </span>{" "}
//                           : {item.Class}
//                         </p>
//                       )}
//                     </div>
//                     <div className=" flex">
//                       {item.section && (
//                         <>
//                           <span className=" font-bold mr-[2.8rem]">
//                             Section
//                           </span>
//                           <span className="mr-1">:</span>
//                         </>
//                       )}

//                       {item.section && (
//                         <p className=" w-[8rem]  "> {item.section}</p>
//                       )}
//                     </div>
//                     {item.dateofBirth && (
//                       <p>
//                         <span className=" font-bold mr-[2.5rem]">
//                           D. O. B.
//                         </span>{" "}
//                         :{" "}
//                         {item.dateofBirth
//                           ? new Date(item.dateofBirth)
//                               .toLocaleDateString("en-GB")
//                               .replace(/\//g, "/")
//                           : ""}
//                       </p>
//                     )}
//                     <div className="flex">
//                       {item.designation && (
//                         <>
//                           <p className=" font-bold mr-[0rem]">Designation</p>{" "}
//                           <span className="ml-2">:</span>
//                           <p className=" w-[8.5rem] ml-2">
//                             {item.designation}
//                           </p>
//                         </>
//                       )}
//                     </div>
//                     {item.bloodGroup && (
//                       <p>
//                         <span className=" font-bold mr-[1.5rem]">
//                           Blood Gr.
//                         </span>{" "}
//                         : {item.bloodGroup}
//                       </p>
//                     )}
//                       {item.admissionNo && (
//                       <div className="flex">
//                         <p className=" font-bold mr-[0rem]">Admi No.</p>
//                         <span className="mr-1 ml-7">:</span>
//                         <p className="">{item.admissionNo}</p>
//                       </div>
//                     )}
//                     {item.contactNumber && (
//                       <div className="flex">
//                         <p className=" font-bold mr-[0rem]">Contact No.</p>
//                         <span className="mr-1 ml-2">:</span>
//                         <p className="">{item.contactNumber}</p>
//                       </div>
//                     )}
//                     {item.aadharnumber && (
//                       <div className="flex">
//                         <p className=" font-bold mr-[0rem]">Aadhar No.</p>
//                         <span className="mr-1 ml-2">:</span>
//                         <p className="">{item.aadharnumber}</p>
//                       </div>
//                     )}
//                     <div className=" flex ">
//                       {item.address && (
//                         <>
//                           <span className=" font-bold mr-[2.4rem]">
//                             Address
//                           </span>
//                           <span className="mr-1">:</span>
//                         </>
//                       )}

//                       {item.address && (
//                         <p className=" w-[9rem] "> {item.address}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="dd flex flex-col item-center">
//                     {!loading && (
//                       <button
//                         className="download-button"
//                         onClick={() => handleDownload(index)}
//                       >
//                         Download
//                       </button>
//                     )}
//                     <button
//                       className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 shadow-lg absolute z-50 t-0 "
//                       onClick={() => handleDelete(item._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               );
//             }

//             return null;
//           })}
//         </div>

//         {/* Format Selection Images */}
//         <div className="w-64 gap-10 h-fit border p-10 flex flex-col items-center justify-start">
//           <h1 className="text-2xl font-bold underline">Select Format</h1>
//           {Formatimages.map((imgSrc, index) => (
//             <img
//               key={index}
//               src={imgSrc}
//               alt={`Format ${index + 1}`}
//               className="w-40 h-40 rounded-lg shadow-md cursor-pointer"
//               onClick={() => setSelectedFormat(index + 1)} 
//             />
//           ))}
//         </div>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center mt-5 py-10">
//         <button
//           className={`px-4 py-2 mx-2 bg-blue-500 text-white rounded ${
//             currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           onClick={prevPage}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span className="text-lg font-bold">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           className={`px-4 py-2 mx-2 bg-blue-500 text-white rounded ${
//             currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           onClick={nextPage}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default ImageSwiper;





import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import Temp from "../assets/VTemp1.jpeg";
import img0 from "../assets/NHTemp1.jpeg";
import img from "../assets/NHTemp1.jpeg";
import img1 from "../assets/NHTemp2.jpeg";
import img2 from "../assets/NHTemp3.jpeg";
import img3 from "../assets/NVTemp1.jpg";
import img4 from "../assets/NVTemp2.jpeg";
import img5 from "../assets/NVTemp2.jpg";
import toast, { Toaster } from "react-hot-toast";

const ImageSwiper = () => {
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(Temp);
  const [selectedFormat, setSelectedFormat] = useState(1);
  const [schoolNames, setSchoolNames] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://shriramcard.com/api/v1/template"
        );
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://shriramcard.com/api/v1/data/getAllEntryes"
        );
        // setData(response.data.data);
        const entries = response.data.data; // <-- make sure you're accessing `.data.data`
        setData(entries);

        // Map school names from each object
        const uniqueSchools = [
          ...new Set(entries.map((item) => item.schoolName).filter(Boolean)),
        ];
        setSchoolNames(uniqueSchools);

        console.log("Unique school names:", uniqueSchools);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Function to capture a single ID card
  const captureCard = async (index) => {
    const cardRef = document.getElementById(`card-${index}`);
    if (!cardRef) {
      console.error("Card reference is null!");
      return null;
    }

    // Fix any "oklch" color problem by overriding it
    cardRef.querySelectorAll("*").forEach((el) => {
      const computedStyle = window.getComputedStyle(el);
      if (
        computedStyle.color.includes("oklch") ||
        computedStyle.backgroundColor.includes("oklch")
      ) {
        el.style.color = "black"; // or any fallback
        el.style.backgroundColor = "white"; // or any fallback
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
    const canvas = await html2canvas(cardRef, {
      scale: 2,
      useCORS: true,
      logging: true,
    });

    return canvas.toDataURL("image/png");
  };

  const handleDownload = async (index) => {
    const cardRef = document.getElementById(`card-${index}`);
    if (!cardRef) {
      console.error("Card reference is null!");
      return;
    }

    // Fix any "oklch" color problem by overriding it
    cardRef.querySelectorAll("*").forEach((el) => {
      const computedStyle = window.getComputedStyle(el);
      if (
        computedStyle.color.includes("oklch") ||
        computedStyle.backgroundColor.includes("oklch")
      ) {
        el.style.color = "black"; // or any fallback
        el.style.backgroundColor = "white"; // or any fallback
      }
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(cardRef, {
        scale: 2,
        useCORS: true,
        logging: true,
      });

      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = `id_card_${index}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };
  // console.log("This website is made by Tinku Kohad");

  const handleAllDownload = async () => {
    const zip = new JSZip();
    const folder = zip.folder("ID_Cards");
    setLoading(true);
    for (let index = 0; index < data.length; index++) {
      const image = await captureCard(index);
      if (image) {
        const imgData = image.split(",")[1];
        folder.file(`id_card_${index}.png`, imgData, { base64: true });
      }
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "ID_Cards.zip");
    });
    setLoading(false);
  };

  const Formatimages = [img, img1, img2, img3, img4, img5, img0];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://shriramcard.com/api/v1/data/delete/${id}`);
      toast.success("Card Deleted");
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const sortedData = [...data].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const displayData = selectedSchool ? filteredData : paginatedData;

  //new
  const handleSchoolChange = (e) => {
    const selected = e.target.value;
    setSelectedSchool(selected);
    const filtered = data.filter((item) => item.schoolName === selected);
    setFilteredData(filtered);
    console.log(filtered);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-start justify-between">
        <div className="w-fit p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl underline font-bold text-neutral-800 text-center mb-4">
            Select Templates
          </h2>
          {images.length > 0 ? (
            <Swiper
              modules={[Pagination, Autoplay]}
              direction="vertical"
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="w-64 h-96"
            >
              {images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="flex justify-center items-center"
                >
                  <img
                    src={image.image}
                    alt={`Slide ${index}`}
                    className="w-full h-fit object-cover rounded-lg shadow-md cursor-pointer"
                    onClick={() => setSelectedImage(image.image)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-neutral-500">No images available</p>
          )}
        </div>

        {/* middle section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 overflow-y-auto overflow-x-hidden mt-10 py-10">
          <h1 className="text-xl text-bolder">Select School</h1>
          <select
            onChange={handleSchoolChange}
            className="px-4 py-2 border rounded"
          >
            <option value="">-- All School --</option>
            {schoolNames.map((name, idx) => (
              <option key={idx} value={name}>
                {name}
              </option>
            ))}
          </select>
          <div className="fixed bottom-5 right-5">
            <button
              className="px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 shadow-lg"
              onClick={handleAllDownload}
            >
              {loading ? "Please wait..." : " Download All as ZIP"}
            </button>
          </div>
          {/* cards */}
          {displayData.map((item, index) => {
            if (selectedFormat === 1) {
              return (
                <div
                  key={index}
                  className="flex justify-center align-middle items-center shadow-lg"
                >
                  <div
                    id={`card-${index}`}
                    className="w-[22.2rem] bg-green-400 border relative"
                  >
                    <img
                      src={selectedImage}
                      alt=""
                      loading="lazy"
                      className="z-0"
                    />
                    <img
                      className="w-[5.5rem] h-[6.99rem] top-[4.7rem] left-[1.2rem] absolute"
                      src={item.uploadyourPassport}
                      alt=""
                    />
                    <div className="z-50 absolute top-[6rem] left-[7.2rem] leading-[1.1rem] font-semibold">
                      <div className=" flex">
                        {item.name && (
                          <>
                            <span className=" font-bold mr-[3.5rem]">Name</span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.name && (
                          <p className=" w-[9rem]  "> {item.name}</p>
                        )}
                      </div>
                      <div className=" flex">
                        {item.Class && (
                          <p>
                            <span className=" font-bold mr-[3.8rem]">
                              Class
                            </span>{" "}
                            : {item.Class}
                          </p>
                        )}
                      </div>
                      <div className=" flex">
                        {item.section && (
                          <>
                            <span className=" font-bold mr-[2.8rem]">
                              Section
                            </span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.section && (
                          <p className=" w-[8rem]  "> {item.section}</p>
                        )}
                      </div>
                      {item.dateofBirth && (
                        <p>
                          <span className=" font-bold mr-[2.5rem]">
                            D. O. B.
                          </span>{" "}
                          :{" "}
                          {item.dateofBirth
                            ? new Date(item.dateofBirth)
                                .toLocaleDateString("en-GB")
                                .replace(/\//g, "/")
                            : ""}
                        </p>
                      )}
                      <div className="flex">
                        {item.designation && (
                          <>
                            <p className=" font-bold mr-[0rem]">Designation</p>{" "}
                            <span className="ml-2">:</span>
                            <p className=" w-[8.5rem] ml-2">
                              {item.designation}
                            </p>
                          </>
                        )}
                      </div>
                      {item.bloodGroup && (
                        <p>
                          <span className=" font-bold mr-[1.5rem]">
                            Blood Gr.
                          </span>{" "}
                          : {item.bloodGroup}
                        </p>
                      )}
                      {item.admissionNo && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Admi No.</p>
                          <span className="mr-1 ml-7">:</span>
                          <p className="">{item.admissionNo}</p>
                        </div>
                      )}
                      {item.contactNumber && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Contact No.</p>
                          <span className="mr-1 ml-2">:</span>
                          <p className="">{item.contactNumber}</p>
                        </div>
                      )}
                      {item.aadharnumber && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Aadhar No.</p>
                          <span className="mr-1 ml-2">:</span>
                          <p className="">{item.aadharnumber}</p>
                        </div>
                      )}
                      <div className=" flex ">
                        {item.address && (
                          <>
                            <span className=" font-bold mr-[2.4rem]">
                              Address
                            </span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.address && (
                          <p className=" w-[9rem] "> {item.address}</p>
                        )}
                      </div>
                    </div>
                    <div className="dd flex flex-col item-center">
                      {!loading && (
                        <button
                          className="download-button"
                          onClick={() => handleDownload(index)}
                        >
                          Download
                        </button>
                      )}
                      <button
                        className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 shadow-lg absolute z-50 t-0 "
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else if (selectedFormat === 2) {
              return (
                <div
                  key={index}
                  className="flex justify-center align-middle items-center shadow-lg"
                >
                  <div
                    id={`card-${index}`}
                    className="w-[22.2rem] bg-blue-400 border relative"
                  >
                    {/* Format 2 Image */}
                    <img
                      src={selectedImage}
                      alt="Format 2"
                      loading="lazy"
                      className="z-0"
                    />

                    <img
                      className="w-[5rem] h-[6.5rem] top-[5.8rem] left-[0.5rem] absolute"
                      src={item.uploadyourPassport}
                      alt=""
                    />

                    <div className="z-50 absolute top-[5.3rem] left-[7.5rem] leading-[1.1rem] font-semibold">
                      <div className=" flex">
                        {item.name && (
                          <>
                            <span className=" font-bold mr-[3rem]">Name</span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.name && (
                          <p className=" w-[9rem]  "> {item.name}</p>
                        )}
                      </div>
                      <div className=" flex">
                        {item.Class && (
                          <p>
                            <span className=" font-bold mr-[3.1rem]">
                              Class
                            </span>{" "}
                            : {item.Class}
                          </p>
                        )}
                      </div>

                      <div className=" flex">
                        {item.section && (
                          <>
                            <span className=" font-bold mr-[2.2rem]">
                              Section
                            </span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.section && (
                          <p className=" w-[8.5rem]  "> {item.section}</p>
                        )}
                      </div>
                      {item.dateofBirth && (
                        <p>
                          <span className=" font-bold mr-[2.1rem]">
                            D. O. B.
                          </span>{" "}
                          :{" "}
                          {item.dateofBirth
                            ? new Date(item.dateofBirth)
                                .toLocaleDateString("en-GB")
                                .replace(/\//g, "/")
                            : ""}
                        </p>
                      )}
                      <div className="flex">
                        {item.designation && (
                          <>
                            <p className=" font-bold mr-[0rem]">Designation</p>{" "}
                            <span className="ml-[2px]">:</span>
                            <p className=" w-[8.5rem] ml-2">
                              {item.designation}
                            </p>
                          </>
                        )}
                      </div>
                      {item.bloodGroup && (
                        <p>
                          <span className=" font-bold mr-[1.2rem]">
                            Blood Gr.
                          </span>{" "}
                          : {item.bloodGroup}
                        </p>
                      )}
                      {item.admissionNo && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Admi No.</p>
                          <span className="mr-1 ml-5">:</span>
                          <p className="">{item.admissionNo}</p>
                        </div>
                      )}
                      {item.contactNumber && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Contact No.</p>
                          <span className="mr-1 ml-1">:</span>
                          <p className="">{item.contactNumber}</p>
                        </div>
                      )}
                      {item.aadharnumber && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Aadhar No.</p>
                          <span className="mr-1 ml-2">:</span>
                          <p className="">{item.aadharnumber}</p>
                        </div>
                      )}
                      <div className=" flex ">
                        {item.address && (
                          <>
                            <span className=" font-bold mr-[2rem]">
                              Address
                            </span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.address && (
                          <p className=" w-[13rem] "> {item.address}</p>
                        )}
                      </div>
                    </div>

                    {/* Download Button */}
                    <div className="dd flex flex-col item-center">
                      {!loading && (
                        <button
                          className="download-button"
                          onClick={() => handleDownload(index)}
                        >
                          Download
                        </button>
                      )}
                      <button
                        className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 shadow-lg absolute z-50 t-0 "
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else if (selectedFormat === 3) {
              return (
                <div
                  key={index}
                  className="flex justify-center align-middle items-center shadow-lg"
                >
                  <div
                    id={`card-${index}`}
                    className=" w-[22.2rem] bg-green-400 border relative "
                  >
                    <img
                      src={selectedImage}
                      alt="Format 2"
                      loading="lazy"
                      className="z-0"
                    />

                    <img
                      className=" w-[5.1rem] h-[7rem] top-[5.2rem] left-[15.62rem] rounded-lg absolute"
                      src={item.uploadyourPassport}
                      alt=""
                    />
                    <div className=" z-50 absolute top-[5.2rem] left-[1rem] leading-[1.1rem] font-semibold ">
                      <div className=" flex">
                        {item.name && (
                          <>
                            <span className=" font-bold mr-[3.5rem]">Name</span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.name && (
                          <p className=" w-[9.3rem]  "> {item.name}</p>
                        )}
                      </div>
                      <div className=" flex">
                        {item.Class && (
                          <p>
                            <span className=" font-bold mr-[3.8rem]">
                              Class
                            </span>{" "}
                            : {item.Class}
                          </p>
                        )}
                      </div>
                      {item.section && (
                        <p>
                          <span className=" font-bold mr-[2.5rem]">
                            Section
                          </span>{" "}
                          : {item.section}{" "}
                        </p>
                      )}
                      {item.dateofBirth && (
                        <p>
                          <span className=" font-bold mr-[2.5rem]">
                            D. O. B.
                          </span>{" "}
                          :{" "}
                          {item.dateofBirth
                            ? new Date(item.dateofBirth)
                                .toLocaleDateString("en-GB")
                                .replace(/\//g, "/")
                            : ""}
                        </p>
                      )}
                      <div className="flex">
                        {item.designation && (
                          <>
                            <p className=" font-bold mr-[0rem]">Designation</p>{" "}
                            <span className="ml-2">:</span>
                            <p className=" w-[8.5rem] ml-2">
                              {item.designation}
                            </p>
                          </>
                        )}
                      </div>
                      {item.bloodGroup && (
                        <p>
                          <span className=" font-bold mr-[1.5rem]">
                            Blood Gr.
                          </span>{" "}
                          : {item.bloodGroup}
                        </p>
                      )}
                      {item.admissionNo && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Admi No.</p>
                          <span className="mr-1 ml-7">:</span>
                          <p className="">{item.admissionNo}</p>
                        </div>
                      )}
                      {item.contactNumber && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Contact No.</p>
                          <span className="mr-1 ml-2">:</span>
                          <p className="">{item.contactNumber}</p>
                        </div>
                      )}
                      {item.aadharnumber && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Aadhar No.</p>
                          <span className="mr-1 ml-2">:</span>
                          <p className="">{item.aadharnumber}</p>
                        </div>
                      )}
                      <div className=" flex ">
                        {item.address && (
                          <>
                            <span className=" font-bold mr-[2.4rem]">
                              Address
                            </span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.address && (
                          <p className=" w-[13rem]"> {item.address}</p>
                        )}
                      </div>
                    </div>
                    <div className="dd flex flex-col item-center">
                      {!loading && (
                        <button
                          className="download-button"
                          onClick={() => handleDownload(index)}
                        >
                          Download
                        </button>
                      )}
                      <button
                        className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 shadow-lg absolute z-50 t-0 "
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else if (selectedFormat === 4) {
              return (
                <div
                  key={index}
                  className="flex justify-center align-middle items-center shadow-lg"
                >
                  <div
                    id={`card-${index}`}
                    className=" w-[22.2rem] bg-green-400 border relative "
                  >
                    <img
                      src={selectedImage}
                      alt="Format 2"
                      loading="lazy"
                      className="z-0"
                    />

                    <img
                      loading="lazy"
                      className=" w-[8.1rem] h-[10.7rem] top-[8.5rem] left-[7rem] rounded absolute  "
                      src={item.uploadyourPassport}
                      alt=""
                    />
                    <div className=" z-50 absolute top-[20.2rem] left-[1.5rem] text-[1.1rem] font-semibold leading-6">
                      <div className=" flex">
                        {item.name && (
                          <>
                            <span className=" font-bold mr-[3.5rem]">Name</span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.name && (
                          <p className=" w-[15rem]  "> {item.name}</p>
                        )}
                      </div>
                      <div className=" flex">
                        {item.Class && (
                          <p>
                            <span className="font-bold mr-[3.8rem]">Class</span>{" "}
                            : {item.Class}
                          </p>
                        )}
                      </div>

                      <div className=" flex">
                        {item.section && (
                          <>
                            <span className=" font-bold mr-[2.8rem]">
                              Section
                            </span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.section && (
                          <p className=" w-[10rem]  "> {item.section}</p>
                        )}
                      </div>

                      {item.rollNo && (
                        <p>
                          <span className=" font-bold mr-[2.2rem]">
                            Roll No.
                          </span>{" "}
                          : {item.rollNo}{" "}
                        </p>
                      )}
                      {item.dateofBirth && (
                        <p>
                          <span className=" font-bold mr-[2.5rem]">
                            D. O. B.
                          </span>{" "}
                          :{" "}
                          {item.dateofBirth
                            ? new Date(item.dateofBirth)
                                .toLocaleDateString("en-GB")
                                .replace(/\//g, "/")
                            : ""}
                        </p>
                      )}
                      <div className="flex">
                        {item.designation && (
                          <>
                            <p className=" font-bold mr-[0rem]">Designation</p>{" "}
                            <span className="ml-2">:</span>
                            <p className=" w-[12.5rem] ml-2">
                              {item.designation}
                            </p>
                          </>
                        )}
                      </div>
                      {item.bloodGroup && (
                        <p>
                          <span className=" font-bold mr-[1.5rem]">
                            Blood Gr.
                          </span>{" "}
                          : {item.bloodGroup}
                        </p>
                      )}
                      {item.admissionNo && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Admi No.</p>
                          <span className="mr-1 ml-7">:</span>
                          <p className="">{item.admissionNo}</p>
                        </div>
                      )}
                      {item.contactNumber && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Contact No.</p>
                          <span className="mr-1 ml-2">:</span>
                          <p className="">{item.contactNumber}</p>
                        </div>
                      )}
                      {item.aadharnumber && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Aadhar No.</p>
                          <span className="mr-1 ml-2">:</span>
                          <p className="">{item.aadharnumber}</p>
                        </div>
                      )}
                      <div className=" flex ">
                        {item.address && (
                          <>
                            <span className=" font-bold mr-[2.4rem]">
                              Address
                            </span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.address && (
                          <p className=" w-[13rem] "> {item.address}</p>
                        )}
                      </div>
                    </div>
                    <div className="dd flex flex-col item-center">
                      {!loading && (
                        <button
                          className="download-button"
                          onClick={() => handleDownload(index)}
                        >
                          Download
                        </button>
                      )}
                      <button
                        className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 shadow-lg absolute z-50 t-0 "
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else if (selectedFormat === 5) {
              return (
                <div
                  className=" flex justify-center align-middle items-center shadow-lg"
                  key={index}
                >
                  <div
                    id={`card-${index}`}
                    className=" w-[22.2rem] bg-green-400 border relative "
                  >
                    <img
                      src={selectedImage}
                      alt="Format 4"
                      loading="lazy"
                      className="z-0"
                    />

                    <img
                      loading="lazy"
                      className=" w-[8.5rem] h-[9.8rem] top-[8rem] left-[6.8rem] rounded absolute  "
                      src={item.uploadyourPassport}
                      alt=""
                    />
                    <div className=" z-50 absolute top-[18.2rem] left-[1.5rem] text-[1.1rem] font-semibold leading-6">
                      <div className=" flex">
                        {item.name && (
                          <>
                            <span className=" font-bold mr-[3.5rem]">Name</span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.name && (
                          <p className=" w-[15rem]  "> {item.name}</p>
                        )}
                      </div>
                      <div className=" flex">
                        {item.Class && (
                          <p>
                            <span className=" font-bold mr-[3.8rem]">
                              Class
                            </span>{" "}
                            : {item.Class}
                          </p>
                        )}
                      </div>

                      <div className=" flex">
                        {item.section && (
                          <>
                            <span className=" font-bold mr-[2.8rem]">
                              Section
                            </span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.section && (
                          <p className=" w-[10rem]  "> {item.section}</p>
                        )}
                      </div>

                      {item.rollNo && (
                        <p>
                          <span className=" font-bold mr-[2.2rem]">
                            Roll No.
                          </span>{" "}
                          : {item.rollNo}{" "}
                        </p>
                      )}
                      {item.dateofBirth && (
                        <p>
                          <span className=" font-bold mr-[2.5rem]">
                            D. O. B.
                          </span>{" "}
                          :{" "}
                          {item.dateofBirth
                            ? new Date(item.dateofBirth)
                                .toLocaleDateString("en-GB")
                                .replace(/\//g, "/")
                            : ""}
                        </p>
                      )}
                      <div className="flex">
                        {item.designation && (
                          <>
                            <p className=" font-bold mr-[0rem]">Designation</p>{" "}
                            <span className="ml-2">:</span>
                            <p className=" w-[12.5rem] ml-2">
                              {item.designation}
                            </p>
                          </>
                        )}
                      </div>
                      {item.bloodGroup && (
                        <p>
                          <span className=" font-bold mr-[1.5rem]">
                            Blood Gr.
                          </span>{" "}
                          : {item.bloodGroup}
                        </p>
                      )}
                      {item.admissionNo && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Admi No.</p>
                          <span className="mr-1 ml-7">:</span>
                          <p className="">{item.admissionNo}</p>
                        </div>
                      )}
                      {item.contactNumber && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Contact No.</p>
                          <span className="mr-1 ml-2">:</span>
                          <p className="">{item.contactNumber}</p>
                        </div>
                      )}
                      {item.aadharnumber && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Aadhar No.</p>
                          <span className="mr-1 ml-2">:</span>
                          <p className="">{item.aadharnumber}</p>
                        </div>
                      )}
                      <div className=" flex ">
                        {item.address && (
                          <>
                            <span className=" font-bold mr-[2.4rem]">
                              Address
                            </span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.address && (
                          <p className=" w-[13rem] "> {item.address}</p>
                        )}
                      </div>
                    </div>
                    <div className="dd flex flex-col item-center">
                      {!loading && (
                        <button
                          className="download-button"
                          onClick={() => handleDownload(index)}
                        >
                          Download
                        </button>
                      )}
                      <button
                        className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 shadow-lg absolute z-50 t-0 "
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else if (selectedFormat === 6) {
              return (
                <div
                  key={index}
                  className="flex justify-center align-middle items-center shadow-lg"
                >
                  <div
                    id={`card-${index}`}
                    className=" w-[22.2rem] bg-green-400 border relative "
                  >
                    <img
                      src={selectedImage}
                      alt="Format 4"
                      loading="lazy"
                      className="z-0"
                    />
                    <img
                      className=" w-[8.6rem] h-[10.57rem] top-[11.6rem] left-[13.2rem] absolute  "
                      src={item.uploadyourPassport}
                      alt=""
                    />

                    <div className=" z-50 absolute top-[13rem] left-[1rem] font-semibold leading-6">
                      <div className=" flex">
                        {item.name && (
                          <>
                            <span className=" font-bold mr-[3.5rem]">Name</span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.name && (
                          <p className=" w-[5.3rem]  "> {item.name}</p>
                        )}
                      </div>
                      <div className=" flex">
                        {item.Class && (
                          <p>
                            <span className=" font-bold mr-[3.8rem]">
                              Class
                            </span>{" "}
                            : {item.Class}
                          </p>
                        )}
                      </div>

                      <div className=" flex">
                        {item.section && (
                          <>
                            <span className=" font-bold mr-[2.8rem]">
                              Section
                            </span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.section && (
                          <p className=" w-[5rem]  "> {item.section}</p>
                        )}
                      </div>

                      {item.rollNo && (
                        <p>
                          <span className=" font-bold mr-[2.5rem]">
                            Roll No.
                          </span>{" "}
                          : {item.rollNo}{" "}
                        </p>
                      )}
                      {item.dateofBirth && (
                        <p>
                          <span className=" font-bold mr-[2.5rem]">
                            D. O. B.
                          </span>{" "}
                          :{" "}
                          {item.dateofBirth
                            ? new Date(item.dateofBirth)
                                .toLocaleDateString("en-GB")
                                .replace(/\//g, "/")
                            : ""}
                        </p>
                      )}
                      <div className="flex">
                        {item.designation && (
                          <>
                            <p className=" font-bold mr-[0rem]">Designation</p>{" "}
                            <span className="ml-2">:</span>
                            <p className=" w-[8.5rem] ml-2">
                              {item.designation}
                            </p>
                          </>
                        )}
                      </div>
                      {item.bloodGroup && (
                        <p>
                          <span className=" font-bold mr-[1.5rem]">
                            Blood Gr.
                          </span>{" "}
                          : {item.bloodGroup}
                        </p>
                      )}
                      {item.admissionNo && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Admi No.</p>
                          <span className="mr-1 ml-7">:</span>
                          <p className="">{item.admissionNo}</p>
                        </div>
                      )}
                      {item.contactNumber && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Contact No.</p>
                          <span className="mr-1 ml-2">:</span>
                          <p className="">{item.contactNumber}</p>
                        </div>
                      )}
                      {item.aadharnumber && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Aadhar No.</p>
                          <span className="mr-1 ml-2">:</span>
                          <p className="">{item.aadharnumber}</p>
                        </div>
                      )}
                      <div className=" flex ">
                        {item.address && (
                          <>
                            <span className=" font-bold mr-[2.4rem]">
                              Address
                            </span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.address && (
                          <p className=" w-[9rem] "> {item.address}</p>
                        )}
                      </div>
                    </div>

                    <div className="dd flex flex-col item-center">
                      {!loading && (
                        <button
                          className="download-button"
                          onClick={() => handleDownload(index)}
                        >
                          Download
                        </button>
                      )}
                      <button
                        className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 shadow-lg absolute z-50 t-0 "
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else if (selectedFormat === 7) {
              return (
                <div
                  key={index}
                  className="flex justify-center align-middle items-center shadow-lg"
                >
                  <div
                    id={`card-${index}`}
                    className="w-[22.2rem] bg-green-400 border relative"
                  >
                    <img
                      src={selectedImage}
                      alt=""
                      loading="lazy"
                      className="z-0"
                    />
                    <img
                      className="w-[6rem] h-[7rem] top-[4rem] left-[0.7rem] absolute"
                      src={item.uploadyourPassport}
                      alt=""
                    />
                    <div className="z-50 absolute top-[5rem] left-[7.2rem] leading-[1.1rem] font-semibold">
                      <div className=" flex">
                        {item.name && (
                          <>
                            <span className=" font-bold mr-[3.5rem]">Name</span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.name && (
                          <p className=" w-[9.3rem]  "> {item.name}</p>
                        )}
                      </div>
                      <div className=" flex">
                        {item.Class && (
                          <p>
                            <span className=" font-bold mr-[3.8rem]">
                              Class
                            </span>{" "}
                            : {item.Class}
                          </p>
                        )}
                      </div>
                      <div className=" flex">
                        {item.section && (
                          <>
                            <span className=" font-bold mr-[2.8rem]">
                              Section
                            </span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.section && (
                          <p className=" w-[8rem]  "> {item.section}</p>
                        )}
                      </div>
                      {item.dateofBirth && (
                        <p>
                          <span className=" font-bold mr-[2.5rem]">
                            D. O. B.
                          </span>{" "}
                          :{" "}
                          {item.dateofBirth
                            ? new Date(item.dateofBirth)
                                .toLocaleDateString("en-GB")
                                .replace(/\//g, "/")
                            : ""}
                        </p>
                      )}
                      <div className="flex">
                        {item.designation && (
                          <>
                            <p className=" font-bold mr-[0rem]">Designation</p>{" "}
                            <span className="ml-2">:</span>
                            <p className=" w-[8.5rem] ml-2">
                              {item.designation}
                            </p>
                          </>
                        )}
                      </div>
                      {item.bloodGroup && (
                        <p>
                          <span className=" font-bold mr-[1.5rem]">
                            Blood Gr.
                          </span>{" "}
                          : {item.bloodGroup}
                        </p>
                      )}
                      {item.admissionNo && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Admi No.</p>
                          <span className="mr-1 ml-7">:</span>
                          <p className="">{item.admissionNo}</p>
                        </div>
                      )}
                      {item.contactNumber && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Contact No.</p>
                          <span className="mr-1 ml-2">:</span>
                          <p className="">{item.contactNumber}</p>
                        </div>
                      )}
                      {item.aadharnumber && (
                        <div className="flex">
                          <p className=" font-bold mr-[0rem]">Aadhar No.</p>
                          <span className="mr-1 ml-2">:</span>
                          <p className="">{item.aadharnumber}</p>
                        </div>
                      )}
                      <div className=" flex ">
                        {item.address && (
                          <>
                            <span className=" font-bold mr-[2.4rem]">
                              Address
                            </span>
                            <span className="mr-1">:</span>
                          </>
                        )}

                        {item.address && (
                          <p className=" w-[9rem] "> {item.address}</p>
                        )}
                      </div>
                    </div>
                    <div className="dd flex flex-col item-center">
                      {!loading && (
                        <button
                          className="download-button"
                          onClick={() => handleDownload(index)}
                        >
                          Download
                        </button>
                      )}
                      <button
                        className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 shadow-lg absolute z-50 t-0 "
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Format Selection Images */}
        <div className="w-64 gap-10 h-fit border p-10 flex flex-col items-center justify-start">
          <h1 className="text-2xl font-bold underline">Select Format</h1>
          {Formatimages.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Format ${index + 1}`}
              className="w-40 h-40 rounded-lg shadow-md cursor-pointer"
              onClick={() => setSelectedFormat(index + 1)}
            />
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-5 py-10">
        <button
          className={`px-4 py-2 mx-2 bg-blue-500 text-white rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg font-bold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 mx-2 bg-blue-500 text-white rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ImageSwiper;
