function ImgSlider() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[80vw] flex flex-col md:flex-row gap-6 rounded-3xl bg-zinc-900">
        <div className="w-full md:w-1/2 h-[60vh] bg-zinc-900 rounded-2xl flex justify-center pl-20 flex-col text-white">
          <h1 className="text-2xl sm:text-3xl md:text-5xl xl:text-6xl font-bold">
            Skvělé, že jste
            <br /> se přihlásili!
          </h1>
          <p className="text-2xl mt-5">
            Abychom vám mohli nabídnout co nejlepší,
            <br /> potřebujeme od vás ještě pár drobných informací.
          </p>
        </div>
        <div className="w-full md:w-1/2 h-[60vh] bg-zinc-900 rounded-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <div className="w-1/2  bg-zinc-100 rounded-2xl">.</div>
            <div className="w-1/2  bg-zinc-100 rounded-2xl">.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImgSlider;
