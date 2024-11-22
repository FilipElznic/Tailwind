import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
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
