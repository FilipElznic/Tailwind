import Navbar from "../Components/navbar";
import "../App.css";

function UserPage() {
  return (
    <>
      <div className="relative h-screen bg-slate-600">
        <Navbar />
      </div>
      <div className="relative h-screen bg-slate-600">
        {/* Centered GIF */}
        <div className="flex justify-center items-center h-full">
          <img
            className="w-full h-auto"
            src="https://cdn.discordapp.com/attachments/793807164291416064/1313218308581101618/robotai-1--unscreen.gif?ex=674f555b&is=674e03db&hm=1c895cb9b396dd7479c8cc777eb2a7b12efbc8bcb6f0aac54bfb7d214ec0bf57&"
            alt="video/mp4"
          />
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
          <div className="bg-gray-700 sm:col-start-1 sm:col-end-3 sm:row-start-5 sm:row-end-6 rounded-tr-xl ">
            Div 1
          </div>

          {/* Div 3 */}
          <div className="bg-gray-700 sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-2 rounded-br-xl rounded-tr-xl">
            Div 3
          </div>
        </div>
      </div>
      <div className="relative h-screen bg-gray-700"></div>
    </>
  );
}

export default UserPage;
