import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Adjust the import based on your setup

const ImgProfile = () => {
  const [authUser, setAuthUser] = useState(null);
  const [data, setData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  // Fetch authenticated user session
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
      }
    }
    fetchAuthUser();
  }, []);

  // Fetch user data from the database
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
            setData(data[0]);
            setProfileImage(data[0].img); // Set the current profile image
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
      {/* Existing code... */}
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
