import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/opretions/userApi";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log("User in navbar ", user);

  return (
    <div className="text-white bg-blue-600">
      <div className="h-[4rem] w-11/12 mx-auto flex justify-between items-center">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <p className="text-lg font-bold">Shriram ID Cards</p>
        </div>
        <div className="hidden md:block">
          <ul className="flex gap-5">
            <li onClick={() => navigate("/")} className="cursor-pointer">
              Home
            </li>
            {user && <li onClick={() => navigate("/card")}>Admin</li>}
            <li className="cursor-pointer">
              <Link to="/about">About Us</Link>
            </li>
            {/* <li className="cursor-pointer">Contact Us</li> */}
            <li className="cursor-pointer">
              <Link to={"/addTemplates"}>Add Templates</Link>
            </li>
            <li className="cursor-pointer">
              <Link to={"/All-Templates"}>All Templates</Link>
            </li>
          </ul>
        </div>
        <div>
          {user ? (
            <button
              onClick={() => logout(navigate, dispatch)}
              className=" bg-white px-4 py-1 rounded-xl text-gray-900"
            >
              LogOut
            </button>
          ) : (
            <button
              onClick={() => navigate("/#login")}
              className=" bg-white px-4 py-1 rounded-xl text-gray-900"
            >
              Login
            </button>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-transparent p-2 rounded"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500">
          <ul className="flex flex-col gap-2 p-4">
            <li
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className="cursor-pointer"
            >
              Home
            </li>
            {user && <li onClick={() => navigate("/card")}>Admin</li>}

            <li className="cursor-pointer">About Us</li>
            {/* <li className="cursor-pointer">Contact Us</li> */}
            <li className="cursor-pointer">
              <Link to={"/addTemplates"}>Templates</Link>
            </li>
            <li className="cursor-pointer">
              <Link to={"/All-Templates"}>All Templates</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
