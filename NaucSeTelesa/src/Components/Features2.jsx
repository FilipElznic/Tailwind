import "../App.css";

function Features2(props) {
  return (
    <div className="features2 rounded-3xl h-56 w-56 xl:h-64 xl:w-64 shadow-lg flex flex-col justify-between p-5">
      <div className="flex justify-center items-center w-10">
        <div className="text-3xl relative drop-shadow-white-glow">
          {props.icon}
        </div>
      </div>
      <div>
        <h3 className="text-xl">{props.name}</h3>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default Features2;
