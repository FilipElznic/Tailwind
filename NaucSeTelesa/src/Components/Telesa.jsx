import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import katex from "katex";
import "katex/dist/katex.min.css";
import Spline from "@splinetool/react-spline";
import "../App.css";

function Telesa() {
  const [bodies, setBodies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBody, setSelectedBody] = useState(null);

  useEffect(() => {
    const fetchBodies = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc("fetch_geometric_bodies2");

      if (error) {
        console.error("Error fetching geometric bodies:", error);
      } else {
        setBodies(data);
        console.log("Geometric bodies fetched:", data);
      }
      setLoading(false);
    };

    fetchBodies();
  }, []);

  const handleBodyClick = (body) => {
    setSelectedBody(body);
  };

  const closeModal = () => {
    setSelectedBody(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-9xl font-bold my-28 text-transparent bg-clip-text userlvl ">
        Geometrická tělesa
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-col gap-6 w-full max-w-6xl">
          {bodies.map((body, index) => (
            <li
              key={index}
              className="usergradient rounded-lg p-8 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => handleBodyClick(body)}
            >
              <div className="flex flex-col md:flex-row w-full justify-between items-center h-full">
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-6 text-purple-400">
                    {body.geometric_body_name}
                  </h2>
                  <p className="text-gray-300 mb-6 text-lg md:w-2/3">
                    {body.description}
                  </p>
                  <div className="text-sm text-gray-400 space-y-4">
                    <div className="flex flex-col md:flex-row md:justify-evenly w-full">
                      {body.volume_name && (
                        <div className="flex flex-col">
                          <h3 className="text-xl text-pink-500">
                            {body.volume_name}
                          </h3>
                          <p
                            className="formula text-2xl"
                            dangerouslySetInnerHTML={{
                              __html: katex.renderToString(body.volume_formula),
                            }}
                          />
                        </div>
                      )}
                      {body.surface_name && (
                        <div className="flex flex-col">
                          <h3 className="text-xl text-indigo-500">
                            {body.surface_name}
                          </h3>
                          <p
                            className="formula text-2xl"
                            dangerouslySetInnerHTML={{
                              __html: katex.renderToString(
                                body.surface_formula
                              ),
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-evenly w-full">
                      {body.area_name && (
                        <div className="flex flex-col">
                          <h3 className="text-xl text-pink-500">
                            {body.area_name}
                          </h3>
                          <p
                            className="formula text-2xl"
                            dangerouslySetInnerHTML={{
                              __html: katex.renderToString(body.area_formula),
                            }}
                          />
                        </div>
                      )}
                      {body.perimeter_name && (
                        <div className="flex flex-col">
                          <h3
                            className={`text-xl ${
                              body.perimeter_formula &&
                              body.perimeter_formula.length < 15
                                ? "text-3xl"
                                : ""
                            }`}
                          >
                            {body.perimeter_name}
                          </h3>
                          <p
                            className={`formula ${
                              body.perimeter_formula &&
                              body.perimeter_formula.length < 15
                                ? "text-2xl"
                                : ""
                            }`}
                            dangerouslySetInnerHTML={{
                              __html: katex.renderToString(
                                body.perimeter_formula
                              ),
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3">
                  {body.image_url && (
                    <img
                      src={body.image_url}
                      alt={body.geometric_body_name}
                      className="w-full h-56 object-cover rounded-md mb-4"
                    />
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedBody && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-purple-400">
              {selectedBody.geometric_body_name}
            </h2>
            {selectedBody.spline_url ? (
              <Spline
                scene={selectedBody.spline_url}
                className="w-full h-96 rounded-md mb-4"
              />
            ) : (
              <img
                src={selectedBody.image_url}
                alt={selectedBody.geometric_body_name}
                className="w-full h-96 object-cover rounded-md mb-4"
              />
            )}
            <p className="text-gray-300 mb-4">{selectedBody.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Telesa;
