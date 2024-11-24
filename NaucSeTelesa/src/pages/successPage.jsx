import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://bviuhriolcuvayzbgzum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aXVocmlvbGN1dmF5emJnenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MDgyOTksImV4cCI6MjA0NTA4NDI5OX0.A5c9eHjNu37OaCt9DTCr-aKFHvyG8z1X_dHLpxl7aRc"
);
function SuccessPage() {
  const navigate = useNavigate();

  // Fetch user data and log it to the console [ toto vypíše data uživatele do konzole z databáze ]
  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from("user") // Replace 'user' with your actual table name if different
          .select("");

        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("User data:", data);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    }

    fetchData();
  }, []);

  // Sign-out function
  async function signOutUser() {
    //[ toto odhlasi uzivatele ]
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
