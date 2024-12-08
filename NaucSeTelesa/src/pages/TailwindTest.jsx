import "../App.css";

function TailwindTest() {
  return (
    <div className="h-screen w-screen ">
      <div className="relative bg-gray-900 text-white rounded-lg p-10 m-10">
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 blur-lg opacity-75 -z-10"></div>

        {/* Main Content */}
        <h1 className="text-6xl m-6">FEATURES</h1>
        <p className="text-xl m-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
          inventore reiciendis, voluptate minus optio quasi officiis at
          exercitationem id qui illo suscipit quisquam impedit! Sequi debitis
          nisi aut non quia!
        </p>
      </div>
    </div>
  );
}

export default TailwindTest;
