import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

// Vytvoření kontextu pro správu autentizace
const AuthContext = createContext();

// Poskytovatel kontextu (AuthProvider), který obklopuje aplikaci a poskytuje autentizační data
export const AuthProvider = ({ children }) => {
  // Stav pro uchování informací o přihlášeném uživateli
  const [user, setUser] = useState(null);

  // Stav pro sledování, zda probíhá načítání uživatelských dat
  const [loading, setLoading] = useState(true);

  // Efekt pro ověření uživatelské relace při načtení aplikace
  useEffect(() => {
    const checkSession = async () => {
      // Získání aktuální relace z klienta Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Nastavení uživatele (nebo null, pokud není přihlášen)
      setUser(session?.user ?? null);

      // Zastavení načítání po ověření relace
      setLoading(false);
    };

    // Zavolání funkce pro ověření relace
    checkSession();

    // Přihlášení posluchače pro změny autentizace
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Aktualizace stavu uživatele při změně autentizace
      setUser(session?.user ?? null);
    });

    // Vyčištění posluchače při odpojení komponenty
    return () => {
      subscription.unsubscribe();
    };
  }, []); // Prázdné pole závislostí zajistí, že efekt se spustí jen jednou

  // Vrácení poskytovatele kontextu s hodnotami (uživatel, stav načítání, klient Supabase)
  return (
    <AuthContext.Provider value={{ user, loading, supabase }}>
      {children} {/* Děti, které mají přístup ke sdíleným datům */}
    </AuthContext.Provider>
  );
};

// Vlastní hook pro snadný přístup k hodnotám z AuthContext
export const useAuth = () => useContext(AuthContext);