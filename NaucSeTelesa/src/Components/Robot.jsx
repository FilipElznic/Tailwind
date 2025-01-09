import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Spline from "@splinetool/react-spline";

function Robot() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isDesktop ? (
        <div className="hidden lg:block">
          <Navbar />
          <div className="flex flex-col justify-center items-center bg-black min-h-screen text-white">
            <div className="relative md:flex md:flex-row md:justify-between md:items-start md:mt-14 w-full">
              <div className="absolute inset-0 z-0">
                <Spline scene="https://prod.spline.design/jRwjRE4UBf9SZJJd/scene.splinecode" />
              </div>
              <div className="relative sm:flex sm:flex-col sm:justify-center sm:h-[90vh]  w-1/4 ">
                <h1 className="text-4xl md:text-2xl lg:text-5xl font-bold p-5 sm:pr-20 userlvl">
                  Nechte se vnést do světa geometrie
                </h1>
                <p className="text-xl lg:text-2xl p-5">
                  Poznejte tvary geometrie z nové perspektivy a ovládněte jejich
                  tajemství.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:hidden">
          <Navbar />
          <div className="flex flex-col justify-center items-center bg-black min-h-screen text-white">
            <div className="sm:flex sm:flex-col sm:justify-center sm:items-center sm:h-[90vh] text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold  sm:pr-20">
                Nechte se vnést <br />
                do světa geometrie
              </h1>
              <p className="text-xl lg:text-3xl ">
                Pokud by se pro starý účel použil smysluplný text, bylo by těžké
                hodnotit pouze umění.
              </p>
            </div>
            <div className="w-full h-[90v]">
              <Spline scene="https://prod.spline.design/jRwjRE4UBf9SZJJd/scene.splinecode" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Robot;
