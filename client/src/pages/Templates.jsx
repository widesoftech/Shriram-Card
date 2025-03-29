import React, { useEffect, useRef, useState } from "react";
import VTemp1 from "../assets/NVTemp1.jpg";
import VTemp2 from "../assets/NVTemp2.jpg";
import VTemp3 from "../assets/VTemp3.jpeg";
import HTemp1 from "../assets/NHTemp1.jpeg";
import HTemp2 from "../assets/NHTemp2.jpeg";
import HTemp3 from "../assets/NHTemp3.jpeg";
import HTemp4 from "../assets/HTemp4.jpeg";
import HTemp5 from "../assets/HTemp5.jpeg";
import HTemp6 from "../assets/HTemp3.jpeg";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { Mousewheel, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getAllData,
  getOverlayBySchool,
  setTemplates,
} from "../services/opretions/fieldApi";
import IdCardJDVertical from "./IdCardJDVertical";
import toast from "react-hot-toast";

const Templates = () => {
  const cardRefs = useRef([]);
  const [overllay1, setOverllay1] = useState("");
  const [overllay2, setOverllay2] = useState("");
  const { Token } = useSelector((state) => state.auth);
  const [showAddTemp, setShowAddTemp] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [schoolName, setSchoolName] = useState("");
  const [landState, setLandState] = useState(true);
  const [potState, setPotState] = useState(false);
  const [allSchool, setAllSchool] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 30;
  const [loading, setLoading] = useState(false)


 

//   const handleDownload = async (index) => {
//  setLoading(true)
//     const cardElement = cardRefs.current[index];
//     // Ensure images are loaded before capturing the canvas
//     const images = cardElement.getElementsByTagName("img");
//     const imageLoadPromises = Array.from(images).map((img) => {
//       return new Promise((resolve) => {
//         img.onload = resolve;
//         img.onerror = resolve; // Resolve even if there's an error to avoid infinite wait
//         if (img.complete) resolve();
//       });
//     });
  
//     await Promise.all(imageLoadPromises);
    
//     const canvas = await html2canvas(cardElement, {
//       useCORS: true, // Ensure cross-origin images are captured
//       logging: true,
//       allowTaint: true,
//     });
//     const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
//     const link = document.createElement("a");
//     link.href = dataUrl;
//     link.download = `template_${index + 1}.jpg`;
//     link.click();
//   };


const handleDownload = async (index) => {
  setLoading(true);

  const cardElement = cardRefs.current[index];
  const downloadButton = cardElement.querySelector(".download-button");

  // Hide the download button
  downloadButton.style.visibility = "hidden";

  // Ensure images are loaded before capturing the canvas
  const images = cardElement.getElementsByTagName("img");
  const imageLoadPromises = Array.from(images).map((img) => {
    return new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve; // Resolve even if there's an error to avoid infinite wait
      if (img.complete) resolve();
    });
  });

  await Promise.all(imageLoadPromises);

  const canvas = await html2canvas(cardElement, {
    useCORS: true, // Ensure cross-origin images are captured
    logging: true,
    allowTaint: true,
  });
  const dataUrl = canvas.toDataURL("image/jpeg", 1.0);

  // Restore the visibility of the download button
  downloadButton.style.visibility = "visible";

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `template_${index + 1}.jpg`;
  link.click();

  setLoading(false);
};






  const handleDownloadAll = async () => {
    setLoading(true);
    const zip = new JSZip();
    for (let i = 0; i < cardRefs.current.length; i++) {
      const cardElement = cardRefs.current[i];
      const images = cardElement.getElementsByTagName("img");
      const imageLoadPromises = Array.from(images).map((img) => {
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
          if (img.complete) resolve();
        });
      });

      await Promise.all(imageLoadPromises);

      const canvas = await html2canvas(cardElement, {
        useCORS: true,
        logging: true,
        allowTaint: true,
      });
      const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
      zip
        .folder("images")
        .file(`template_${i + 1}.jpg`, dataUrl.split(",")[1], {
          base64: true,
        });
    }
    const zipContent = await zip.generateAsync({ type: "blob" });
    saveAs(zipContent, "templates.zip");
    setLoading(false);
  };

  const getData = async () => {
    try {
      const res = await getAllData(Token);
      setData(res.data?.data);
      console.log("res", res.data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getSchoolNames = async () => {
    const uniqueSchoolNames = [...new Set(data.map((item) => item.schoolName))];
    console.log("Unique School Names: ", uniqueSchoolNames);
    setAllSchool(uniqueSchoolNames);
  };

  const getOverlayImage = async () => {
    const data = await getOverlayBySchool(schoolName);
    console.log("Data in overly temp : ", data);
    setOverllay1(data.vtemp);
    setOverllay2(data.htemp);
  };

  useEffect(() => {
    getSchoolNames();
  }, [data]);

  const [Temp, setTemp] = useState(VTemp1);
  console.log("Temp img : ", Temp.slice(12, -4));

  const array1 = [VTemp1, VTemp2,VTemp3];
  const array2 = [HTemp1, HTemp2, HTemp3,HTemp4,HTemp5,HTemp6];

  const handleLandScape = (props) => {
    if (props == 1) {
      setLandState(false);
      setPotState(true);
    } else {
      setPotState(false);
      setLandState(true);
    }
  };

  const [formData, setformData] = useState({
    school: "",
    VTemp: "",
    HTemp: "",
  });

  const changeHandler = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const fileHandler = (e) => {
    const { name, files } = e.target;
    setformData({
      ...formData,
      [name]: files[0],
    });
  };

  console.log("formData : ", formData);
  const submitHadler = async () => {
    const data = await setTemplates(formData);
    setOverllay1(data.vtemp);
    setOverllay2(data.htemp);
  };

  useEffect(() => {
    const filterSchoolNames = (data, filterSchoolName) => {
      return data.filter((item) =>
        item.schoolName.toLowerCase().includes(filterSchoolName.toLowerCase())
      );
    };

    const filteredData = filterSchoolNames(data, formData.school);
    setData1(filteredData.reverse());
  }, [data, formData.school]);

  const filterHandler = () => {
    let res = data.filter((item) => {
      if (schoolName === "All School") {
        return true; // Keep all items if "All School" is selected
      } else {
        return item.schoolName.toLowerCase().includes(schoolName.toLowerCase());
      }
    });

    setData1(res.reverse());
    getOverlayImage();
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSchoolName(value);
  };

  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = data1.slice(
    indexOfFirstTemplate,
    indexOfLastTemplate
  );

  const totalPages = Math.ceil(data1.length / templatesPerPage);

  return (
    <>
      <div className=" bg-gray-900 flex justify-evenly items-center ">
        {!showAddTemp && (
          <button
            onClick={() => setShowAddTemp(true)}
            className=" bg-slate-200 text-black px-4 py-2 rounded-md hover:bg-slate-300"
          >
            Add Template
          </button>
        )}

        {showAddTemp && (
          <button
            onClick={() => setShowAddTemp(false)}
            className=" bg-slate-200 text-black px-4 py-2 rounded-md hover:bg-slate-300"
          >
            Back
          </button>
        )}

        {showAddTemp && (
          <div className=" flex justify-center items-center gap-16 bg-gray-900 py-12 text-white">
            <div className=" flex flex-col gap-2">
              <label htmlFor="school" className=" text-xl placeholder:text-lg ">
                Enter School Name <span className=" text-red-600">*</span>{" "}
              </label>
              <input
                name="school"
                onChange={changeHandler}
                placeholder="Enter School Name..."
                className=" w-[16rem] px-3 py-2 rounded-md outline-blue-700 text-gray-700"
                type="text"
              />
            </div>
            <div className=" flex flex-col gap-2">
              <label htmlFor="VTemp" className=" text-xl ">
                Enter Vertical Template <span className=" text-red-600">*</span>
              </label>
              <input
                name="VTemp"
                onChange={fileHandler}
                type="file"
                className=" text-xl w-[16rem]  rounded-md"
              />
            </div>
            <div className=" flex-col flex gap-2">
              <label htmlFor="HTemp" className=" text-xl ">
                {" "}
                Enter Horizontal Template{" "}
                <span className=" text-red-600">*</span>
              </label>
              <input
                name="HTemp"
                onChange={fileHandler}
                type="file"
                className=" text-xl w-[16rem] rounded-md"
              />
            </div>
            <button
              onClick={submitHadler}
              className="text-xl rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-500 text-white"
            >
              Submit
            </button>
          </div>
        )}
        {!showAddTemp && (
          <div className=" flex justify-center items-center text-white py-5 gap-16">
            <div className=" flex flex-col gap-2">
              <label htmlFor="school" className=" text-xl placeholder:text-lg ">
                Select School Name <span className=" text-red-600">*</span>{" "}
              </label>
              {/* <input name='school' onChange={changeHandler} placeholder='Enter School Name...' className=' w-[16rem] px-3 py-2 rounded-md outline-blue-700 text-gray-700' type="text" /> */}
              <select
                name="school"
                id="school"
                value={schoolName}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke py-2 px-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter text-black"
              >
                <option value="" disabled>
                  Select School
                </option>
                <option value="All School">All School</option>
                {allSchool.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={filterHandler}
              className=" bg-blue-700 text-xl px-5 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
            <div>
              <button
                onClick={handleDownloadAll}
                className="text-right text-xl bg-green-500 rounded-md px-4 py-2 hover:bg-gray-300"
              >
                {loading ? "please wait ..." : "Download All"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-right">
        <button
          className="bg-blue-700 text-xl px-5 py-2 rounded-md hover:bg-blue-600 text-white"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="bg-blue-700 text-xl px-5 py-2 mx-2 my-1 text-center rounded-md hover:bg-blue-600 text-white"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {/* <button
            onClick={handleDownloadAll}
            className=" text-xl bg-gray-200 rounded-md px-4 py-2 hover:bg-gray-300"
          >
          {loading ? "please wait ..." : "Download All" }  
          </button> */}

      <div className=" w-full flex">
        <div className=" w-[25%] bg-gray-900  ">
          <Swiper
            direction={"vertical"}
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Mousewheel, Pagination, Navigation]}
            className="mySwiper h-[40rem] px-5 py-3 "
          >
            {array1.map((image, index) => (
              <SwiperSlide
                key={index}
                onClick={() => setTemp(image)}
                className=" "
              >
                <img
                  className=" border-2 border-red-500"
                  width={400}
                  src={image}
                  alt="Vtemp1"
                />{" "}
              </SwiperSlide>
            ))}
            {array2.map((image, index) => (
              <SwiperSlide
                className=" "
                key={index}
                onClick={() => setTemp(image)}
              >
                <img
                  className=" border-2 border-red-500"
                  src={image}
                  alt="Vtemp1"
                />{" "}
              </SwiperSlide>
            ))}
          </Swiper>
          <div>
            <img
              src={overllay1}
              alt={overllay1}
              onClick={() => handleLandScape(1)}
            />
            <img
              src={overllay2}
              alt={overllay2}
              onClick={() => handleLandScape(2)}
            />
          </div>
        </div>

        <div className=" w-[75%] flex flex-wrap justify-evenly gap-3 pt-3 bg-gray-900">
          {/* 1  */}
          {Temp.slice(12, -4) === "NVTemp1" &&
            currentTemplates.map((item, index) => (
              <div
                className=" flex justify-center align-middle items-center shadow-lg"
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
              >
                <div className=" w-[22.2rem] bg-green-400 border relative ">
                  {item.formField?.vtemp ? (
                    <img
                      src={item.formField?.vtemp}
                      alt=""
                      loading="lazy"
                      className="  z-0"
                    />
                  ) : (
                    <img src={Temp} alt="" loading="lazy" className="  z-0" />
                  )}

                  <img
                    loading="lazy"
                    className=" w-[8.1rem] h-[10.7rem] top-[8.5rem] left-[7rem] rounded absolute  "
                    src={item.uploadyourPassport}
                    alt=""
                  />
                  <div className=" z-50 absolute top-[20.2rem] left-[1.5rem] text-[1.1rem] font-semibold leading-6">
                    <div className=" flex">
                      {item.name && (
                        <span className=" font-bold mr-[3.6rem]">Name</span>
                      )}
                      {item.name && (
                        <p className=" w-[13.4rem]  "> : {item.name}</p>
                      )}
                    </div>

                    {item.Class && (
                      <p>
                        <span className=" font-bold mr-[3.8rem]">Class</span> :{" "}
                        {item.Class}
                      </p>
                    )}
                    {item.section && (
                      <p>
                        <span className=" font-bold mr-[2.5rem]">Section</span>{" "}
                        : {item.section}{" "}
                      </p>
                    )}
                    {item.dateofBirth && (
                      <p>
                        <span className=" font-bold mr-[2.5rem]">D. O. B.</span>{" "}
                        :{" "}
                        {item.dateofBirth
                          ? new Date(item.dateofBirth)
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "/")
                          : ""}
                      </p>
                    )}
                    {item.designation && (
                      <p>
                        <span className=" font-bold mr-[0rem]">
                          Designation{" "}
                        </span>{" "}
                        : {item.designation}
                      </p>
                    )}
                    {item.bloodGroup && (
                      <p>
                        <span className=" font-bold mr-[1.5rem]">
                          Blood Gr.
                        </span>{" "}
                        : {item.bloodGroup}
                      </p>
                    )}
                    {item.contactNumber && (
                      <p>
                        <span className=" font-bold mr-[0.1rem]">
                          Contact No.
                        </span>{" "}
                        : {item.contactNumber}
                      </p>
                    )}
                    <div className=" flex ">
                      {item.address && (
                        <span className=" font-bold mr-[2.4rem]">Address</span>
                      )}
                      {item.address && (
                        <p className=" w-[12.9rem] "> : {item.address}</p>
                      )}
                    </div>
                  </div>
                  {!loading && (
                    <button
                      className="download-button "
                      onClick={() => handleDownload(index)}
                    >
                      Download
                    </button>
                  )}
                </div>
              </div>
            ))}

          {/* 2 */}
          {Temp.slice(12, -4) === "NVTemp2" &&
            currentTemplates.map((item, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className=" flex justify-center align-middle items-center shadow-lg "
              >
                <div className=" w-[22.2rem] bg-green-400 border relative ">
                  {item.formField?.vtemp ? (
                    <img
                      src={item.formField?.vtemp}
                      loading="lazy"
                      alt=""
                      className="  z-0"
                    />
                  ) : (
                    <img src={Temp} alt="" loading="lazy" className="  z-0" />
                  )}

                  <img
                    className=" w-[8.6rem] h-[10.57rem] top-[8.6rem] left-[11.2rem] absolute  "
                    src={item.uploadyourPassport}
                    alt=""
                  />
                  <div className=" z-50 absolute top-[13.5rem] left-[1rem] font-semibold leading-6">
                    <div className=" flex">
                      {item.name && (
                        <span className=" font-bold mr-[1.7rem]">Name</span>
                      )}
                      {item.name && (
                        <p className=" w-[5.5rem] "> : {item.name}</p>
                      )}
                    </div>
                    {item.Class && (
                      <p>
                        <span className=" font-bold mr-[2.15rem] ">Class</span>:{" "}
                        {item.Class}
                      </p>
                    )}
                    {item.section && (
                      <p>
                        <span className=" font-bold mr-[0.7rem] ">Section</span>{" "}
                        : {item.section}{" "}
                      </p>
                    )}
                    {item.dateofBirth && (
                      <p>
                        <span className=" font-bold mr-[0.5rem]">D. O. B.</span>{" "}
                        :{" "}
                        {item.dateofBirth
                          ? new Date(item.dateofBirth)
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "/")
                          : ""}
                      </p>
                    )}
                    <div className=" flex ">
                      {item.designation && (
                        <span className=" font-bold mr-[1.6rem]">Desig.</span>
                      )}
                      {item.designation && (
                        <p className=" w-[5.5rem]  "> : {item.designation}</p>
                      )}
                    </div>
                    {item.bloodGroup && (
                      <p>
                        <span className=" font-bold mr-[0rem]">Blood Gr.</span>:{" "}
                        {item.bloodGroup}
                      </p>
                    )}
                    <div className=" flex ">
                      {item.address && (
                        <span className=" font-bold mr-[0.6rem]">Address</span>
                      )}
                      {item.address && (
                        <p className=" w-[6.5rem] "> : {item.address}</p>
                      )}
                    </div>
                  </div>
                  {!loading &&  <button
                    className="download-button "
                    onClick={() => handleDownload(index)}
                  >
                    Download
                  </button>}
                </div>
              </div>
            ))}
          {/* 2 */}
          {Temp.slice(12, -5) === "VTemp3" &&
            currentTemplates.map((item, index) => (
              <div
                className=" flex justify-center align-middle items-center shadow-lg"
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
              >
                <div className=" w-[22.2rem] bg-green-400 border relative ">
                  {item.formField?.vtemp ? (
                    <img
                      src={item.formField?.vtemp}
                      alt=""
                      loading="lazy"
                      className="  z-0"
                    />
                  ) : (
                    <img src={Temp} alt="" loading="lazy" className="  z-0" />
                  )}

                  <img
                    loading="lazy"
                    className=" w-[8.5rem] h-[10.8rem] top-[8.8rem] left-[6.8rem] rounded absolute  "
                    src={item.uploadyourPassport}
                    alt=""
                  />
                  <div className=" z-50 absolute top-[20.2rem] left-[1.5rem] text-[1.1rem] font-semibold leading-6">
                    <div className=" flex">
                      {item.name && (
                        <span className=" font-bold mr-[3.6rem]">Name</span>
                      )}
                      {item.name && (
                        <p className=" w-[13.4rem]  "> : {item.name}</p>
                      )}
                    </div>

                    {item.Class && (
                      <p>
                        <span className=" font-bold mr-[3.8rem]">Class</span> :{" "}
                        {item.Class}
                      </p>
                    )}
                    {item.section && (
                      <p>
                        <span className=" font-bold mr-[2.5rem]">Section</span>{" "}
                        : {item.section}{" "}
                      </p>
                    )}
                    {item.dateofBirth && (
                      <p>
                        <span className=" font-bold mr-[2.5rem]">D. O. B.</span>{" "}
                        :{" "}
                        {item.dateofBirth
                          ? new Date(item.dateofBirth)
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "/")
                          : ""}
                      </p>
                    )}
                    {item.designation && (
                      <p>
                        <span className=" font-bold mr-[0rem]">
                          Designation{" "}
                        </span>{" "}
                        : {item.designation}
                      </p>
                    )}
                    {item.bloodGroup && (
                      <p>
                        <span className=" font-bold mr-[1.5rem]">
                          Blood Gr.
                        </span>{" "}
                        : {item.bloodGroup}
                      </p>
                    )}
                    {item.contactNumber && (
                      <p>
                        <span className=" font-bold mr-[0.1rem]">
                          Contact No.
                        </span>{" "}
                        : {item.contactNumber}
                      </p>
                    )}
                    <div className=" flex ">
                      {item.address && (
                        <span className=" font-bold mr-[2.4rem]">Address</span>
                      )}
                      {item.address && (
                        <p className=" w-[12.9rem] "> : {item.address}</p>
                      )}
                    </div>
                  </div>
                  {!loading && (
                    <button
                      className="download-button "
                      onClick={() => handleDownload(index)}
                    >
                      Download
                    </button>
                  )}
                </div>
              </div>
            ))}

          {/* 1 */}
          {Temp.slice(12, -5) === "NHTemp1" &&
            currentTemplates.map((item, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className=" flex justify-center align-middle items-center shadow-lg "
              >
                <div className=" w-[22.2rem] bg-green-400 border relative ">
                  {item.formField?.vtemp ? (
                    <img
                      src={item.formField?.vtemp}
                      alt=""
                      loading="lazy"
                      className="z-0"
                    />
                  ) : (
                    <img src={Temp} alt="" loading="lazy" className="  z-0" />
                  )}

                  <img
                    className=" w-[5.05rem] h-[6.99rem] top-[5.2rem] left-[1rem] rounded-lg absolute  "
                    src={item.uploadyourPassport}
                    alt=""
                  />
                  <div className=" z-50 absolute top-[5.2rem] left-[7.2rem] leading-[1.1rem] font-semibold ">
                    <div className=" flex">
                      {item.name && (
                        <span className=" font-bold mr-[1.8rem]">Name</span>
                      )}
                      {item.name && (
                        <p className=" w-[10.1rem] "> : {item.name}</p>
                      )}
                    </div>

                    {item.Class && (
                      <p>
                        <span className=" font-bold mr-[2rem]">Class</span> :{" "}
                        {item.Class}
                      </p>
                    )}
                    {item.section && (
                      <p>
                        <span className=" font-bold mr-[0.85rem]">Section</span>{" "}
                        : {item.section}{" "}
                      </p>
                    )}

                    {item.designation && (
                      <p>
                        <span className=" font-bold mr-[1.5rem]">Desig. </span>{" "}
                        : {item.designation}
                      </p>
                    )}
                    {item.bloodGroup && (
                      <p>
                        <span className=" font-bold mr-[0rem]">Blood Gr.</span>{" "}
                        : {item.bloodGroup}
                      </p>
                    )}
                    <div className=" flex ">
                      {item.address && (
                        <span className=" font-bold mr-[0.8rem]">Address</span>
                      )}
                      {item.address && (
                        <p className=" w-[10.5rem] "> : {item.address}</p>
                      )}
                    </div>
                  </div>
                  {!loading &&  <button
                    className="download-button "
                    onClick={() => handleDownload(index)}
                  >
                    Download
                  </button>}
                </div>
              </div>
            ))}

          {/* 2 */}
          {Temp.slice(12, -5) === "NHTemp2" &&
            currentTemplates.map((item, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className=" flex justify-center align-middle items-center shadow-lg "
              >
                <div className=" w-[22.2rem] bg-green-400 border relative ">
                  {item.formField?.vtemp ? (
                    <img
                      src={item.formField?.vtemp}
                      alt=""
                      loading="lazy"
                      className="  z-0"
                    />
                  ) : (
                    <img src={Temp} alt="" loading="lazy" className="  z-0" />
                  )}

                  <img
                    className=" w-[5.2rem] h-[6.4rem] top-[6.2rem] left-[0.9rem] absolute  "
                    src={item.uploadyourPassport}
                    alt=""
                  />
                  <div className=" z-50 absolute top-[5.9rem] left-[7.3rem] leading-[1.1rem] text-[0.8rem] font-semibold ">
                    <div className=" flex">
                      {item.name && (
                        <span className=" font-bold mr-[1.8rem]">Name</span>
                      )}
                      {item.name && (
                        <p className=" w-[10.1rem] "> : {item.name}</p>
                      )}
                    </div>
                    {item.Class && (
                      <p>
                        <span className=" font-bold mr-[2rem]">Class</span> :{" "}
                        {item.Class}
                      </p>
                    )}
                    {item.section && (
                      <p>
                        <span className=" font-bold mr-[0.8rem]">Section</span>{" "}
                        : {item.section}{" "}
                      </p>
                    )}

                    {item.designation && (
                      <p>
                        <span className=" font-bold mr-[1.4rem]">Desig. </span>{" "}
                        : {item.designation}
                      </p>
                    )}
                    {item.bloodGroup && (
                      <p>
                        <span className=" font-bold mr-[0rem]">Blood Gr.</span>{" "}
                        : {item.bloodGroup}
                      </p>
                    )}
                    <div className=" flex ">
                      {item.address && (
                        <span className=" font-bold mr-[0.8rem]">Address</span>
                      )}
                      {item.address && (
                        <p className=" w-[10rem] "> : {item.address}</p>
                      )}
                    </div>
                  </div>
                  {!loading &&  <button
                    className="download-button "
                    onClick={() => handleDownload(index)}
                  >
                    Download
                  </button>}
                </div>
              </div>
            ))}

          {/* 3 */}
          {Temp.slice(12, -5) === "NHTemp3" &&
            currentTemplates.map((item, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className=" flex justify-center align-middle items-center shadow-lg "
              >
                <div className=" w-[22.2rem] bg-green-400 border relative ">
                  {item.formField?.vtemp ? (
                    <img
                      src={item.formField?.vtemp}
                      alt=""
                      loading="lazy"
                      className="  z-0"
                    />
                  ) : (
                    <img src={Temp} alt="" loading="lazy" className="  z-0" />
                  )}

                  <img
                    className=" w-[5.1rem] h-[7rem] top-[5.2rem] left-[15.62rem] rounded-lg absolute  "
                    src={item.uploadyourPassport}
                    alt=""
                  />
                  <div className=" z-50 absolute top-[5.2rem] left-[1rem] leading-[1.1rem] font-semibold ">
                    <div className=" flex">
                      {item.name && (
                        <span className=" font-bold mr-[1.8rem]">Name</span>
                      )}
                      {item.name && (
                        <p className=" w-[9.7rem] "> : {item.name}</p>
                      )}
                    </div>
                    {item.Class && (
                      <p>
                        <span className=" font-bold mr-[2rem]">Class</span> :{" "}
                        {item.Class}
                      </p>
                    )}
                    {item.section && (
                      <p>
                        <span className=" font-bold mr-[0.8rem]">Section</span>{" "}
                        : {item.section}{" "}
                      </p>
                    )}

                    {item.designation && (
                      <p>
                        <span className=" font-bold mr-[1.4rem]">Desig. </span>{" "}
                        : {item.designation}
                      </p>
                    )}
                    {item.bloodGroup && (
                      <p>
                        <span className=" font-bold mr-[0rem]">Blood Gr.</span>{" "}
                        : {item.bloodGroup}
                      </p>
                    )}
                    <div className=" flex ">
                      {item.address && (
                        <span className=" font-bold mr-[0.8rem]">Address</span>
                      )}
                      {item.address && (
                        <p className=" w-[9.7rem] "> : {item.address}</p>
                      )}
                    </div>
                  </div>
                  {!loading &&  <button
                    className="download-button "
                    onClick={() => handleDownload(index)}
                  >
                    Download
                  </button>}
                </div>
              </div>
            ))}
          {/* 4 */}
          {Temp.slice(12, -5) === "HTemp4" &&
            currentTemplates.map((item, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className=" flex justify-center align-middle items-center shadow-lg "
              >
                <div className=" w-[22.2rem] bg-green-400 border relative ">
                  {item.formField?.vtemp ? (
                    <img
                      src={item.formField?.vtemp}
                      alt=""
                      loading="lazy"
                      className="z-0 bottom-5"
                    />
                  ) : (
                    <img src={Temp} alt="" loading="lazy" className="  z-0" />
                  )}

                  <img
                    className=" w-[5.3rem] h-[6.99rem] top-[4.7rem] left-[1.2rem]  absolute  "
                    src={item.uploadyourPassport}
                    alt=""
                  />
                  <div className=" z-50 absolute top-[5.2rem] left-[7.2rem] leading-[1.1rem] font-semibold ">
                    <div className=" flex">
                      {item.name && (
                        <span className=" font-bold mr-[1.8rem]">Name</span>
                      )}
                      {item.name && (
                        <p className=" w-[10.1rem] "> : {item.name}</p>
                      )}
                    </div>

                    {item.Class && (
                      <p>
                        <span className=" font-bold mr-[2rem]">Class</span> :{" "}
                        {item.Class}
                      </p>
                    )}
                    {item.section && (
                      <p>
                        <span className=" font-bold mr-[0.85rem]">Section</span>{" "}
                        : {item.section}{" "}
                      </p>
                    )}

                    {item.designation && (
                      <p>
                        <span className=" font-bold mr-[1.5rem]">Desig. </span>{" "}
                        : {item.designation}
                      </p>
                    )}
                    {item.bloodGroup && (
                      <p>
                        <span className=" font-bold mr-[0rem]">Blood Gr.</span>{" "}
                        : {item.bloodGroup}
                      </p>
                    )}
                    <div className=" flex ">
                      {item.address && (
                        <span className=" font-bold mr-[0.8rem]">Address</span>
                      )}
                      {item.address && (
                        <p className=" w-[10.5rem] "> : {item.address}</p>
                      )}
                    </div>
                  </div>
                  {!loading &&  <button
                    className="download-button "
                    onClick={() => handleDownload(index)}
                  >
                    Download
                  </button>}
                </div>
              </div>
            ))}
          {/* 5 */}
          {Temp.slice(12, -5) === "HTemp5" &&
            currentTemplates.map((item, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className=" flex justify-center align-middle items-center shadow-lg "
              >
                <div className=" w-[22.2rem] bg-green-400 border relative ">
                  {item.formField?.vtemp ? (
                    <img
                      src={item.formField?.vtemp}
                      alt=""
                      loading="lazy"
                      className="z-0 bottom-5"
                    />
                  ) : (
                    <img src={Temp} alt="" loading="lazy" className="  z-0" />
                  )}

                  <img
                    className=" w-[5.3rem] h-[6.99rem] top-[4.5rem] left-[10px]  absolute  "
                    src={item.uploadyourPassport}
                    alt=""
                  />
                  <div className=" z-50 absolute top-[5.2rem] left-[7.2rem] leading-[1.1rem] font-semibold ">
                    <div className=" flex">
                      {item.name && (
                        <span className=" font-bold mr-[1.8rem]">Name</span>
                      )}
                      {item.name && (
                        <p className=" w-[10.1rem] "> : {item.name}</p>
                      )}
                    </div>

                    {item.Class && (
                      <p>
                        <span className=" font-bold mr-[2rem]">Class</span> :{" "}
                        {item.Class}
                      </p>
                    )}
                    {item.section && (
                      <p>
                        <span className=" font-bold mr-[0.85rem]">Section</span>{" "}
                        : {item.section}{" "}
                      </p>
                    )}

                    {item.designation && (
                      <p>
                        <span className=" font-bold mr-[1.5rem]">Desig. </span>{" "}
                        : {item.designation}
                      </p>
                    )}
                    {item.bloodGroup && (
                      <p>
                        <span className=" font-bold mr-[0rem]">Blood Gr.</span>{" "}
                        : {item.bloodGroup}
                      </p>
                    )}
                    <div className=" flex ">
                      {item.address && (
                        <span className=" font-bold mr-[0.8rem]">Address</span>
                      )}
                      {item.address && (
                        <p className=" w-[10.5rem] "> : {item.address}</p>
                      )}
                    </div>
                  </div>
                  {!loading &&  <button
                    className="download-button "
                    onClick={() => handleDownload(index)}
                  >
                    Download
                  </button>}
                </div>
              </div>
            ))}
          {/* 6*/}
          {Temp.slice(12, -5) === "HTemp3" &&
            currentTemplates.map((item, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className=" flex justify-center align-middle items-center shadow-lg "
              >
                <div className=" w-[22.2rem] bg-green-400 border relative ">
                  {item.formField?.vtemp ? (
                    <img
                      src={item.formField?.vtemp}
                      alt=""
                      loading="lazy"
                      className="z-0 bottom-5"
                    />
                  ) : (
                    <img src={Temp} alt="" loading="lazy" className="  z-0" />
                  )}

                  <img
                    className=" w-[5.3rem] h-[6.99rem] top-[5rem] left-[21px]  absolute  "
                    src={item.uploadyourPassport}
                    alt=""
                  />
                  <div className=" z-50 absolute top-[6.5rem] left-[7.2rem] leading-[1.1rem] font-semibold ">
                    <div className=" flex">
                      {item.name && (
                        <span className=" font-bold mr-[1.8rem]">Name</span>
                      )}
                      {item.name && (
                        <p className=" w-[10.1rem] "> : {item.name}</p>
                      )}
                    </div>

                    {item.Class && (
                      <p>
                        <span className=" font-bold mr-[2rem]">Class</span> :{" "}
                        {item.Class}
                      </p>
                    )}
                    {item.section && (
                      <p>
                        <span className=" font-bold mr-[0.85rem]">Section</span>{" "}
                        : {item.section}{" "}
                      </p>
                    )}

                    {item.designation && (
                      <p>
                        <span className=" font-bold mr-[1.5rem]">Desig. </span>{" "}
                        : {item.designation}
                      </p>
                    )}
                    {item.bloodGroup && (
                      <p>
                        <span className=" font-bold mr-[0rem]">Blood Gr.</span>{" "}
                        : {item.bloodGroup}
                      </p>
                    )}
                    <div className=" flex ">
                      {item.address && (
                        <span className=" font-bold mr-[0.8rem]">Address</span>
                      )}
                      {item.address && (
                        <p className=" w-[10.5rem] "> : {item.address}</p>
                      )}
                    </div>
                  </div>
                  {!loading &&  <button
                    className="download-button "
                    onClick={() => handleDownload(index)}
                  >
                    Download
                  </button>}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="text-right">
        <button
          className="text-white mx-1 my-1 bg-blue-700 text-xl px-5 py-2 rounded-md hover:bg-blue-600"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="text-white mx-1 my-1 bg-blue-700 text-xl px-5 py-2 rounded-md hover:bg-blue-600"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Templates;
