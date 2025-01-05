import "../App.css";
import Spline from "@splinetool/react-spline";

function TailwindTest() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center mb-20">
        <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-7xl font-bold md:mb-7 text-white p-11">
          Můj účet
        </h1>
        <div className="flex flex-col h-full w-5/6 justify-center items-center">
          <div className="flex flex-col sm:flex-row w-full">
            <div className="w-full md:w-1/5 h-96 usergradient m-2 rounded-3xl"></div>
            <div className="w-full md:w-3/5 h-96 usergradient m-2 rounded-3xl">
              <div className="flex flex-col h-full justify-center text-white p-11">
                <h1 className="text-7xl p-5">Filip Elznic</h1>
                <p className="text-2xl userid px-2">
                  c8ced2c4-ae24-4701-8140-503916ff1c24
                </p>
                <p className="text-3xl useremail p-2">elznicfilip@gmail.com</p>
              </div>
            </div>
            <div className="w-full md:w-1/5 h-96 usergradient m-2 rounded-3xl">
              <Spline scene="https://prod.spline.design/Ef9Cq0K7VWxpAvSw/scene.splinecode" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full">
            <div className="w-full md:w-2/5 h-96 usergradient m-2 rounded-3xl">
              <img
                src="/userimg.png"
                alt="telesa"
                className="w-full h-full object-fit rounded-3xl"
              />
            </div>
            <div className="w-full md:w-1/5 h-96 usergradient m-2 rounded-3xl"></div>
            <div className="w-full md:w-2/5 h-96 usergradient m-2 rounded-3xl"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TailwindTest;
