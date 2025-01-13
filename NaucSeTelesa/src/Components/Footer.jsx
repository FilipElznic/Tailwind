import "../App.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-zinc-900  p-3 sm:pl-[20vw] sm:pr-[20vw] border-t border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-center pb-3">
        {/* Logo */}
        <div className="flex flex-row  mb-4 sm:mb-0">
          <img src="/cube.png" alt="Logo" className="w-16 h-16" />
        </div>

        {/* Navigation Buttons */}
        <ul className="flex flex-row space-x-4  sm:space-y-0 items-center">
          <li>
            <Link to="/" className="text-white px-2 hover:underline">
              Domů
            </Link>
          </li>
          <li>
            <Link to="/telesa" className="text-white px-2 hover:underline">
              Tělesa
            </Link>
          </li>
          <li>
            <Link to="/ukoly" className="text-white px-2 hover:underline">
              Úkoly
            </Link>
          </li>
          <li>
            <Link to="/oprojektu" className="text-white px-2 hover:underline">
              O projektu
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />

      {/* Footer */}
      <div className="text-center mt-3">
        <p className="text-white">© 2025 Filip Elznic. All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
