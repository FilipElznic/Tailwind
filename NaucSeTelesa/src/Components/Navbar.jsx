import React, { useState } from "react";
import "../App.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-quick text-white px-4 py-2 flex justify-between items-center shadow-lg relative">
      {/* Left Side: Collapsible Menu */}
      <div className="flex items-center">
        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none transition-transform transform duration-300"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Slide-In Menu */}
        <div
          className={`absolute top-16 left-0 w-80 bg-black rounded-3xl transition-all duration-500 ease-in-out ${
            isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 "
          } lg:static lg:block lg:w-auto lg:opacity-100 lg:scale-100`}
        >
          <ul className="lg:flex lg:space-x-6 space-y-3 lg:space-y-0 p-6 lg:p-0">
            <li>
              <button className="navbutton w-full text-white text-xl px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300">
                Nevim
              </button>
            </li>
            <li>
              <button className="navbutton w-full text-white text-xl px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300">
                Tělesa
              </button>
            </li>
            <li>
              <button className="navbutton w-full text-white text-xl px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300">
                Úkoly
              </button>
            </li>
            <li>
              <button className="navbutton w-full text-white text-xl px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300">
                O projektu
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side: Přihlášení */}
      <div>
        <button
          onClick={() => (window.location.href = "/")}
          className="navbutton text-white w-30 md:w-40 lg:w-50 px-4 py-2 text-xl rounded-full border hover:bg-gray-800 transition-all duration-300"
        >
          <p className="text-white">Přihlášení</p>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
