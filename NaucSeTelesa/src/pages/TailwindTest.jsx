import "../App.css";
import AdminPage from "./AdminPage";

function TailwindTest() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center mb-20">
        <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-7xl font-bold md:mb-7 text-white p-11">
          User page
        </h1>
        <div className="flex flex-col h-full w-5/6 justify-center items-center">
          <div className="flex flex-col sm:flex-row w-full">
            <div className="w-full md:w-1/5 h-96 bg-zinc-800 m-2 rounded-3xl"></div>
            <div className="w-full md:w-3/5 h-96 bg-zinc-800 m-2 rounded-3xl"></div>
            <div className="w-full md:w-1/5 h-96 bg-zinc-800 m-2 rounded-3xl"></div>
          </div>
          <div className="flex flex-col sm:flex-row w-full">
            <div className="w-full md:w-2/5 h-96 bg-zinc-800 m-2 rounded-3xl"></div>
            <div className="w-full md:w-1/5 h-96 bg-zinc-800 m-2 rounded-3xl"></div>
            <div className="w-full md:w-2/5 h-96 bg-zinc-800 m-2 rounded-3xl"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TailwindTest;
