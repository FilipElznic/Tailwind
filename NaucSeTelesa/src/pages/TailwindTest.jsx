import "../App.css";

function TailwindTest() {
  return (
    <div className="h-screen w-screen">
      <video className="h-full w-full" autoPlay loop muted>
        <source
          src="https://cdn.discordapp.com/attachments/793807164291416064/1313042815583911978/aivideotest.mp4?ex=674eb1ea&is=674d606a&hm=8b8e647c8bed3b15883b5e3b1aec52f9e6a3b57db37df1598d89db8c1574ae8e&"
          type="video/mp4"
        />
      </video>
    </div>
  );
}

export default TailwindTest;
