import "../App.css";
import Navbar from "../Components/Navbar";

function TailwindTest() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center bg-quick min-h-screen text-white">
        <h1 className="text-5xl font-bold p-5">
          Nechte se vnést do světa geometrie
        </h1>
        <p className="text-xl p-5">
          Pokud by se pro starý účel použil smysluplný text, bylo by těžké
          hodnotit pouze umění, aniž by se posuzoval možná smysl té části
          obsahu.
        </p>
        <div>
          <video autoPlay loop muted playsInline>
            <source src="/robot.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="border-t">
          <h2 className="text-4xl font-bold text-center mt-20">FEATURES</h2>
          <p className="text-xl text-center p-5">
            Pokud by se pro starý účel použil smysluplný text, bylo by těžké
            hodnotit pouze umění, aniž by se posuzoval možná smysl té části
            obsahu.
          </p>
          <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-end ">
            <div className="features1 rounded-3xl h-56 w-56 shadow-lg"></div>
            <div className="features2 rounded-3xl h-56 w-56 shadow-lg"></div>
          </div>

          <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-end ">
            <div className="features1 rounded-3xl h-56 w-56 shadow-lg"></div>
            <div className="features2 rounded-3xl h-56 w-56 shadow-lg"></div>
            <div className="features1 rounded-3xl h-56 w-56 shadow-lg"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TailwindTest;
