import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-center animate-pulse">
          About Page soon
        </h1>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
