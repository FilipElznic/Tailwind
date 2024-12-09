import "../App.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/navbar";
import Spline from "@splinetool/react-spline";

function UserPage() {
  return (
    <>
      <div className="relative bg-color">
        {/* Centered Video */}

        {/* Grid container */}
        <div className="grid grid-cols-5 grid-rows-5 gap-0">
          <div className="col-start-2 col-end-6 row-start-2 row-end-6 bg-black">
            <div className="flex justify-center items-center h-full">
              <video className="w-full h-auto" autoPlay loop muted playsInline>
                <source src="/robot.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="col-start-1 col-end-2 row-start-2 row-end-6 bg-quick">
            <div className="absolute flex flex-col justify-center h-1/2 gap-11 ml-20">
              <h1 className="text-white text-6xl font-bold">
                Nechte se vnést<br></br> do světa geometrie
              </h1>
              <p className="text-white w-1/3 text-2xl">
                Pokud by se pro stejný účel použil smysluplný text, bylo by
                těžké hodnotit pouze vzhled, aniž by se pozorovatel nechal svést
                ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale
                pravidelný text
              </p>
            </div>
          </div>
          <div className="col-start-1 col-end-6 row-start-1 row-end-2 bg-quick">
            <Navbar />
          </div>
        </div>
      </div>
      <div className="bg-quick border-top">
        <div className="w-full gap-0 text-white">
          <div className="grid grid-cols-[repeat(2,_1fr)_0.5fr_repeat(2,_1fr)] grid-rows-4 gap-0 h-screen">
            <div className="col-start-3 col-end-6 row-start-1 row-end-3 w-full flex items-end">
              <div className="flex flex-row justify-end w-full p-2  gap-5 pr-[10vw]">
                <div className="features1 rounded-3xl h-56 w-56 shadow-lg"></div>
                <div className="features2 rounded-3xl h-56 w-56 shadow-lg"></div>
              </div>
            </div>
            <div className="col-start-3 col-end-6 row-start-3 row-end-5 flex items-start">
              <div className="flex flex-row w-full justify-end p-2 gap-5 pr-[10vw]">
                <div className="features1 rounded-3xl h-56 w-56 shadow-lg"></div>
                <div className="features2 rounded-3xl h-56 w-56 shadow-lg"></div>
                <div className="features1 rounded-3xl h-56 w-56 shadow-lg"></div>
              </div>
            </div>
            <div className="col-start-1 col-end-3 row-start-1 row-end-5  flex justify-center items-start pt-[20vh] pl-[8vw]">
              <div>
                <h1 className="text-8xl m-24 font-bold">FEATURES</h1>
                <p className="text-2xl m-24">
                  Pokud by se pro starý účel použil smysluplný text, bylo by
                  těžké hodnotit pouze umění, aniž by se posuzoval možná smysl
                  té části obsahu.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full flex flex-col sm:flex-row">
          <div className="flex-1 ">
            <div className="w-full pl-[8vw]">
              <Spline scene="https://prod.spline.design/6IbPWJKA5ZBXbkKa/scene.splinecode" />
            </div>
          </div>

          <div className="flex-1 text-gray-100 justify-start w-full mr-[10vh]">
            <div>
              <h1 className="text-8xl font-bold mt-[8vw]">ABOUT</h1>
              <p className="text-xl text-gray-800 mt-[3vw]">
                Je-li MUTEX volný proces se stává držitelem MUTEXU
              </p>
              <p className="text-2xl text-gray-400">
                Pokud by se pro starý účel použil smysluplný text, bylo by těžké
                hodnotit pouze umění, aniž by se posuzoval možná smysl té části
                obsahu. Pokud by se pro starý účel použil smysluplný text, bylo
                by těžké hodnotit pouze umění, aniž by se posuzoval možná smysl
                té části obsahu.
              </p>
            </div>
          </div>
        </div>
        <div className="h-screen w-full">
          <img src="/galaxy.png"></img>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserPage;
