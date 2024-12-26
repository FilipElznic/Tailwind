import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "../App.css";

const supabase = createClient(
  "https://bviuhriolcuvayzbgzum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aXVocmlvbGN1dmF5emJnenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MDgyOTksImV4cCI6MjA0NTA4NDI5OX0.A5c9eHjNu37OaCt9DTCr-aKFHvyG8z1X_dHLpxl7aRc"
);

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [authUser, setAuthUser] = useState(null);

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
            console.log("User data:", data[0]);
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
            isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 "
          } lg:static lg:block lg:w-auto lg:opacity-100 lg:scale-100`}
        >
          <ul className="lg:flex lg:space-x-6 space-y-3 lg:space-y-0 p-6 lg:p-0">
            <li>
              <button className="navbutton w-full text-white text-xl px-4 py-2 rounded-full  lg:text-2xl lg:px-10">
                Nevim
              </button>
            </li>
            <li>
              <button className="navbutton w-full text-white text-xl px-4 py-2 rounded-full  lg:text-2xl lg:px-10">
                Tělesa
              </button>
            </li>
            <li>
              <button className="navbutton w-full text-white text-xl px-4 py-2 rounded-full lg:text-2xl lg:px-10">
                Úkoly
              </button>
            </li>
            <li>
              <button className="navbutton w-full text-white text-xl px-4 py-2 rounded-full lg:text-2xl lg:px-10">
                O projektu
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side: Přihlášení nebo Odhlášení */}
      <div>
        {authUser ? (
          <button
            onClick={signOutUser}
            className="navbutton  text-red-700 w-30 md:w-40 lg:w-50 px-4 py-2 text-xl rounded-full flex justify-center lg:text-2xl items-center lg:px-10"
          >
            Odhlásit
          </button>
        ) : (
          <button
            onClick={() => (window.location.href = "/")}
            className="navbutton text-white w-30 md:w-40 lg:w-50 px-4 py-2 text-xl rounded-full border hover:bg-gray-800 transition-all duration-300 lg:text-2xl flex justify-center items-center lg:px-10"
          >
            <p className="text-white">Přihlášení</p>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
