import React from "react";
import image1 from "../assets/complete-work-concept-work-report-with-check-mark-work-checklist-employee-is-checking-report_675567-1496.jpg";
import image2 from "../assets/plastic-id-card-personal-identity-card-driver-license-identification-verification_349999-508.jpg";
import { useNavigate } from "react-router-dom";

function Card() {
  const navigate = useNavigate();
  return (
    <div className="flex gap-10 lg:gap-[9rem] flex-col md:flex-row p-10 justify-center items-center card">
      <div
        className="bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-2xl font-[sans-serif] overflow-hidden mx-auto mt-4 md:mx-4"
        onClick={() => navigate("/template")}
      >
        <img
          src={image1}
          className="w-full h-[244px]"
          style={{ borderRadius: "1rem 1rem 0 0" }}
        />
        <div className="p-6">
          <h3 className="text-3xl text-[#333] font-extrabold text-center">
            Select Template
          </h3>
        </div>
      </div>
      <div
        className="bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-2xl font-[sans-serif] overflow-hidden mx-auto mt-4 md:mx-4"
        onClick={() => navigate("/admin")}
      >
        <img
          src={image2}
          className="w-full "
          style={{ borderRadius: "1rem 1rem 0 0" }}
        />
        <div className="p-6">
          <h3 className="text-3xl text-[#333] font-extrabold text-center">
            Approve Form
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
