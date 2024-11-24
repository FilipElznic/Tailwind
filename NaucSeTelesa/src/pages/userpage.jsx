import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://bviuhriolcuvayzbgzum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aXVocmlvbGN1dmF5emJnenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MDgyOTksImV4cCI6MjA0NTA4NDI5OX0.A5c9eHjNu37OaCt9DTCr-aKFHvyG8z1X_dHLpxl7aRc"
);
function UserPage() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.rpc("fetch_user_data");

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setUserData(data);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>User Data</h1>
      <ul>
        {userData.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email} - Admin:{" "}
            {user.admin ? "Yes" : "No"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserPage;
