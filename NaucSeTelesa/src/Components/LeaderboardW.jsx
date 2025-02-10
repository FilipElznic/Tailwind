import Leaderboard from "./Leaderboard";

function LeaderboardW() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start">
      {/* Left Side - Text */}
      <div className="md:w-1/2 lg:w-1/3 md:flex md:flex-col md:justify-center md:items-start md:mt-20">
        <Leaderboard />
      </div>

      {/* Right Side - Leaderboard */}
      <div className="md:w-1/2 lg:w-2/3 flex justify-center flex-col pl-4">
        <h2 className="text-2xl sm:text-6xl md:text-7xl xl:text-9xl font-bold text-left md:pb-10 userlvl">
          FUNKCE WEBU
        </h2>
        <p className="text-xl xl:text-2xl text-left p-5 text-white">
          Následující funkce vám pomohou lépe pochopit geometrii a zlepšit vaše
          znalosti. Díky těmto funkcím se budete moci učit efektivněji a
          zábavněji.
        </p>
      </div>
    </div>
  );
}

export default LeaderboardW;
