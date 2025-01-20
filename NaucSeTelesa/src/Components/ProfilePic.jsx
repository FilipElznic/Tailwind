import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useGlobalData } from "../Global";
import { FaFileAlt } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

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

    const filePath = `user-${authUser.id}/${authUser.id}-${uuidv4()}.png`;

    // Step 1: If user already has a profile picture, delete the old one
    console.log("Attempting to delete file:", userData.img);
    console.log("From bucket: profile-pictures");
    const { error: deleteError } = await supabase.storage
      .from("profile-pictures")
      .remove([userData.img]);
    if (deleteError) {
      console.error("Error deleting old file:", deleteError.message);
    } else {
      console.log("Old file deleted successfully.");
    } // Verify deletion by attempting to fetch the file const { data: verifyData, error: verifyError } = await supabase.storage .from("profile-pictures") .list("", { prefix: `user-${authUser.id}/` }); if (verifyError) { console.error("Error verifying file deletion:", verifyError.message); } else { const fileExists = verifyData.some(file => file.name === userData.img); if (fileExists) { console.error("File still exists after supposed deletion."); } else { console.log("File deletion verified, file does not exist."); }

    // Step 2: Upload the new profile picture
    const { data, error: uploadError } = await supabase.storage
      .from("profile-pictures") // Ensure bucket name is correct
      .upload(filePath, selectedFile, {
        cacheControl: "3600",
        upsert: true, // Prevent overwriting existing files with the same name
      });

    if (uploadError) {
      console.error("Error uploading file:", uploadError.message);
      return;
    }

    console.log("New file successfully uploaded:", data.path);

    // Step 3: Update the database with the new image path
    const { error: dbError } = await supabase
      .from("user")
      .update({ img: filePath })
      .eq("authid", authUser.id);

    if (dbError) {
      console.error("Error updating user profile:", dbError.message);
      return;
    }

    console.log("User profile successfully updated with image URL.");

    // Fetch the new image public URL
    const { data: publicUrlData, error: urlError } = supabase.storage
      .from("profile-pictures") // Ensure bucket name is correct
      .getPublicUrl(filePath);

    if (urlError) {
      console.error("Error fetching public URL:", urlError);
    } else {
      setProfilePictureUrl(publicUrlData.publicUrl);
      setIsFileSelected(false); // Reset the state after upload
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {!isFileSelected && profilePictureUrl ? (
        <img
          src={profilePictureUrl || defaultImage} // Use default image if no profile picture
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
            accept="image/jpeg, image/png" // Restrict the file types to JPG, JPEG, PNG
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
