import useTimerHook from "./hooks/useTimerHook";
import "./App.css";
import { useRef } from "react";

function App() {
  const { time, counts, start, pause, minutes, seconds, restart, resume } = useTimerHook({
    duration: 599,
    onExpireFunction: () => console.log("time is over"),
  });

  const restartRef = useRef();
  console.log("restartRef", restartRef);

  return (
    <div className="App">
      <div
        style={{
          fontSize: "4rem",
        }}>
        {minutes}:{seconds}
      </div>
      <div>
        <button onClick={() => start()}>start</button>
        <button onClick={() => pause()}>pause</button>
        <button ref={restartRef} onClick={() => restart(13)}>
          restart
        </button>
        <button onClick={() => resume()}>resume</button>
      </div>
    </div>
  );
}

export default App;
