import "../App.css";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const supabase = createClient(
  "https://bviuhriolcuvayzbgzum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aXVocmlvbGN1dmF5emJnenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MDgyOTksImV4cCI6MjA0NTA4NDI5OX0.A5c9eHjNu37OaCt9DTCr-aKFHvyG8z1X_dHLpxl7aRc"
);

function InfoForm() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [jmeno, setJmeno] = useState("");
  const [prijmeni, setPrijmeni] = useState("");
  const [prezdivka, setPrezdivka] = useState("");

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
        console.log("Authenticated user:", session.user);
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

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!authUser) {
      console.error("No authenticated user found.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user")
        .update({
          name: jmeno,
          surname: prijmeni,
          nickname: prezdivka,
        })
        .eq("authid", authUser.id);

      if (error) {
        console.error("Error updating data:", error);
      } else {
        console.log("Data updated successfully:", data);
      }
    } catch (error) {
      console.error("Unexpected error during form submission:", error);
    }
  }

  async function signOutUser() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected error during sign-out:", error);
    }
  }
  const [isVisible, setIsVisible] = useState(true);

  const handleHide = () => {
    setIsVisible(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      {isVisible && (
        <div className="w-[80vw] flex flex-col md:flex-row gap-6 border-form rounded-3xl bg-zinc-900 relative">
          <div className="w-full md:w-1/2 md:h-[80vh] bg-zinc-900 border-form rounded-3xl flex justify-center items-center md:items-start md:pl-20 flex-col text-white">
            <div className="w-3/4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-6xl font-bold pb-6 pt-5 md:pb-12">
                Skvělé, že jste se zaregistrovali!
              </h1>
              <p className="text-2xl mt-5 text-gray-300">
                Abychom vám mohli nabídnout co nejlepší, potřebujeme od vás
                ještě pár drobných informací.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:h-[80vh] bg-zinc-900 flex border-form rounded-3xl justify-center items-start flex-col p-6 lg:pr-16 xl:pr-32 relative">
            <div
              className="absolute top-0 right-0 m-2 md:m-10 w-8 h-8 flex justify-center items-center cursor-pointer"
              onClick={handleHide}
            >
              <div className="cross"></div>
            </div>

            <div className="flex w-full flex-col sm:flex-row gap-5">
              <div className="flex flex-col w-full items-center">
                <h3>Jméno</h3>
                <input
                  className="w-full h-16 bg-zinc-800 p-2 rounded-full"
                  type="text"
                  name="jmeno"
                  value={jmeno}
                  onChange={(e) => setJmeno(e.target.value)}
                  placeholder="Karel"
                  required
                />
              </div>
              <div className="flex flex-col w-full items-center">
                <h3>Přijmení</h3>
                <input
                  className="w-full h-16 bg-zinc-800 rounded-full p-2"
                  type="text"
                  name="prijmeni"
                  value={prijmeni}
                  onChange={(e) => setPrijmeni(e.target.value)}
                  placeholder="Novák"
                  required
                />
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="flex flex-col w-full items-center mt-5">
                <h3>Přezdívka</h3>
                <input
                  className="w-full h-16 bg-zinc-800 rounded-full p-2"
                  type="text"
                  name="prezdivka"
                  value={prezdivka}
                  onChange={(e) => setPrezdivka(e.target.value)}
                  placeholder="KarelNovak123"
                  required
                />
              </div>
            </div>

            <div className="w-full flex justify-center items-center mt-5 md:mt-10">
              <button
                className="w-1/2 h-14 bg-purple-950 rounded-2xl"
                onClick={handleSubmit}
              >
                Začít objevovat
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={signOutUser}
        className="px-6 py-3 bg-opacity-40 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 hover:scale-105 transform transition-all duration-200 ease-in-out focus:ring-4 focus:ring-blue-300"
      >
        Odhlásit se
      </button>
    </div>
  );
}

export default InfoForm;
