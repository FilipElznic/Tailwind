import { Navbar } from "react-bootstrap";
import "../App.css";
import Spline from "@splinetool/react-spline";
import Footer from "../Components/Footer";

function TailwindTest() {
  return (
    <>
      <div className="flex flex-col justify-center items-center webbg min-h-screen text-white">
        <Navbar className="z-30" />
        <div className="relative md:flex md:flex-row md:justify-between md:items-start md:mt-14 w-full">
          <div className="absolute inset-0 z-0 spline-background">
            <Spline scene="https://prod.spline.design/jRwjRE4UBf9SZJJd/scene.splinecode" />
          </div>

          <div className="relative sm:flex sm:flex-col sm:justify-center sm:h-[90vh] z-10 w-1/4 mr-5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold p-5 sm:pr-20">
              Nechte se vnést <br />
              do světa geometrie
            </h1>
            <p className="text-xl lg:text-3xl p-5">
              Pokud by se pro starý účel použil smysluplný text, bylo by těžké
              hodnotit pouze umění, aniž by se posuzoval možná smysl té části
              obsahu.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default TailwindTest;
