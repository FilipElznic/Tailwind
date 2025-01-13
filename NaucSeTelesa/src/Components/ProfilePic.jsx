import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function ProfilePic() {
  const [authUser, setAuthUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    async function fetchAuthUser() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
      } else if (session) {
        setAuthUser(session.user);
        console.log("Authenticated user:", session.user);
      }
    }
    fetchAuthUser();
  }, []);

  async function uploadProfilePicture() {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    if (!authUser) {
      console.error("No authenticated user");
      return;
    }

    // Construct file path: user-{auth.uid()}/{file_name}
    const filePath = `user-1${selectedFile.name}`;

    // Upload the file to the bucket
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

    console.log("File uploaded successfully:", data.path);

    // Save the file path to the user's profile in the database
    const { error: dbError } = await supabase
      .from("user")
      .update({ img: filePath }) // Save the file path in the "img" column
      .eq("authid", authUser.id); // Match the current user ID

    if (dbError) {
      console.error("Error updating user profile:", dbError.message);
    } else {
      console.log("User profile updated with image URL");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1>Upload Profile Picture</h1>
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={uploadProfilePicture}>Upload</button>
    </div>
  );
}

export default ProfilePic;
