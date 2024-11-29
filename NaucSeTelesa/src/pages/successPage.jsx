import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPage from "./adminPage";

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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Registrace proběhla úspěšně</h1>
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
    </div>
  );
}

export default SuccessPage;
