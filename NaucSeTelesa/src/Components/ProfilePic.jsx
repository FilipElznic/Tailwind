import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useGlobalData } from "../Global";

function ProfilePic() {
  const { authUser, userData, setUserData } = useGlobalData(); // Assuming setUserData is available in context
  const [selectedFile, setSelectedFile] = useState(null); // State for storing the selected file
  const [profilePictureUrl, setProfilePictureUrl] = useState(null); // State for the public URL

  // If the user already has a profile picture, fetch the public URL
  if (userData?.img && !profilePictureUrl) {
    const { data: publicUrlData, error } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(userData.img); // Get the public URL

    if (error) {
      console.error("Error fetching public URL:", error);
    } else {
      setProfilePictureUrl(publicUrlData.publicUrl); // Set the public URL
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

    // Define the path where the file will be stored
    const filePath = `user-${authUser.id}/${selectedFile.name}`;

    // Check if the file already exists in the bucket
    const { data: existingFiles, error: listError } = await supabase.storage
      .from("profile-pictures")
      .list(`user-${authUser.id}`, {
        search: selectedFile.name,
      });

    if (listError) {
      console.error("Error checking file existence:", listError.message);
      return;
    }

    // If the file doesn't exist, upload it
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

    // Update the user's profile with the image path
    const { error: dbError } = await supabase
      .from("user")
      .update({ img: filePath })
      .eq("authid", authUser.id);

    if (dbError) {
      console.error("Error updating user profile:", dbError.message);
    } else {
      console.log("User profile successfully updated with image URL.");

      // Fetch the public URL of the uploaded image
      const { data: publicUrlData, error: urlError } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(filePath);

      if (urlError) {
        console.error("Error fetching public URL:", urlError);
      } else {
        setProfilePictureUrl(publicUrlData.publicUrl); // Set the public URL
        // Update the global context with the new URL
        setUserData((prevData) => ({
          ...prevData,
          img: publicUrlData.publicUrl,
        }));
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1>Upload Profile Picture</h1>

      {/* Display the current profile picture */}
      {profilePictureUrl ? (
        <img
          src={profilePictureUrl}
          alt="Profile Picture"
          className="rounded-full w-32 h-32 mb-4"
        />
      ) : (
        <p>No profile picture uploaded.</p>
      )}

      {/* File input and upload button */}
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={uploadProfilePicture}>Upload</button>
    </div>
  );
}

export default ProfilePic;
