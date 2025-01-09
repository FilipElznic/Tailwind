import "../App.css";
import Footer from "../components/Footer";
import Overused from "../Components/Overused";
import Work from "../Components/Work";
import Robot from "../Components/Robot";
import Project from "../Components/Project";

function UserPage() {
  return (
    <>
      <Robot />

      <div className="border-t border-gray-700 min-h-screen bg-gradient-to-br from-black via-zinc-900  to-black text-white ">
        <Overused />
        <Project />

        <div className="mt-20 pb-20">
          <Work />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserPage;
