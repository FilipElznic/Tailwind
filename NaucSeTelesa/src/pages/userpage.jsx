import Navbar from "../Components/navbar";
import "../App.css";

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
            <div className="flex flex-col justify-center h-1/2">
              <h1 className="text-white">Nechte se vnést do světa geometrie</h1>
              <p className="text-white">
                Pokud by se pro stejný účel použil smysluplný text, bylo by
                těžké hodnotit pouze vzhled, aniž by se pozorovatel nechal svést
                ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale
                pravidelný text
              </p>
            </div>
          </div>
          <div className="col-start-1 col-end-6 row-start-1 row-end-2 bg-black">
            Div 3
          </div>
        </div>
      </div>
      <div className="relative h-screen bg-gray-700">
        <video className="w-full h-auto" autoPlay loop muted playsInline>
          <source src="/robot.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}

export default UserPage;
