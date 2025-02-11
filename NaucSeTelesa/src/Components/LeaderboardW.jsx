import Leaderboard from "./Leaderboard";

function LeaderboardW() {
  return (
    <>
      <div className="flex flex-col h-full w-full justify-center items-center min-w-screen">
        <div className="w-5/6">
          <div className="flex flex-col lg:flex-row w-full h-full">
            <div className="w-full lg:w-3/5 h-full usergradient m-2 rounded-3xl relative hover:scale-105 transition-transform duration-300 ">
              <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl p-10 userlvl">
                Žebříček uživatelů
              </h1>
              <p className="text-xl md:text-2xl text-white w-full md:w-2/3 my-10 p-5 mb-16">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
                enim cumque fugit repellat commodi, quod, praesentium, veniam
                saepe a ea temporibus ratione?
              </p>
            </div>

            <div className="w-full lg:w-2/5 h-full usergradient m-2 rounded-3xl hover:scale-105 transition-transform duration-300">
              <Leaderboard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeaderboardW;
