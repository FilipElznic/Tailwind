import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPage from "./adminPage";
import Robot from "/robot.png";

const supabase = createClient(
  "https://bviuhriolcuvayzbgzum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aXVocmlvbGN1dmF5emJnenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MDgyOTksImV4cCI6MjA0NTA4NDI5OX0.A5c9eHjNu37OaCt9DTCr-aKFHvyG8z1X_dHLpxl7aRc"
);

function SuccessPage() {
  const navigate = useNavigate();
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

  return (
    <>
      <div className="h-screen  text-white imgbg  flex flex-col items-center justify-center p-20">
        <div className="w-full p-5 bg-opacity-90 bg-black h-full flex flex-col items-center justify-center rounded-3xl">
          <h2 className="text-xl  mb-6 text-gray-700">
            Registrace proběhla úspěšně, ale ...
          </h2>
          <h1 className="text-6xl font-bold mb-6">
            Ještě něco o tobě potřebujeme vědět
          </h1>
          <div className="h-full w-full flex flex-col sm:flex-row">
            <div className="flex-1 flex justify-center items-center">
              <img src={Robot} className=" object-fit" />
            </div>
            <div className="flex-1 flex justify-center items-center">
              <form className="space-y-4 p-6 w-3/4 rounded-xl shadow-lg">
                <div>
                  <label
                    htmlFor="jmeno"
                    className="block text-sm text-white mb-1"
                  >
                    jméno
                  </label>
                  <input
                    type="text"
                    id="jmeno"
                    className="w-full px-4 py-2 rounded-full formcolor text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="prijmeni"
                    className="block text-sm text-white mb-1"
                  >
                    příjmení
                  </label>
                  <input
                    type="text"
                    id="prijmeni"
                    className="w-full px-4 py-2 rounded-full formcolor text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="prezdivka"
                    className="block text-sm text-white mb-1"
                  >
                    přezdívka
                  </label>
                  <input
                    type="text"
                    id="prezdivka"
                    className="w-full px-4 py-2 rounded-full formcolor text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-full bg-purple-700 text-white font-semibold hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  odeslat
                </button>
              </form>
            </div>
          </div>

          <button
            onClick={signOutUser}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:scale-105 transform transition-all duration-200 ease-in-out focus:ring-4 focus:ring-blue-300"
          >
            Odhlásit se
          </button>
        </div>
      </div>
    </>
  );
}

export default SuccessPage;

/*
{authUser ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center mb-6">
            <p className="mb-2">
              <strong>User ID:</strong> {authUser.id}
            </p>
            <p>
              <strong>Email:</strong> {authUser.email}
            </p>
          </div>
        ) : (
          <p>Loading authenticated user...</p>
        )}
        <button
          onClick={signOutUser}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:scale-105 transform transition-all duration-200 ease-in-out focus:ring-4 focus:ring-blue-300"
        >
          Odhlásit se
        </button>
        <AdminPage />
<


*/
