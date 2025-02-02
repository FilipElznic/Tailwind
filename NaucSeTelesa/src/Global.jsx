import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch authenticated user
  useEffect(() => {
    const fetchAuthUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session error:", error);
      } else if (session) {
        setAuthUser(session.user);
      }
    };

    fetchAuthUser();
  }, []);

  // Handle auth state changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthUser(session?.user || null);
      }
    );

    return () => authListener?.subscription.unsubscribe();
  }, []);

  // Fetch user data from 'user' table
  useEffect(() => {
    const fetchUserData = async () => {
      if (!authUser) {
        setLoading(false);
        return;
      }

      try {
        // Use double quotes for table name to avoid SQL keyword conflict
        const { data, error } = await supabase
          .from("user") // Important: use double quotes
          .select("*")
          .eq("authid", authUser.id)
          .single();

        if (error && error.code !== "PGRST116") throw error;

        // Create new user if doesn't exist
        if (!data) {
          const { data: newUser } = await supabase
            .from('"user"')
            .insert([
              {
                authid: authUser.id,
                email: authUser.email,
                xp: 0,
                created_at: new Date().toISOString(),
              },
            ])
            .select()
            .single();

          setUserData(newUser);
        } else {
          setUserData(data);
        }
      } catch (error) {
        console.error("User data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authUser]);

  // Function to refresh user data
  const refreshUserData = async () => {
    if (!authUser) return;

    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("authid", authUser.id)
      .single();

    if (error) console.error("Refresh error:", error);
    else setUserData(data);
  };

  const value = {
    authUser,
    userData,
    loading,
    refreshUserData,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export function useGlobalData() {
  return useContext(GlobalContext);
}
