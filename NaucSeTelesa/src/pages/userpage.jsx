import "../App.css";
import Footer from "../Components/Footer";
import Features1 from "../Components/Features1";
import Features2 from "../Components/Features2";
import Overused from "../Components/Overused";
import Work from "../Components/Work";
import Robot from "../Components/Robot";

function UserPage() {
  return (
    <>
      <Robot />

      <div className="border-t border-gray-700 min-h-screen bg-gradient-to-br from-black via-zinc-900  to-black text-white ">
        <Overused />

        <div className="lg:flex lg:flex-row lg:w-full lg:justify-evenly min-h-screen lg:items-center">
          <div className="md:full md:flex md:flex-col md:justify-center md:items-center md:mt-20 lg:flex lg:flex-col lg:items-start lg:w-1/4 ">
            {/*div pro nadpis a text*/}
            <h2
              className="text-2xl sm:text-6xl md:text-7xl xl:text-9xl font-bold md:text-start  p-5 md:pb-20
           mt-20"
            >
              FEATURES
            </h2>
            <p className="text-xl xl:2xl  md:text-start p-5 ">
              Pokud by se pro starý účel použil smysluplný text, bylo by těžké
              hodnotit pouze umění, aniž by se posuzoval možná smysl té části
              obsahu.
            </p>
          </div>
          <div className="md:mr-8">
            {/*div pro karticky*/}
            <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-end">
              <Features1 />
              <Features2 />
            </div>
            <div className="flex flex-col items-center gap-5 mt-5 md:flex-row md:justify-end md">
              <Features1 />

              <Features2 />
              <Features1 />
            </div>
          </div>
        </div>

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
