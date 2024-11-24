import { createClient } from "@supabase/supabase-js";
//import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://bviuhriolcuvayzbgzum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aXVocmlvbGN1dmF5emJnenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MDgyOTksImV4cCI6MjA0NTA4NDI5OX0.A5c9eHjNu37OaCt9DTCr-aKFHvyG8z1X_dHLpxl7aRc"
);

function SuccessPage() {
  const navigate = useNavigate();

  /* 
  // Basic select
    const [userData, setUserData] = useState(null);


   useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from("user") // Replace 'user' with your actual table name if different
          .select("id, Admin, Name");

        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("User data:", data);
          setUserData(data[0]); // Store the first user data object in the state
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    }

    fetchData();
  }, []);*/
  // Fetch user data and update state

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

      <button onClick={signOutUser}>Odhlásit se</button>
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
