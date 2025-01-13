import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function ProfilePic() {
  // State pro uložení aktuálně přihlášeného uživatele
  const [authUser, setAuthUser] = useState(null);

  // State pro uložení vybraného souboru
  const [selectedFile, setSelectedFile] = useState(null);

  // State pro uložení dat uživatele z databáze
  const [userData, setUserData] = useState(null);

  // State pro URL veřejného obrázku (profilového obrázku)
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  // Načtení aktuálně přihlášeného uživatele
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

  // Načtení dat uživatele z databáze na základě jeho `authid`
  useEffect(() => {
    async function fetchUserData() {
      try {
        if (authUser) {
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

            // Pokud má uživatel uložený obrázek, získáme jeho veřejnou URL
            if (data.img) {
              const { data: publicUrlData, error: urlError } = supabase.storage
                .from("profile-pictures") // Název bucketu
                .getPublicUrl(data.img); // Získání veřejné URL

              if (urlError) {
                console.error("Chyba při získávání veřejné URL:", urlError);
              } else {
                setProfilePictureUrl(publicUrlData.publicUrl); // Nastavení veřejné URL
              }
            }
          }
        }
      } catch (error) {
        console.error("Neočekávaná chyba:", error);
      }
    }
    fetchUserData();
  }, [authUser]);

  // Funkce pro upload profilového obrázku
  async function uploadProfilePicture() {
    if (!selectedFile) {
      console.error("Žádný soubor nebyl vybrán.");
      return;
    }

    if (!authUser) {
      console.error("Uživatel není přihlášen.");
      return;
    }

    // Cesta k souboru: user-{authUser.id}/{název souboru}
    const filePath = `user-${authUser.id}/${selectedFile.name}`;

    // Kontrola, zda soubor už v bucketu existuje
    const { data: existingFiles, error: listError } = await supabase.storage
      .from("profile-pictures")
      .list(`user-${authUser.id}`, {
        search: selectedFile.name, // Hledáme soubor podle názvu
      });

    if (listError) {
      console.error("Chyba při kontrole existence souboru:", listError.message);
      return;
    }

    // Pokud soubor již existuje, přeskočíme upload
    if (
      existingFiles &&
      existingFiles.some((file) => file.name === selectedFile.name)
    ) {
      console.log("Soubor již existuje. Přeskakuji upload...");
    } else {
      // Upload souboru do bucketu
      const { data, error } = await supabase.storage
        .from("profile-pictures")
        .upload(filePath, selectedFile, {
          cacheControl: "3600", // Cache kontrola
          upsert: false, // Zabránění přepsání existujícího souboru
        });

      if (error) {
        console.error("Chyba při uploadu souboru:", error.message);
        return;
      }

      console.log("Soubor úspěšně nahrán:", data.path);
    }

    // Aktualizace odkazu na obrázek v tabulce `user`
    const { error: dbError } = await supabase
      .from("user")
      .update({ img: filePath }) // Uložení cesty k souboru do sloupce `img`
      .eq("authid", authUser.id); // Hledáme záznam podle ID přihlášeného uživatele

    if (dbError) {
      console.error(
        "Chyba při aktualizaci uživatelského profilu:",
        dbError.message
      );
    } else {
      console.log("Uživatelský profil úspěšně aktualizován s URL obrázku.");

      // Nastavení veřejné URL pro nahraný nebo existující obrázek
      const { data: publicUrlData, error: urlError } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(filePath);

      if (urlError) {
        console.error("Chyba při získávání veřejné URL:", urlError);
      } else {
        setProfilePictureUrl(publicUrlData.publicUrl); // Aktualizace URL obrázku
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1>Nahrát profilový obrázek</h1>

      {/* Zobrazení profilového obrázku, pokud existuje */}
      {profilePictureUrl ? (
        <img
          src={profilePictureUrl}
          alt="Profilový obrázek"
          className="rounded-full w-32 h-32 mb-4"
        />
      ) : (
        <p>Žádný profilový obrázek nebyl nahrán</p>
      )}

      {/* Input pro výběr souboru a tlačítko pro upload */}
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={uploadProfilePicture}>Nahrát</button>
    </div>
  );
}

export default ProfilePic;
