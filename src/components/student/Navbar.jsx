import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");

  return (
    <>
      <div
        className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
          isCourseListPage ? "bg-white" : "bg-cyan-100/70"
        }`}
      >
        <img
          src={assets.logo}
          alt="Logo"
          className="w-28 lg:w-32 cursor-pointer"
        />

        {/* Десктопна навігація */}
        <div className="hidden md:flex items-center gap-5 text-gray-500">
          {/* <div className="flex items-center gap-5">
            <button>Стати викладачем</button> |
            <Link to="/my-enrollments">Моє навчання</Link>
          </div> */}
          <button
            onClick={() => {
              setShowLogin(true);
              setShowRegister(false);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Створити акаунт
          </button>
        </div>

        {/* Мобільна навігація */}
        <div className="flex md:hidden items-center gap-5 text-gray-500">
          {/* <div className="flex items-center gap-2">
            <button>Стати викладачем</button> |
            <Link to="/my-enrollments">Моє навчання</Link>
          </div> */}
          <button
            onClick={() => {
              setShowLogin(true);
              setShowRegister(false);
            }}
          >
            <img src={assets.user_icon} alt="User Icon" className="w-8 h-8" />
          </button>
        </div>
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
