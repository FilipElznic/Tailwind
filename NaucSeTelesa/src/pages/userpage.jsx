import Navbar from "../Components/navbar";

function UserPage() {
  return (
    <>
      <Navbar />
      <div className="relative h-screen ">
        {/* Video background */}
        <video
          className="absolute top-0 left-0 w-[80] h-full object-fit justify-center align-items-center"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://cdn.discordapp.com/attachments/793807164291416064/1313042815583911978/aivideotest.mp4?ex=674eb1ea&is=674d606a&hm=8b8e647c8bed3b15883b5e3b1aec52f9e6a3b57db37df1598d89db8c1574ae8e&"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

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
          <div className="bg-red-500 sm:col-start-1 sm:col-end-3 sm:row-start-5 sm:row-end-6">
            Div 1
          </div>
          {/* Div 2 */}
          <div className="bg-green-500 sm:col-start-4 sm:col-end-6 sm:row-start-1 sm:row-end-2">
            Div 2
          </div>
          {/* Div 3 */}
          <div className="bg-blue-500 sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-2">
            Div 3
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;
