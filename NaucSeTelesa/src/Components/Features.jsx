import Features1 from "./Features1";
import Features2 from "./Features2";

function Features() {
  return (
    <div className="lg:flex lg:flex-row lg:w-full lg:justify-evenly min-h-screen lg:items-center text-white">
      <div className="md:full md:flex md:flex-col md:justify-center md:items-center md:mt-20 lg:flex lg:flex-col lg:items-start lg:w-1/4 ">
        <h2
          className="text-2xl sm:text-6xl md:text-7xl xl:text-9xl font-bold md:text-start  p-5 md:pb-20
           "
        >
          FEATURES
        </h2>
        <p className="text-xl xl:2xl  md:text-start p-5 ">
          Pokud by se pro starý účel použil smysluplný text, bylo by těžké
          hodnotit pouze umění, aniž by se posuzoval možná smysl té části
          obsahu.
        </p>
      </div>
      <div className="md:mr-8">
        {/*div pro karticky*/}
        <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-end">
          <Features1 />
          <Features2 />
        </div>
        <div className="flex flex-col items-center gap-5 mt-5 md:flex-row md:justify-end md">
          <Features1 />

          <Features2 />
          <Features1 />
        </div>
      </div>
    </div>
  );
}

export default Features;
