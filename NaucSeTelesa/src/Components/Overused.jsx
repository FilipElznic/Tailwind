function Overused() {
  return (
    <div className="flex  flex-col justify-center min-h-screen text-white">
      <h1 className="text-white text-4xl sm:text-7xl md:text-9xl flex justify-center items-center font-bold p-5">
        OVERUSER
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-center">
          <div className="w-56 h-56 md:w-72 md:h-60 lg:w-96  bg-zinc-900 rounded-3xl"></div>
          <div className="w-56 h-56 md:w-72 md:h-60 lg:w-96 bg-zinc-900 rounded-3xl"></div>
        </div>
        <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-center">
          <div className="w-56 h-56 md:w-72 md:h-60 lg:w-96 bg-zinc-900 rounded-3xl"></div>
          <div className="md:w-72 md:h-60 lg:w-96  flex flex-col justify-evenly">
            <div className="w-56 mx-5 mb-5 md:w-full md:h-full h-24 bg-zinc-900 rounded-3xl"></div>
            <div className="w-56 mx-5 md:w-full md:h-full h-24 bg-zinc-900 rounded-3xl"></div>
          </div>
          <div className="w-56 h-56 md:w-72 md:h-60 lg:w-96 m-5 bg-zinc-900 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
}

export default Overused;
