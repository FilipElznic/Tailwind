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
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        const handleSignIn = async () => {
          try {
            // Check if user already exists in the 'user' table
            const { data: existingUser } = await supabase
              .from("user")
              .select("authid")
              .eq("authid", session.user.id)
              .single();

            if (!existingUser) {
              // User does not exist, insert new user data
              const { error: insertError } = await supabase
                .from("user")
                .insert([
                  {
                    authid: session.user.id, // User ID from session
                  },
                ]);

              if (insertError) {
                console.error(
                  "Error inserting user data:",
                  insertError.message
                );
              } else {
                console.log("User data inserted successfully");
              }
            } else {
              console.log("User already exists, no data inserted");
            }

            // Navigate to the success page after processing
            navigate("/success");
          } catch (err) {
            console.error("Unexpected error:", err);
          }
        };

        handleSignIn();
      } else if (event === "SIGNED_OUT") {
        console.log("User signed out");
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
        providers={["google", "discord"]}
        languages={["cz"]}
      />
    </div>
  );
}

export default LoginPage;
