import "../App.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Spline from "@splinetool/react-spline";

function UserPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center webbg min-h-screen text-white">
        <h1 className="text-5xl font-bold p-5">
          Nechte se vnést do světa geometrie
        </h1>
        <p className="text-xl p-5">
          Pokud by se pro starý účel použil smysluplný text, bylo by těžké
          hodnotit pouze umění, aniž by se posuzoval možná smysl té části
          obsahu.
        </p>
        <div style={{ width: "100%", height: "600px" }}>
          <Spline scene="https://prod.spline.design/jRwjRE4UBf9SZJJd/scene.splinecode" />
        </div>
        <div className="border-t border-gray-700">
          <h2 className="text-4xl font-bold text-center mt-20">FEATURES</h2>
          <p className="text-xl text-center p-5">
            Pokud by se pro starý účel použil smysluplný text, bylo by těžké
            hodnotit pouze umění, aniž by se posuzoval možná smysl té části
            obsahu.
          </p>
          <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-end ">
            <div className="features1 rounded-3xl h-56 w-56 shadow-lg flex flex-col justify-between p-5">
              <div className="flex justify-center items-center w-10">
                <img src="/cube.png" alt="Cube Icon" />
              </div>
              <div>
                <h3 className="">Cube</h3>
                <p className="">
                  Pokud by se pro starý účel použil smysluplný text, bylo by
                  těžké hodnotit pouze umění
                </p>
              </div>
            </div>
            <div className="features2 rounded-3xl h-56 w-56 shadow-lg flex flex-col justify-between p-5">
              <div className="flex justify-center items-center w-10">
                <img src="/cube.png" alt="Cube Icon" />
              </div>
              <div>
                <h3 className="">Cube</h3>
                <p className="">
                  Pokud by se pro starý účel použil smysluplný text, bylo by
                  těžké hodnotit pouze umění
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-5 mt-5 md:flex-row md:justify-end ">
            <div className="features1 rounded-3xl h-56 w-56 shadow-lg flex flex-col justify-between p-5">
              <div className="flex justify-center items-center w-10">
                <img src="/cube.png" alt="Cube Icon" />
              </div>
              <div>
                <h3 className="">Cube</h3>
                <p className="">
                  Pokud by se pro starý účel použil smysluplný text, bylo by
                  těžké hodnotit pouze umění
                </p>
              </div>
            </div>

            <div className="features2 rounded-3xl h-56 w-56 shadow-lg flex flex-col justify-between p-5">
              <div className="flex justify-center items-center w-10">
                <img src="/cube.png" alt="Cube Icon" />
              </div>
              <div>
                <h3 className="">Cube</h3>
                <p className="">
                  Pokud by se pro starý účel použil smysluplný text, bylo by
                  těžké hodnotit pouze umění
                </p>
              </div>
            </div>
            <div className="features1 rounded-3xl h-56 w-56 shadow-lg flex flex-col justify-between p-5">
              <div className="flex justify-center items-center w-10">
                <img src="/cube.png" alt="Cube Icon" />
              </div>
              <div>
                <h3 className="">Cube</h3>
                <p className="">
                  Pokud by se pro starý účel použil smysluplný text, bylo by
                  těžké hodnotit pouze umění
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center flex-col mt-52 text-center">
          <h1 className="text-4xl font-bold m-5">ABOUT</h1>
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
          <img src="/splineImg.png" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserPage;
