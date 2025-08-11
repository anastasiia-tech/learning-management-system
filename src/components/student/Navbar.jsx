import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useLocation } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Navbar = () => {
  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const handleAuthSuccess = (userName) => {
    setCurrentUser(userName);
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserMenuOpen(false);
  };

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <>
      <div
        className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
          isCourseListPage ? "bg-white" : "bg-cyan-100/70"
        }`}
      >
        <img
          onClick={() => (window.location.href = "/")}
          src={assets.logo}
          alt="Logo"
          className="w-28 lg:w-32 cursor-pointer"
        />

        <div className="hidden md:flex items-center gap-5 text-gray-500">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="
                  px-5 py-2 rounded-full border border-gray-500 text-gray-700 
                  hover:border-blue-600 hover:text-blue-600 transition-colors
                "
              >
                {currentUser}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
                  <button
                    onClick={() => {
                      handleLogout();
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Вихід
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setShowLogin(true);
                setShowRegister(false);
              }}
              className="bg-blue-600 text-white px-5 py-2 rounded-full"
            >
              Увійти
            </button>
          )}
        </div>

        {/* Мобільна навігація */}
        <div className="flex md:hidden items-center gap-5 text-gray-500">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="
                  px-3 py-1 rounded border border-gray-500 text-gray-700
                  hover:border-blue-600 hover:text-blue-600 transition-colors
                "
              >
                {currentUser}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
                  <button
                    onClick={() => {
                      handleLogout();
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Вихід
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setShowLogin(true);
                setShowRegister(false);
              }}
            >
              <img src={assets.user_icon} alt="User Icon" className="w-8 h-8" />
            </button>
          )}
        </div>
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onLoginSuccess={handleAuthSuccess}
        />
      )}

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          onRegisterSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
};

export default Navbar;
