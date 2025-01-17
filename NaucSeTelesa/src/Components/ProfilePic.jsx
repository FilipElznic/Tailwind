import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useGlobalData } from "../Global";
import { FaFileAlt } from "react-icons/fa";

function ProfilePic() {
  const { authUser, userData } = useGlobalData();
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false); // Track if a file is selected

  // If the user already has a profile picture, fetch the public URL
  if (userData?.img && !profilePictureUrl) {
    const { data: publicUrlData, error } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(userData.img);

    if (error) {
      console.error("Error fetching public URL:", error);
    } else {
      setProfilePictureUrl(publicUrlData.publicUrl);
    }
  }

  // Upload the profile picture
  async function uploadProfilePicture() {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    if (!authUser) {
      console.error("User is not authenticated.");
      return;
    }

    const filePath = `user-${authUser.id}/${selectedFile.name}`;

    const { data: existingFiles, error: listError } = await supabase.storage
      .from("profile-pictures")
      .list(`user-${authUser.id}`, {
        search: selectedFile.name,
      });

    if (listError) {
      console.error("Error checking file existence:", listError.message);
      return;
    }

    if (
      existingFiles &&
      existingFiles.some((file) => file.name === selectedFile.name)
    ) {
      console.log("File already exists. Skipping upload...");
    } else {
      const { data, error } = await supabase.storage
        .from("profile-pictures")
        .upload(filePath, selectedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Error uploading file:", error.message);
        return;
      }

      console.log("File successfully uploaded:", data.path);
    }

    const { error: dbError } = await supabase
      .from("user")
      .update({ img: filePath })
      .eq("authid", authUser.id);

    if (dbError) {
      console.error("Error updating user profile:", dbError.message);
    } else {
      console.log("User profile successfully updated with image URL.");

      const { data: publicUrlData, error: urlError } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(filePath);

      if (urlError) {
        console.error("Error fetching public URL:", urlError);
      } else {
        setProfilePictureUrl(publicUrlData.publicUrl);
        setIsFileSelected(false); // Reset the state after upload
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {!isFileSelected && profilePictureUrl ? (
        <img
          src={profilePictureUrl}
          alt="Profile Picture"
          className="rounded-full w-32 h-32 mb-6 shadow-lg border-4 border-blue-500 hover:border-purple-600 transition-all"
        />
      ) : isFileSelected && selectedFile ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 w-64">
          <FaFileAlt className="text-gray-500 text-3xl mb-4" />
          <span className="text-gray-700 text-sm">{selectedFile.name}</span>
        </div>
      ) : (
        <p className="mb-6 text-gray-400 italic">
          Přidejte si prosím profilový obrázek.
        </p>
      )}

      <div className="w-full flex flex-row justify-center">
        <label className="mt-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-6 rounded-lg relative m-2">
          Vybrat obrázek
          <input
            type="file"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              setIsFileSelected(true); // Show file details when a file is selected
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>

        {isFileSelected && (
          <button
            onClick={uploadProfilePicture}
            className="mt-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-6 rounded-lg m-2"
          >
            Uložit
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePic;
