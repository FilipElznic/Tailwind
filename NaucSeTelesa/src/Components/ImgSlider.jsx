import { useState } from "react";
import "../App.css";

function ImgSlider() {
  const [formData, setFormData] = useState({
    jmeno: "",
    prijmeni: "",
    prezdivka: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="w-[80vw] flex flex-col md:flex-row gap-6 test bg-zinc-900">
        <div className="w-full md:w-1/2 md:h-[80vh] bg-zinc-900 test flex justify-center items-center md:items-start md:pl-20 flex-col text-white">
          <div className="w-3/4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-6xl font-bold pb-6 pt-5 md:pb-12">
              Skvělé, že jste se zaregistrovali!
            </h1>
            <p className="text-2xl mt-5 text-gray-300">
              Abychom vám mohli nabídnout co nejlepší, potřebujeme od vás ještě
              pár drobných informací.
            </p>
          </div>
        </div>
        <div className="relative w-full md:w-1/2 md:h-[80vh] bg-zinc-900 flex test justify-center items-start flex-col p-6 lg:pr-16 xl:pr-32">
          <div className="absolute top-5 right-5 m-4 w-8 h-8 bg-black rounded-full flex justify-center items-center cursor-pointer">
            &times;
          </div>

          <div className="flex w-full flex-col sm:flex-row gap-5 ">
            <div className="flex flex-col w-full items-center">
              <h3>Jméno</h3>
              <input
                className="w-full h-16 bg-zinc-800 rounded-2xl p-2"
                type="text"
                name="input1"
                value={formData.jmeno}
                onChange={handleChange}
                placeholder="Karel"
                required
              />
            </div>
            <div className="flex flex-col w-full items-center ">
              <h3>Přijmení</h3>
              <input
                className="w-full  h-16 bg-zinc-800 rounded-2xl p-2"
                type="text"
                name="input1"
                value={formData.prijmeni}
                onChange={handleChange}
                placeholder="Novák"
                required
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="flex flex-col w-full items-center mt-5 ">
              <h3>Přezdívka</h3>
              <input
                className="w-full  h-16 bg-zinc-800 rounded-2xl p-2"
                type="text"
                name="input1"
                value={formData.prezdivka}
                onChange={handleChange}
                placeholder="KarelNovak123"
                required
              />
            </div>
          </div>

          <div className="w-full flex justify-center items-center mt-5">
            <button
              className="w-1/2 h-14 bg-green-950 rounded-2xl"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImgSlider;
