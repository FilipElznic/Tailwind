import ProfilePic from "./ProfilePic";
import { FaRegEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useGlobalData } from "../Global"; // Import global context
import { Link } from "react-router-dom";
function Profile() {
  const { userData, loading } = useGlobalData();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900  to-black text-white px-4">
        <div className="bg-gray-800 text-white p-6 rounded-lg w-full sm:w-3/5 md:w-2/5 lg:w-1/3 ">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Profil</h2>
            <Link to="/">
              <IoMdClose className="cursor-pointer" />
            </Link>
          </div>
          <ProfilePic />
          <div className="w-full flex flex-col justify-center">
            <div className="my-4">
              <label>
                Jméno
                <div className="flex justify-between items-center mt-2">
                  <input
                    type="text"
                    value={userData?.name || ""}
                    className="w-3/5 lg:w-2/3 p-2 rounded-3xl bg-gray-700 border-none text-white mr-2"
                    readOnly
                  />
                  <FaRegEdit className="cursor-pointer" />
                </div>
              </label>
            </div>
            <div className="my-4">
              <label>
                Příjmení
                <div className="flex justify-between items-center mt-2">
                  <input
                    type="text"
                    value={userData?.surname || ""}
                    className="w-3/5 lg:w-2/3 p-2 rounded-3xl bg-gray-700 border-none text-white mr-2"
                    readOnly
                  />
                  <FaRegEdit className="cursor-pointer" />
                </div>
              </label>
            </div>
            <div className="my-4">
              <label>
                Přezdívka
                <div className="flex justify-between items-center mt-2">
                  <input
                    type="text"
                    value={userData?.nickname || ""}
                    className="w-2/3 p-2 rounded-3xl bg-gray-700 border-none text-white mr-2"
                    readOnly
                  />
                  <FaRegEdit className="cursor-pointer" />
                </div>
              </label>
            </div>
            <button className="w-full p-2 rounded-md bg-gray-600 text-white mt-4">
              Uložit změny
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
