import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://bviuhriolcuvayzbgzum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aXVocmlvbGN1dmF5emJnenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MDgyOTksImV4cCI6MjA0NTA4NDI5OX0.A5c9eHjNu37OaCt9DTCr-aKFHvyG8z1X_dHLpxl7aRc"
);

function SuccessPage() {
  const navigate = useNavigate();
  async function signOutUser() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <div>
      <h1>Registrace proběhla úspěšně</h1>
      <button onClick={signOutUser}>Odhlásit se</button>
    </div>
  );
}

export default SuccessPage;
