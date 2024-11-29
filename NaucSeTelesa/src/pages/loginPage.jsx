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
            const { data: existingUser } = await supabase
              .from("user")
              .select("authid")
              .eq("authid", session.user.id)
              .single();

            if (!existingUser) {
              const { error: insertError } = await supabase
                .from("user")
                .insert([{ authid: session.user.id }]);

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

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-6">Přihlášení</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#3b82f6", // Tailwind's blue-500
                  brandAccent: "#2563eb", // Tailwind's blue-600
                  defaultButtonText: "#fff",
                  defaultButtonBackground: "#2563eb",
                  defaultButtonHoverBackground: "#1e40af", // Tailwind's blue-800
                },
              },
            },
          }}
          providers={["google", "discord"]}
          localization={{ lang: "cz" }}
        />
      </div>
    </div>
  );
}

export default LoginPage;
