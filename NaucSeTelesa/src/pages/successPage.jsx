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
  const [authUser, setAuthUser] = useState(null); // State for authenticated user

  useEffect(() => {
    // Fetch authenticated user details
    async function fetchAuthUser() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
      } else if (session) {
        setAuthUser(session.user); // Set the authenticated user in state
        console.log("Authenticated user:", session.user);
      }
    }

    fetchAuthUser();
  }, []);

  useEffect(() => {
    // Fetch additional user data from the database
    async function fetchData() {
      try {
        if (authUser) {
          const { data, error } = await supabase
            .from("user") // Replace 'user' with your actual table name
            .select("*")
            .eq("authid", authUser.id); // Filter by authenticated user's ID

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

  // Sign-out function
  async function signOutUser() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      } else {
        navigate("/"); // Redirect to the home page after successful sign-out
      }
    } catch (error) {
      console.error("Unexpected error during sign-out:", error);
    }
  }

  return (
    <div>
      <h1>Registrace proběhla úspěšně</h1>
      {authUser ? (
        <div>
          <p>
            <strong>User ID:</strong> {authUser.id}
          </p>
          <p>
            <strong>Email:</strong> {authUser.email}
          </p>
        </div>
      ) : (
        <p>Loading authenticated user...</p>
      )}

      <button onClick={signOutUser}>Odhlásit se</button>
      <AdminPage />
    </div>
  );
}

export default SuccessPage;

/* 
 
      {userData ? (
        <div>
          <p>
            <strong>Name:</strong> {userData.Name}
          </p>
          <p>
            <strong>Admin:</strong> {userData.Admin ? "Yes" : "No"}
          </p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

*/
