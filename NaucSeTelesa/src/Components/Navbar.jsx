import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { supabase } from "../supabaseClient";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [data, setData] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    async function fetchAuthUser() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
      } else if (session) {
        setAuthUser(session.user);
      }
    }
    fetchAuthUser();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        if (authUser) {
          const { data, error } = await supabase
            .from("user")
            .select("*")
            .eq("authid", authUser.id);

          if (error) {
            console.error("Error fetching data:", error);
          } else if (data.length > 0) {
            setData(data[0]);
            setAvatarUrl(authUser.user_metadata.avatar_url);
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    }
    fetchData();
  }, [authUser]);

  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      setAuthUser(null);
      console.log("User signed out");
    }
  };

  return (
    <nav className="bg-quick text-white px-4 py-2 flex justify-between items-center shadow-lg relative lg:mt-3">
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
            isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } lg:static lg:block lg:w-auto lg:opacity-100 lg:scale-100`}
        >
          <ul className="lg:flex lg:space-x-6 space-y-3 lg:space-y-0 p-6 lg:p-0">
            <li>
              <Link
                to="/telesa"
                className="navbutton w-full text-white text-xl px-4 py-2 rounded-full lg:text-2xl lg:px-10"
              >
                Tělesa
              </Link>
            </li>
            <li>
              <Link
                to="/ukoly"
                className="navbutton w-full text-white text-xl px-4 py-2 rounded-full lg:text-2xl lg:px-10"
              >
                Úkoly
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="navbutton w-full text-white text-xl px-4 py-2 rounded-full lg:text-2xl lg:px-10"
              >
                O projektu
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side: Přihlášení nebo Odhlášení */}
      <div className="relative">
        {authUser ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white px-4 py-2 text-xl border-form lg:text-2xl flex justify-center items-center lg:px-10"
            >
              <div className="flex flex-row">
                <p className="text-white pr-5">Hi, {data.name}</p>
                <img
                  src={avatarUrl}
                  className="w-10 h-10 object-fit-contain rounded-full"
                />
              </div>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 usergradient text-white rounded-lg shadow-lg flex flex-col justify-start items-start  font-bold z-20">
                <Link to="/profile" className=" p-2">
                  <p className="text-2xl">Účet</p>
                  Profil
                </Link>
                <Link to="/help" className=" p-2">
                  Pomoc
                </Link>
                <Link to="/" className=" p-2">
                  <button onClick={signOutUser} className="text-red-800 p-2">
                    Odhlásit se
                  </button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/prihlaseni"
            className="navbutton text-white w-30 md:w-40 lg:w-50 px-4 py-2 text-xl rounded-full border hover:bg-gray-800 transition-all duration-300 lg:text-2xl flex justify-center items-center lg:px-10"
          >
            Přihlášení
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
