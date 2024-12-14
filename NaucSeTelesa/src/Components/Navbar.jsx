import React, { useState } from "react";
import "../App.css";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-quick text-white px-4 py-2 flex justify-between items-center">
      {/* Left Side: Collapsible Menu */}
      <div className="flex items-center">
        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
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

        {/* Menu Items (Hidden on small screens, visible on large screens) */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-quick lg:static lg:block lg:w-auto  rounded-full`}
        >
          <ul className="lg:flex lg:space-x-4 space-y-2 lg:space-y-0 p-4 lg:p-0 ml-12">
            <li>
              <button className="navbutton text-white w-32 md:w-40 lg:w-50 px-4 py-2 text-xl rounded-full ">
                Nevim
              </button>
            </li>
            <li>
              <button className="navbutton text-white w-32 md:w-40 lg:w-50 px-4 py-2 text-xl rounded-full ">
                Tělesa
              </button>
            </li>
            <li>
              <button className="navbutton text-white w-32 md:w-40 lg:w-50 px-4 py-2 text-xl rounded-full ">
                Úkoly
              </button>
            </li>
            <li>
              <button className="navbutton text-white w-32 md:w-40 lg:w-50 px-4 py-2 text-xl rounded-full ">
                O projektu
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side: Prihlaseni */}
      <div>
        <button className="navbutton text-white w-32 md:w-40 lg:w-50 px-4 py-2 text-xl rounded-full border ">
          <p className="text-white text-1xl">Přihlášení</p>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
