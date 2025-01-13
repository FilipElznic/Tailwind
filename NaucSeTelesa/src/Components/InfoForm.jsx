import "../App.css";
import { useEffect, useState } from "react";
import { useGlobalData } from "../Global.jsx"; // Import the global context hook
import { supabase } from "../supabaseClient";

function InfoForm() {
  const { authUser, userData, loading } = useGlobalData(); // Access data from context
  const [jmeno, setJmeno] = useState("");
  const [prijmeni, setPrijmeni] = useState("");
  const [prezdivka, setPrezdivka] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  // Check if user is available and pre-fill name and surname from userData
  useEffect(() => {
    if (authUser && userData) {
      // Pre-fill name and surname if the provider is Google
      if (authUser.app_metadata.provider === "google") {
        const fullName = userData.name || "";
        const nameParts = fullName.split(" ");
        setJmeno(nameParts[0] || ""); // First name
        setPrijmeni(nameParts.slice(1).join(" ") || ""); // Last name
      }
    }
  }, [authUser, userData]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (authUser) {
          const { data, error } = await supabase
            .from("user")
            .select("nameSet")
            .eq("authid", authUser.id)
            .single(); // Fetch a single row

          if (error) {
            console.error("Error fetching data:", error);
          } else if (data) {
            setIsVisible(!data.nameSet); // Show popup if nameSet is false
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    }
    fetchData();
  }, [authUser]);

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!authUser) {
      console.error("No authenticated user found.");
      return;
    }

    if (authUser.app_metadata.provider !== "google") {
      console.error("User provider is not Google.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user")
        .update({
          name: jmeno,
          surname: prijmeni,
          nickname: prezdivka,
        })
        .eq("authid", authUser.id);

      if (error) {
        console.error("Error updating data:", error);
      } else {
        console.log("Data updated successfully:", data);
      }
    } catch (error) {
      console.error("Unexpected error during form submission:", error);
    }
    Zavri();
  }

  const Zavri = async () => {
    try {
      // Perform the update query
      const { data, error } = await supabase
        .from("user")
        .update({ nameSet: true })
        .eq("authid", authUser.id);

      if (error) {
        console.error("Error updating user:", error.message);
        return;
      }

      console.log("Update successful:", data);
      setIsVisible(false); // Hide popup after updating
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handleHide = () => {
    Zavri(); // Call Zavri to update the database and hide the popup
  };

  if (loading) {
    return <p>Loading...</p>; // You can display a loading state while data is fetching
  }

  return (
    <>
      {isVisible && (
        <div className="min-h-screen flex items-center justify-center text-white">
          <div className="w-[80vw] flex flex-col md:flex-row gap-6 border-form rounded-3xl bg-zinc-900 relative">
            <div className="w-full md:w-1/2 md:h-[80vh] bg-zinc-900 border-form rounded-3xl flex justify-center items-center md:items-start md:pl-20 flex-col text-white">
              <div className="w-3/4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-6xl font-bold pb-6 pt-5 md:pb-12">
                  Skvělé, že jste se zaregistrovali!
                </h1>
                <p className="text-2xl mt-5 text-gray-300">
                  Abychom vám mohli nabídnout co nejlepší, potřebujeme od vás
                  ještě pár drobných informací.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:h-[80vh] bg-zinc-900 flex border-form rounded-3xl justify-center items-start flex-col p-6 lg:pr-16 xl:pr-32 relative">
              <div
                className="absolute top-0 right-0 m-2 md:m-10 w-8 h-8 flex justify-center items-center cursor-pointer"
                onClick={handleHide}
              >
                <div className="cross"></div>
              </div>

              <div className="flex w-full flex-col sm:flex-row gap-5">
                <div className="flex flex-col w-full items-center">
                  <h3>Jméno</h3>
                  <input
                    className="w-full h-16 bg-zinc-800 p-2 rounded-full"
                    type="text"
                    name="jmeno"
                    value={jmeno}
                    onChange={(e) => setJmeno(e.target.value)}
                    placeholder="Karel"
                    required
                  />
                </div>
                <div className="flex flex-col w-full items-center">
                  <h3>Přijmení</h3>
                  <input
                    className="w-full h-16 bg-zinc-800 rounded-full p-2"
                    type="text"
                    name="prijmeni"
                    value={prijmeni}
                    onChange={(e) => setPrijmeni(e.target.value)}
                    placeholder="Novák"
                    required
                  />
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <div className="flex flex-col w-full items-center mt-5">
                  <h3>Přezdívka</h3>
                  <input
                    className="w-full h-16 bg-zinc-800 rounded-full p-2"
                    type="text"
                    name="prezdivka"
                    value={prezdivka}
                    onChange={(e) => setPrezdivka(e.target.value)}
                    placeholder="KarelNovak123"
                    required
                  />
                </div>
              </div>

              <div className="w-full flex justify-center items-center mt-5 md:mt-10">
                <button
                  className="w-1/2 h-14 bg-purple-950 rounded-2xl"
                  onClick={handleSubmit}
                >
                  Začít objevovat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InfoForm;
