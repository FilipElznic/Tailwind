import ProfilePic from "./ProfilePic";
import { FaRegEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Profile() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900  to-black text-white px-4">
        <div className="bg-gray-800 text-white p-6 rounded-lg w-full sm:w-3/5 md:w-2/5 lg:w-1/3 ">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Profil</h2>
            <IoMdClose className="cursor-pointer" />
          </div>
          <ProfilePic />
          <div className="w-full flex flex-col justify-center">
            <div className="my-4">
              <label>
                jméno
                <div className="flex justify-between items-center mt-2">
                  <input
                    type="text"
                    className="w-3/5 lg:w-2/3 p-2 rounded-3xl bg-gray-700 border-none text-white mr-2"
                  />
                  <FaRegEdit className="cursor-pointer" />
                </div>
              </label>
            </div>
            <div className="my-4">
              <label>
                příjmení
                <div className="flex justify-between items-center mt-2">
                  <input
                    type="text"
                    className="w-3/5 lg:w-2/3 p-2 rounded-3xl bg-gray-700 border-none text-white mr-2"
                  />
                  <FaRegEdit className="cursor-pointer" />
                </div>
              </label>
            </div>
            <div className="my-4">
              <label>
                přezdívka
                <div className="flex justify-between items-center mt-2">
                  <input
                    type="text"
                    className="w-2/3 p-2 rounded-3xl bg-gray-700 border-none text-white mr-2"
                  />
                  <FaRegEdit className="cursor-pointer" />
                </div>
              </label>
            </div>
            <button className="w-full p-2 rounded-md bg-gray-600 text-white mt-4">
              uložit změny
            </button>{" "}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
