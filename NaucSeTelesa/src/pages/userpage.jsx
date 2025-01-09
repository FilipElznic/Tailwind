import "../App.css";
import Footer from "../components/Footer";
import Overused from "../Components/Overused";
import Work from "../Components/Work";
import Robot from "../Components/Robot";

function UserPage() {
  return (
    <>
      <Robot />

      <div className="border-t border-gray-700 min-h-screen bg-gradient-to-br from-black via-zinc-900  to-black text-white ">
        <Overused />

        <div className="w-full flex justify-center items-center flex-col mt-52 text-center md:text-start md:flex md:flex-row md:justify-evenly md:items-center md:mt-20 md:pb-20">
          <img src="/splineImg.png" />
          <div className="w-full md:w-1/3">
            <h1 className="text-2xl sm:text-6xl md:text-7xl xl:text-9xl font-bold m-5 ">
              ABOUT
            </h1>
            <p className="text-xl  text-gray-800 m-2">
              Je-li MUTEX volný proces se stává držitelem MUTEXU
            </p>
            <p className="text-xl text-gray-400 m-5 ">
              Pokud by se pro starý účel použil smysluplný text, bylo by těžké
              hodnotit pouze umění, aniž by se posuzoval možná smysl té části
              obsahu. Pokud by se pro starý účel použil smysluplný text, bylo by
              těžké hodnotit pouze umění, aniž by se posuzoval možná smysl té
              části obsahu.
            </p>
          </div>
        </div>

        <div className="mt-20 pb-20">
          <Work />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserPage;
