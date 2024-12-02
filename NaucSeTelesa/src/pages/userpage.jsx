import Navbar from "../Components/navbar";
import "../App.css";

function UserPage() {
  return (
    <>
      <Navbar />
      <div className="relative h-screen bg-color">
        {/* Centered Video */}
        <div className="flex justify-center items-center h-full">
          <video className="w-full h-auto" autoPlay loop muted playsInline>
            <source src="/robot.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Grid container */}
        <div
          className="
            grid 
            grid-cols-[repeat(2,0.5fr)_1fr_repeat(2,0.5fr)] 
            grid-rows-[0.8fr_repeat(4,1fr)] 
            gap-0 absolute top-0 left-0 w-full h-full z-10
          "
        >
          {/* Div 1 */}
          <div className="bg-gray-700 sm:col-start-1 sm:col-end-3 sm:row-start-5 sm:row-end-6 rounded-tr-xl">
            Div 1
          </div>
          {/* Div 2 */}
          <div className="bg-gray-700 sm:col-start-4 sm:col-end-6 sm:row-start-1 sm:row-end-2 rounded-bl-xl">
            Div 2
          </div>
          {/* Div 3 */}
          <div className="bg-gray-700 sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-2 rounded-br-xl">
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
