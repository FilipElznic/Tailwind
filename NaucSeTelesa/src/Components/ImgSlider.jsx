function ImgSlider() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-row h-[80vh] w-full bg-zinc-900 m-48 rounded-3xl">
        <div className="text-white p-16 h-full flex justify-evenly flex-col">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl xl:text-6xl font-bold">
              Skvělé, že jste
              <br /> se přihlásili!
            </h1>
            <p className="text-xl mt-5 text-start">
              Abychom vám mohli nabídnout co nejlepší,
              <br /> potřebujeme od vás ještě pár drobných informací.
            </p>
          </div>
        </div>
        <div>
          <form className="flex flex-col justify-center items-center h-full w-full">
            <input></input>
            <input></input>
            <input></input>
            <submit></submit>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ImgSlider;
