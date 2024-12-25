function ImgSlider() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-zinc-900 text-white rounded-lg shadow-lg w-[90vw] h-[80vh] p-6 relative">
        {/* Zavírací ikona */}
        <button className="absolute top-4 right-4 text-white text-xl">
          &times;
        </button>

        {/* Nadpis */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Skvělé, že jste se přihlásili!
        </h2>

        {/* Popis */}
        <p className="text-gray-300 text-sm mb-6">
          Abychom vám mohli nabídnout co nejlepší, potřebujeme od vás ještě pár
          drobných informací.
        </p>

        {/* Formulář */}
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">
                jméno
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Karel"
                className="w-full mt-1 px-3 py-2 bg-gray-800 text-white rounded-lg focus:ring focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">
                příjmení
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Novotný"
                className="w-full mt-1 px-3 py-2 bg-gray-800 text-white rounded-lg focus:ring focus:ring-green-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="nickname" className="block text-sm font-medium">
              přezdívka
            </label>
            <input
              id="nickname"
              type="text"
              placeholder="šťastnýKarlik123"
              className="w-full mt-1 px-3 py-2 bg-gray-800 text-white rounded-lg focus:ring focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg focus:ring focus:ring-green-500"
          >
            dokončit registraci
          </button>
        </form>
      </div>
    </div>
  );
}

export default ImgSlider;
