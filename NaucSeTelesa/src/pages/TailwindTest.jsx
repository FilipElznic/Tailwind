import "../App.css";
import Spline from "@splinetool/react-spline";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

function TailwindTest() {
  const [authUser, setAuthUser] = useState(null);
  const [data, setData] = useState(null);

  // Fetch authenticated user session
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

  // Fetch user data from the database
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
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    }
    fetchData();
  }, [authUser]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mb-20 text-white">
      <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-7xl font-bold md:mb-7 text-white p-11">
        Osobní stránka
      </h1>
      <div className="flex flex-col h-full w-5/6 justify-center items-center">
        <div className="flex flex-col sm:flex-row w-full">
          <div className="w-full md:w-1/5 h-96 usergradient m-2 rounded-3xl"></div>
          <div className="w-full md:w-3/5 h-96 usergradient m-2 rounded-3xl">
            <div className="flex flex-col h-full justify-center text-white p-11">
              {data ? (
                <>
                  <h1 className="text-7xl p-5">
                    Hi, {data.name} {data.surname}
                  </h1>
                  <p className="text-2xl userid px-2">{data.authid}</p>
                </>
              ) : (
                <p className="text-xl">Loading user data...</p>
              )}
              {authUser ? (
                <p className="text-3xl useremail p-2">{authUser.email}</p>
              ) : (
                <p className="text-xl">Loading auth user...</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/5 h-96 usergradient m-2 rounded-3xl">
            <Spline scene="https://prod.spline.design/i4RPN7ynugvjhc24/scene.splinecode" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full">
          <div className="w-full md:w-2/5 h-96 usergradient m-2 rounded-3xl">
            <img
              src="/userimg.png"
              alt="telesa"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
          <div className="w-full md:w-1/5 h-96 usergradient m-2 rounded-3xl"></div>
          <div className="w-full md:w-2/5 h-96 usergradient m-2 rounded-3xl">
            <div className="h-full w-full flex flex-col justify-center items-center text-white p-11">
              <h1 className="text-xl md:text-5xl lg:text-6xl pb-2">
                Začít objevovat,
              </h1>
              <p className="md:text-xl userid">Ochutnejte pilulku geometrie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TailwindTest;
