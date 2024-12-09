import "../App.css";

function Footer() {
  return (
    <div className="bg-quick p-3 sm:pl-[20vw] sm:pr-[20vw] border-t border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-center pb-3">
        {/* Logo */}
        <div className="flex flex-row  mb-4 sm:mb-0">
          <img src="/cube.png" alt="Logo" className="w-16 h-16" />
        </div>

        {/* Navigation Buttons */}
        <ul className="flex flex-row space-x-4  sm:space-y-0 items-center">
          <li>
            <a href="/" className="text-white px-2 hover:underline">
              Domů
            </a>
          </li>
          <li>
            <a href="/" className="text-white px-2 hover:underline">
              Tělesa
            </a>
          </li>
          <li>
            <a href="/" className="text-white px-2 hover:underline">
              Úkoly
            </a>
          </li>
          <li>
            <a href="/" className="text-white px-2 hover:underline">
              O projektu
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />

      {/* Footer */}
      <div className="text-center mt-3">
        <p className="text-white">© 2024 Filip Elznic. All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
