import ProfilePic from "./ProfilePic";
import { FaRegEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function Profile() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
        <h1>Profile</h1>

        <div className="bg-gray-800 text-white p-6 rounded-lg w-full  md:w2/3 lg:w-1/3 ">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Profil</h2>
            <IoMdClose className="cursor-pointer" />
          </div>
          <ProfilePic />
          <div className="my-4">
            <label>
              jméno
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  className="flex-1 p-2 rounded-md bg-gray-700 border-none text-white mr-2"
                />
                <FaRegEdit className="cursor-pointer" />
              </div>
            </label>
          </div>
          <div className="my-4">
            <label>
              příjmení
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  className="flex-1 p-2 rounded-md bg-gray-700 border-none text-white mr-2"
                />
                <FaRegEdit className="cursor-pointer" />
              </div>
            </label>
          </div>
          <div className="my-4">
            <label>
              přezdívka
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  className="flex-1 p-2 rounded-md bg-gray-700 border-none text-white mr-2"
                />
                <FaRegEdit className="cursor-pointer" />
              </div>
            </label>
          </div>
          <button className="w-full p-2 rounded-md bg-gray-600 text-white mt-4">
            uložit změny
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
