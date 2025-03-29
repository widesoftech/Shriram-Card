// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from "react";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import LoginForm from "../components/LoginForm";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const targetRef = useRef(null);

  // const BASE_URL = process.env.REACT_APP_BASE_URL;

  // console.log(BASE_URL);
  

  useEffect(() => {
    if (location.hash === "#login" && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div>
      <div className="bg-[#E8EBFD]">
        <div className="w-11/12 mx-auto flex flex-col lg:flex-row gap-8 lg:gap-[20rem] pt-[7rem]">
          <div className="flex flex-col gap-4">
            <h2 className="text-black text-3xl font-bold">
              A Fastest Way To Create ID Card
            </h2>
            <p className="text-gray-500">
              ID Card is the easiest, safest and fastest way to authenticate
              yourself...
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 hover:text-white duration-150 px-3 py-2 rounded-md w-[7rem] text-gray-200">
              Click Here
            </button>
          </div>
          <div className="flex justify-center lg:justify-end mb-16">
            <img
              className="w-full max-w-[27rem]"
              src={img1}
              alt="Illustration"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-11/12 mx-auto gap-8 lg:gap-[10rem] relative ">
        <div className="relative top-[-4rem] bg-white w-full max-w-[33rem] rounded-[9rem] h-[25rem] flex justify-center items-center mx-auto lg:mx-0 ">
          <img
            className="w-[18rem] h-[20rem] mt-[65px] lg:mt-0"
            src={img2}
            alt="ID Card"
          />
        </div>
        <div
          ref={targetRef}
          className="pt-10 w-full lg:w-auto mt-[-82px] lg:mt-[70px]"
        >
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
