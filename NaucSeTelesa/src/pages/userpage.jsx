import "../App.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/navbar";

function UserPage() {
  return (
    <>
      <div className="relative h-screen bg-color">
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
          <div className="col-start-1 col-end-2 row-start-2 row-end-6 bg-black">
            <div className="absolute flex flex-col justify-center h-1/2 gap-11 ml-20">
              <h1 className="text-white text-6xl">
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
          <div className="col-start-1 col-end-6 row-start-1 row-end-2 bg-black">
            <Navbar />
          </div>
        </div>
      </div>
      <div className="relative  webbg justify-center align-items-center">
        <div className="bg-white h-[1px] w-full"></div>
        <div className="h-screen w-full">1</div>
        <div className="h-screen w-full">2</div>
        <div className="h-screen w-full">3</div>
        <div className="h-screen w-full"></div>
      </div>
      <Footer />
    </>
  );
}

export default UserPage;
