import "../App.css";

function TailwindTest() {
  return (
    <div className="h-screen bg-black flex items-center justify-center relative">
      {/* Bottom-left */}

      <video
        className="w-[90%] md:w-[80%] lg:w-[80%] rounded-lg"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://cdn.discordapp.com/attachments/793807164291416064/1313042815583911978/aivideotest.mp4?ex=674eb1ea&is=674d606a&hm=8b8e647c8bed3b15883b5e3b1aec52f9e6a3b57db37df1598d89db8c1574ae8e&"
          type="video/mp4"
        />
      </video>

      {/* Optional Content Overlay */}
      <div className="absolute text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold">Welcome</h1>
        <p className="text-lg md:text-2xl mt-4">
          This is your video background
        </p>
      </div>
    </div>
  );
}

export default TailwindTest;
