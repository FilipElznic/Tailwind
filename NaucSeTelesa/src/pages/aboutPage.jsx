import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Spline from "@splinetool/react-spline";

function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-center animate-pulse">
          About Page soon
        </h1>

        <Spline scene="https://prod.spline.design/8yHWaHayhScHm75a/scene.splinecode" />
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
