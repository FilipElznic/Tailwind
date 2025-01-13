import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Adjust the import based on your setup
import { useGlobalData } from "../Global"; // Import global context

const ImgProfile = () => {
  const { authUser, userData } = useGlobalData(); // Use context to get authUser and userData
  const [profileImage, setProfileImage] = useState(userData?.img || null);

  // Fetch user data from the database if authUser changes
  useEffect(() => {
    async function fetchData() {
      try {
        if (authUser) {
          const { data, error } = await supabase
            .from("user")
            .select("*")
            .eq("authid", authUser.id);

          if (error) {
            console.error("Error fetching data:", error);
          } else if (data.length > 0) {
            const userData = data[0];
            setProfileImage(userData.img);
            // Set the profile image from the user data
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    }
    fetchData();
  }, [authUser]);

  // Handle profile picture upload
  async function handleProfilePictureUpload(file) {
    const fileName = `${authUser.id}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("profile-pictures")
      .upload(fileName, file);

    if (error) {
      console.error("Error uploading image:", error);
      return;
    }

    const imageURL = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(fileName).publicURL;

    if (imageURL) {
      await updateUserProfileImage(imageURL);
    }
  }

  // Update user profile image URL in the database
  async function updateUserProfileImage(imageURL) {
    const { error } = await supabase
      .from("user")
      .update({ img: imageURL })
      .eq("authid", authUser.id);

    if (error) {
      console.error("Error updating user profile image:", error);
    } else {
      setProfileImage(imageURL); // Update the state with the new profile image URL
    }
  }

  return (
    <div>
      {/* Upload profile picture */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files.length > 0) {
            handleProfilePictureUpload(e.target.files[0]);
          }
        }}
      />
      {profileImage && <img src={profileImage} alt="Profile" />}
    </div>
  );
};

export default ImgProfile;
