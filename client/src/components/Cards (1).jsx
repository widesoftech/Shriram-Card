// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import image1 from '../assets/user.png';
import { useNavigate } from "react-router-dom";

function Cards() {  
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row min-h-[80vh] justify-center items-center gap-4 p-4 mt-4 mb-4">
      <div className="mx-auto bg-white shadow-lg w-full md:w-96 rounded-2xl h-[300px] flex flex-col" onClick={() => navigate("/forms", {state : { template : "Vertical"}})}>
        <div className="h-48 p-3 overflow-hidden bg-gray-200 flex justify-center items-center">
          <img src={image1} className="w-[123px] h-[129px] mt-[16px]" />
        </div>
        <div className="p-3 flex-1">
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 col-span-2 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="..."></div>
            <div className="col-span-2 ..."></div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg select-none rounded-2xl flex flex-col sm:flex-row gap-4 p-4" onClick={() => navigate("/forms", {state : { template : "Horizontal"}})}>
        <div className="bg-gray-200 h-52 sm:h-full sm:w-1/3 rounded-xl flex justify-center items-center">
          <img src={image1} className="w-[123px] h-[129px]" />
        </div>
        <div className="flex flex-col flex-1 gap-5 sm:p-2">
          <div className="flex flex-col flex-1 gap-3">
            <div className="w-full bg-gray-200 h-14 rounded-2xl animate-pulse"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
          </div>
          <div className="flex gap-3 mt-auto">
            <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-20 h-8 ml-auto bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
