import React from "react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black">
      {/* Left side - Logo or nav items */}
      <div className="flex items-center space-x-4">
        {/* Example of nav items */}
        <button className="bg-black text-white w-32 md:w-40 lg:w-60 px-4 py-4 text-xl rounded-full border border-gray-800 ">
          Tělesa
        </button>
        <button className="bg-black text-white w-32 md:w-40 lg:w-60 px-4 py-4 text-xl rounded-full border border-gray-800 ">
          Úkoly
        </button>
        <button className="bg-black text-white w-32 md:w-40 lg:w-60 px-4 py-4 text-xl rounded-full border border-gray-800 ">
          O nás
        </button>
        <button className="bg-black text-white w-32 md:w-40 lg:w-60 px-4 py-4 text-xl rounded-full border border-gray-800 ">
          O vývoaji
        </button>
      </div>

      {/* Right side - Register button */}
      <div>
        <button className="bg-black text-white w-32 md:w-40 lg:w-60 px-4 py-4 text-xl rounded-full border border-gray-800 ">
          Prihlasit
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
