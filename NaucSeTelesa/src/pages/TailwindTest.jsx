import "../App.css";
import Robot from "/robot.png";

function TailwindTest() {
  return (
    <>
      <div className=" text-white imgbg flex flex-col items-center justify-center">
        <div className="w-full p-5 bg-opacity-90 bg-form flex flex-col items-center justify-center rounded-3xl sm:h-[80vh]">
          <h2 className="text-xl mb-6 text-gray-600">
            Registrace proběhla úspěšně, ale ...
          </h2>
          <h1 className="text-xl font-bold mb-6">
            Ještě něco o tobě potřebujeme vědět
          </h1>
          <div className="">
            <div className=" flex justify-center items-center">
              <img src={Robot} />
            </div>
            <div className="flex-1 flex justify-center items-center">
              <f className="space-y-4 p-6 w-3/4 rounded-xl shadow-lg flex justify-center items-center flex-col">
                <div>
                  <label
                    htmlFor="jmeno"
                    className="block text-sm text-white mb-1"
                  >
                    jméno
                  </label>
                  <input
                    required={true}
                    type="text"
                    id="jmeno"
                    className="w-80 px-4 py-2 rounded-full formcolor text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="prijmeni"
                    className="block text-sm text-white mb-1"
                  >
                    příjmení
                  </label>
                  <input
                    type="text"
                    required={true}
                    id="prijmeni"
                    className="w-80 px-4 py-2 rounded-full formcolor text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="prezdivka"
                    className="block text-sm text-white mb-1"
                  >
                    přezdívka
                  </label>
                  <input
                    required={true}
                    type="text"
                    id="prezdivka"
                    className="w-80 px-4 py-2 rounded-full formcolor text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-60 py-2 rounded-full bg-purple-700 text-white font-semibold hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Prokračovat
                </button>
              </f>
            </div>
          </div>
          <button className="px-6 py-3 bg-opacity-40 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 hover:scale-105 transform transition-all duration-200 ease-in-out focus:ring-4 focus:ring-blue-300">
            Odhlásit se
          </button>
        </div>
      </div>
    </>
  );
}

export default TailwindTest;
