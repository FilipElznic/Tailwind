import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const supabase = createClient(
  "https://bviuhriolcuvayzbgzum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aXVocmlvbGN1dmF5emJnenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MDgyOTksImV4cCI6MjA0NTA4NDI5OX0.A5c9eHjNu37OaCt9DTCr-aKFHvyG8z1X_dHLpxl7aRc"
);

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a session exists
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        console.log("User session:", session);
        console.log("User id:", session.user.id);
        navigate("/success");

        // Insert new user details into 'user' table after successful login
        const { error } = await supabase.from("user").insert([
          {
            name: "John222", // Replace with dynamic data if necessary
            surname: "Doe", // Replace with dynamic data if necessary
            nickname: "johndoe", // Replace with dynamic data if necessary
            admin: true, // Example boolean value
            authid: session.user.id, // User ID from session
          },
        ]);

        if (error) {
          console.error("Error inserting user data:", error.message);
        } else {
          console.log("User data inserted successfully");
        }
      }
    };
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        console.log("User signed in:", session);
        navigate("/success");
      } else if (event === "SIGNED_OUT") {
        console.log("User signed out:", session);
        navigate("/");
      }
    });

    // Cleanup listener on component unmount
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [navigate]);

  return (
    <div>
      <h1>Login</h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        languages={["cz"]}
      />
    </div>
  );
}

export default LoginPage;
