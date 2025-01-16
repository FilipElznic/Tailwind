import ProfilePic from "./ProfilePic";

function Profile() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <h1>Profile</h1>
      <ProfilePic />
    </div>
  );
}

export default Profile;
