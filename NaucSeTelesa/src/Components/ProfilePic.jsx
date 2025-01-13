import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useGlobalData } from "../Global";

function ProfilePic() {
  const { authUser, userData } = useGlobalData(); // Přístup k uživatelským datům přes kontext
  const [selectedFile, setSelectedFile] = useState(null); // State pro uložení vybraného souboru
  const [profilePictureUrl, setProfilePictureUrl] = useState(null); // State pro URL veřejného obrázku

  // Pokud má uživatel uložený obrázek, nastavíme jeho URL
  if (userData?.img && !profilePictureUrl) {
    const { data: publicUrlData, error } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(userData.img);

    if (error) {
      console.error("Chyba při získávání veřejné URL:", error);
    } else {
      setProfilePictureUrl(publicUrlData.publicUrl);
    }
  }

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
        search: selectedFile.name,
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
          cacheControl: "3600",
          upsert: false,
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
      .update({ img: filePath })
      .eq("authid", authUser.id);

    if (dbError) {
      console.error(
        "Chyba při aktualizaci uživatelského profilu:",
        dbError.message
      );
    } else {
      console.log("Uživatelský profil úspěšně aktualizován s URL obrázku.");

      const { data: publicUrlData, error: urlError } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(filePath);

      if (urlError) {
        console.error("Chyba při získávání veřejné URL:", urlError);
      } else {
        setProfilePictureUrl(publicUrlData.publicUrl);
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
