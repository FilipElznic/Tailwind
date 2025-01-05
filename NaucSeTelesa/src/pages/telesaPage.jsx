import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import katex from "katex"; // Import KaTeX
import "katex/dist/katex.min.css"; // Import KaTeX CSS
import "../App.css";

function TelesaPage() {
  const [bodies, setBodies] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-800 to-black text-white flex flex-col items-center p-6 ">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500">
        Geometric Bodies
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {bodies.map((body, index) => (
            <li
              key={index}
              className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <h2 className="text-xl font-bold mb-4 text-purple-400">
                {body.geometric_body_name}
              </h2>
              {body.image_url && (
                <img
                  src={body.image_url}
                  alt={body.geometric_body_name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <p className="text-gray-300 mb-4">{body.description}</p>
              <div className="text-sm text-gray-400 space-y-2">
                {body.volume_name && (
                  <>
                    <h3 className="text-lg text-pink-500">
                      {body.volume_name}
                    </h3>
                    <p
                      className="formula text-xl"
                      dangerouslySetInnerHTML={{
                        __html: katex.renderToString(body.volume_formula),
                      }}
                    />
                  </>
                )}
                {body.surface_name && (
                  <>
                    <h3 className="text-lg text-indigo-500">
                      {body.surface_name}
                    </h3>
                    <p
                      className="formula text-xl"
                      dangerouslySetInnerHTML={{
                        __html: katex.renderToString(body.surface_formula),
                      }}
                    />
                  </>
                )}
                {body.area_name && (
                  <>
                    <h3 className="text-lg text-pink-500">{body.area_name}</h3>
                    <p
                      className="formula text-xl"
                      dangerouslySetInnerHTML={{
                        __html: katex.renderToString(body.area_formula),
                      }}
                    />
                  </>
                )}
                {body.perimeter_name && (
                  <>
                    <h3
                      className={`text-lg ${
                        body.perimeter_formula &&
                        body.perimeter_formula.length < 15
                          ? "text-2xl"
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
                        __html: katex.renderToString(body.perimeter_formula),
                      }}
                    />
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TelesaPage;
