import "../App.css";

function Features1() {
  return (
    <div className="features1 rounded-3xl h-56 w-56 shadow-lg flex flex-col justify-between p-5">
      <div className="flex justify-center items-center w-10">
        <img src="/cube.png" alt="Cube Icon" />
      </div>
      <div>
        <h3>Cube</h3>
        <p>
          Pokud by se pro starý účel použil smysluplný text, bylo by těžké
          hodnotit pouze umění
        </p>
      </div>
    </div>
  );
}

export default Features1;
