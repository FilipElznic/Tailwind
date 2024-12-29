import "../App.css";

function TailwindTest() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center mb-20">
        <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-7xl font-bold md:mb-7 text-white p-11">
          Pojďme společně objevovat
        </h1>
        <div className="w-[90vw]">
          {/* Larger div */}
          <div className="w-full h-[80vh] bg-zinc-900 rounded-2xl mb-6"></div>
        </div>
        {/* Smaller divs */}
        <div className="w-[90vw] flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 h-[60vh] bg-zinc-900 rounded-2xl"></div>
          <div className="w-full md:w-1/2 h-[60vh] bg-zinc-900 rounded-2xl"></div>
        </div>
      </div>
    </>
  );
}

export default TailwindTest;
