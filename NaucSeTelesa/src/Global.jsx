import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

// Vytvoření kontextu
const GlobalContext = createContext();

// Poskytovatel kontextu
export function GlobalProvider({ children }) {
  const [authUser, setAuthUser] = useState(null); // Přihlášený uživatel
  const [userData, setUserData] = useState(null); // Data uživatele z databáze
  const [loading, setLoading] = useState(true); // Stav načítání

  // Funkce pro načtení přihlášeného uživatele
  useEffect(() => {
    async function fetchAuthUser() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Chyba při načítání session:", error);
      } else if (session) {
        setAuthUser(session.user); // Uložení přihlášeného uživatele
        console.log("Přihlášený uživatel:", session.user);
      }
    }
    fetchAuthUser();
  }, []);

  // Funkce pro načtení dat uživatele z databáze
  useEffect(() => {
    async function fetchUserData() {
      if (authUser) {
        try {
          const { data, error } = await supabase
            .from("user") // Název tabulky v databázi
            .select("*")
            .eq("authid", authUser.id) // Hledáme záznam s odpovídajícím `authid`
            .single(); // Očekáváme jeden záznam

          if (error) {
            console.error("Chyba při načítání dat uživatele:", error);
          } else {
            setUserData(data); // Uložení dat uživatele
            console.log("Data uživatele:", data);
          }
        } catch (error) {
          console.error("Neočekávaná chyba:", error);
        }
      }
      setLoading(false); // Načítání dokončeno
    }
    fetchUserData();
  }, [authUser]);

  // Poskytované hodnoty kontextu
  const value = { authUser, userData, loading };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

// Vlastní hook pro použití kontextu
export function useGlobalData() {
  return useContext(GlobalContext);
}
