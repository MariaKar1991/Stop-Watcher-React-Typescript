import { useState, useEffect } from "react";
import WatcherEye from "../Icons/WatcherEye";

const Main: React.FC = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleReset = () => {
    setTime(0);
    setRunning(false);
  };

  return (
    <main className="flex flex-col items-center justify-center py-8">
      <WatcherEye />
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 font-bold text-white text-4xl mb-10 mt-10">
        Stop Watcher
      </h1>
      <div className="">
        <span className="text-white text-xl">
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        </span>
        <span className="text-white text-xl">
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
        </span>
        <span className="text-white text-xl">
          {("0" + Math.floor((time / 100) % 60)).slice(-2)}
        </span>
      </div>
      <div className="w-1/3 max-w-sm flex flex-row justify-evenly mt-10">
        {running ? (
          <button
            onClick={() => setRunning(false)}
            className="btn border rounded-lg py-1 px-3.5 text-white hover:bg-gray-200 hover:text-black"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={() => setRunning(true)}
            className="btn border rounded-lg py-1 px-3 text-white hover:bg-gray-200 hover:text-black"
          >
            Start
          </button>
        )}
        <button
          onClick={handleReset}
          className="btn border rounded-lg py-1 px-2.5 text-white hover:bg-gray-200 hover:text-black"
        >
          Reset
        </button>
      </div>
    </main>
  );
};

export default Main;
